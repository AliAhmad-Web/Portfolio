-- Public customer reviews shown at the end of the Contact section.

CREATE TABLE IF NOT EXISTS public.customer_reviews (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  rating SMALLINT NOT NULL,
  comment TEXT NOT NULL,
  avatar_url TEXT,
  service TEXT NOT NULL DEFAULT 'Web Development',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT customer_reviews_rating_check CHECK (rating BETWEEN 1 AND 5),
  CONSTRAINT customer_reviews_name_len CHECK (char_length(name) BETWEEN 1 AND 80),
  CONSTRAINT customer_reviews_location_len CHECK (char_length(location) BETWEEN 1 AND 80),
  CONSTRAINT customer_reviews_comment_len CHECK (char_length(comment) BETWEEN 12 AND 600)
);

CREATE INDEX IF NOT EXISTS customer_reviews_created_at_idx
  ON public.customer_reviews (created_at DESC);

ALTER TABLE public.customer_reviews ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.customer_reviews FROM anon, authenticated;
GRANT ALL ON public.customer_reviews TO service_role;

ALTER TABLE public.customer_reviews
  ADD COLUMN IF NOT EXISTS service TEXT NOT NULL DEFAULT 'Web Development';
