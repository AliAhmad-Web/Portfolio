# Google reCAPTCHA v3

Protects:

- `POST /api/v1/contact` (action: `contact`)
- `POST /api/v1/auth/login` (action: `login`)

## How it works

1. Frontend `useRecaptcha()` loads Google’s script and calls `grecaptcha.execute(action)`.
2. The token is sent as `recaptchaToken` in the JSON body.
3. Express middleware `verifyRecaptcha(action)` calls Google’s `siteverify` API with the secret key.
4. Requests are rejected when the token is missing/invalid, the action mismatches, or the score is below `RECAPTCHA_MIN_SCORE`.

If keys are not configured in development, verification is skipped with a console warning so local work can continue.
