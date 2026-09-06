# AuthApp — Node.js/Express Authentication

A simple full-stack authentication project using:

- Node.js
- Express
- JSON file storage
- bcrypt password hashing
- JWT authentication
- HTML/CSS/JavaScript frontend

## 1. Install

Open a terminal in this folder:

```bash
npm install
```

## 2. Start

```bash
npm start
```

For development:

```bash
npm run dev
```

Open:

http://localhost:5000

## 3. Test signup/login

### Signup

POST `/api/auth/signup`

JSON:

```json
{
  "name": "Sahil",
  "email": "sahil@example.com",
  "password": "password123"
}
```

### Login

POST `/api/auth/login`

JSON:

```json
{
  "email": "sahil@example.com",
  "password": "password123"
}
```

Copy the returned JWT token.

### Protected endpoint

GET `/api/auth/me`

Header:

```text
Authorization: Bearer YOUR_TOKEN
```

### Protected test

GET `/api/protected`

Header:

```text
Authorization: Bearer YOUR_TOKEN
```

## Security notes

- Passwords are never stored as plain text.
- bcrypt hashes passwords before storage.
- JWT is required for protected endpoints.
- The JWT secret is stored in `.env`.
- For production, use a real database and preferably secure HttpOnly cookies or another carefully designed token strategy.
- Do not commit `.env` to Git.

## End-to-end browser test

1. Open `/signup.html`.
2. Create an account.
3. You should be redirected to `/dashboard.html`.
4. Confirm your name/email are displayed.
5. Confirm protected API data is displayed.
6. Click Logout.
7. Try opening `/dashboard.html`; you should be redirected to Login.
8. Login with the account you created.
9. Test an incorrect password; login should fail.
10. Test duplicate signup with the same email; signup should fail.
