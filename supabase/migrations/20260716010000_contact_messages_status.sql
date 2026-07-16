-- Phase 2: contact status tracking + harden RLS
-- Mirrors remote migration contact_messages_status_and_rls

ALTER TABLE public.contact_messages
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'contact_messages_status_check'
  ) THEN
    ALTER TABLE public.contact_messages
      ADD CONSTRAINT contact_messages_status_check
      CHECK (status IN ('pending', 'resolved', 'completed'));
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS contact_messages_status_idx ON public.contact_messages (status);
CREATE INDEX IF NOT EXISTS contact_messages_created_at_idx ON public.contact_messages (created_at DESC);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.contact_messages FROM anon, authenticated;
GRANT ALL ON public.contact_messages TO service_role;

CREATE OR REPLACE FUNCTION public.insert_contact_message(
  p_name text,
  p_email text,
  p_message text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_row public.contact_messages%ROWTYPE;
BEGIN
  INSERT INTO public.contact_messages (name, email, message, status)
  VALUES (p_name, p_email, p_message, 'pending')
  RETURNING * INTO new_row;

  RETURN jsonb_build_object(
    'id', new_row.id,
    'name', new_row.name,
    'email', new_row.email,
    'message', new_row.message,
    'status', new_row.status,
    'created_at', new_row.created_at,
    'updated_at', new_row.updated_at
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.insert_contact_message(text, text, text) TO anon, authenticated, service_role;
