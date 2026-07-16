/**
 * User/session response shaping helpers.
 * Purpose: Normalize Supabase user + profile into API-safe payloads.
 * Used by: auth.service, admin routes.
 */

export function sanitizeUser(user, profile = null) {
  const role =
    profile?.role ??
    user.app_metadata?.role ??
    'user';

  return {
    id: user.id,
    email: user.email,
    emailVerified: Boolean(user.email_confirmed_at),
    emailConfirmedAt: user.email_confirmed_at ?? null,
    role,
    fullName:
      profile?.full_name ??
      user.user_metadata?.full_name ??
      null,
    avatarUrl:
      profile?.avatar_url ??
      user.user_metadata?.avatar_url ??
      null,
    createdAt: profile?.created_at ?? user.created_at,
    updatedAt: profile?.updated_at ?? null,
    lastSignInAt: user.last_sign_in_at ?? null,
  };
}

export function formatSession(session) {
  return {
    accessToken: session.access_token,
    refreshToken: session.refresh_token,
    expiresIn: session.expires_in,
    expiresAt: session.expires_at,
    tokenType: session.token_type ?? 'bearer',
  };
}
