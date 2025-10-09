# Aura Supabase - Database Setup

This package contains the database schema and migrations for the Aura Writing Partner.

## 🔗 Connecting to Hosted Supabase

### Step 1: Get Your Project Credentials

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your Aura project
3. Go to **Settings** → **API** and note:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **Anon/Public Key**
4. From the dashboard URL, note your **Project Reference ID**:
   - URL format: `https://supabase.com/dashboard/project/<project-ref>`
   - Example: If URL is `https://supabase.com/dashboard/project/abcdefgh`, then `abcdefgh` is your project ref

### Step 2: Link Your Local Project

```bash
cd packages/supabase
supabase link --project-ref <your-project-ref>
```

You'll be prompted for:
- **Database password** (if you don't remember it, reset it in Settings → Database)

### Step 3: Check Current Database State

Pull any existing schema from your hosted database:

```bash
supabase db pull
```

This will:
- Create a migration file if tables already exist
- Or show that the database is empty and ready for new migrations

### Step 4: Ready for Schema Definition

Once linked, you can:
- Define your schema in migration files
- Push migrations: `supabase db push`
- Generate TypeScript types: `supabase gen types typescript --linked > ../extension/types/supabase.ts`

## 📋 Quick Commands

```bash
# Link to hosted project (one-time setup)
supabase link --project-ref <your-project-ref>

# Pull current schema
supabase db pull

# Push new migrations
supabase db push

# Generate TypeScript types
supabase gen types typescript --linked > ../extension/types/supabase.ts

# Reset database (⚠️ DESTRUCTIVE - use with caution)
supabase db reset --linked

# Check connection status
supabase projects list
```

## 🗃️ Database Schema

Schema is defined in `migrations/` directory. Each migration file is timestamped and applied in order.

### Current Migrations

- `20251008030000_initial_schema.sql` - Placeholder (will be replaced with actual schema)

## 🔐 Environment Variables

After linking, you'll need these in your extension and backend:

**For Extension** (create `packages/extension/.env`):
```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

**For Backend** (create `packages/backend/.env`):
```env
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-anon-public-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 🆘 Troubleshooting

### "Project not found"
- Double-check your project reference ID
- Make sure you're logged in: `supabase login`

### "Connection refused"
- Check your internet connection
- Verify the project URL in Supabase dashboard

### "Authentication failed"
- Reset your database password in Settings → Database
- Try linking again

## 📚 Resources

- [Supabase CLI Docs](https://supabase.com/docs/guides/cli)
- [Supabase Database Migrations](https://supabase.com/docs/guides/cli/local-development#database-migrations)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
