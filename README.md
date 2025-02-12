# 🚀 Fastify Test Assignment API

Follow this guide to set up and use the Fastify-based API:

---

## Clone the Repository
```sh
git clone https://github.com/AbdullahYahya1/fastify-test-assignment.git
cd fastify-test-assignment
```

---

## Environment Setup
```sh
cp .env.example .env
```
Edit `.env` with:
```ini
DATABASE_URL=mysql://user:password@host:3306/db_name
ACCESS_TOKEN_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
PORT=3000
```

---

## Installation
```sh
npm install
```

---

## Database Setup
```sh
npx drizzle-kit generate
npx drizzle-kit push
```

---

## Running the Server
```sh
npx tsx src/server.ts
```
You should see:
```arduino
Server running on http://localhost:3000
```

---

## API Endpoints

### Register User
```sh
POST http://localhost:3000/register
Body:
{
  "email": "user@example.com",
  "password": "password123"  # Minimum 6 characters
}
```

### Login
```sh
POST http://localhost:3000/login 
Body:
{
  "email": "user@example.com",
  "password": "password123"
}
```
Response:
```json
{
  "accessToken": "eyJhbGci...",
  "refreshToken": "eyJhbGci..."
}
```

### Get Profile
```sh
GET http://localhost:3000/profile
Headers:
Authorization: Bearer <access_token>
```
Response:
```json
{
  "id": 1,
  "email": "user@example.com"
}
```

### Refresh Tokens
```sh
POST http://localhost:3000/refresh
Body:
{
  "refreshToken": "your_refresh_token"
}
```
Response:
```json
{
  "accessToken": "new_jwt_token",
  "refreshToken": "new_refresh_token"
}
```

---

## Development Tools
Format code:
```sh
npx biome format .
```

Check linting:
```sh
npx biome lint .
```

---

## Troubleshooting
**Missing Modules:**
```sh
npm install missing-module-name
```

**Database Issues:**
```sh
rm -rf drizzle/
npx drizzle-kit generate
npx drizzle-kit push
```

---
