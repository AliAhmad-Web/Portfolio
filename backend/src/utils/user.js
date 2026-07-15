export function sanitizeUser(user) {
  return {
    id: user.id,
    email: user.email,
    emailVerified: Boolean(user.email_confirmed_at),
    emailConfirmedAt: user.email_confirmed_at ?? null,
    role: user.app_metadata?.role ?? 'user',
    fullName: user.user_metadata?.full_name ?? null,
    avatarUrl: user.user_metadata?.avatar_url ?? null,
    createdAt: user.created_at,
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
