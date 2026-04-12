# Weather Watch Waitlist

Branded landing page and private admin dashboard for collecting launch emails for the Weather Watch app.

## What it includes

- public waitlist landing page
- Weather Watch logo built into the hero
- email signup form backed by local SQLite storage
- private `/admin` page for reviewing collected emails

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Create your local environment file:

```bash
copy .env.example .env.local
```

3. Set a password in `.env.local`:

```env
WAITLIST_ADMIN_PASSWORD=pick-a-strong-password
```

4. Start the app:

```bash
npm run dev
```

5. Open:

- `http://localhost:3000` for the public waitlist
- `http://localhost:3000/admin` for the protected email list

## Data storage

- Emails are stored in `data/waitlist.db`
- The `data/` folder is ignored by git so local signups do not get committed by accident

## Production note

Before deploying publicly, keep `WAITLIST_ADMIN_PASSWORD` set in your hosting environment so the admin page stays private.
