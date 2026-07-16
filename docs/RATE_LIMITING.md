# Login Rate Limiting

Failed login attempts on `POST /api/v1/auth/login` are limited.

| Setting | Env var | Default |
|---------|---------|---------|
| Max failed attempts | `LOGIN_RATE_LIMIT_MAX` | `5` |
| Window | `LOGIN_RATE_LIMIT_WINDOW_MS` | `900000` (15 min) |

Only **failed** requests count (`skipSuccessfulRequests`). Keys are scoped by **IP + email**.
