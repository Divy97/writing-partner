# Supabase Setup Guide

## Connecting to Hosted Supabase

### Step 1: Get Your Project Credentials

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **API**
4. Copy the following:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **Project API Key** (anon/public key)
   - **Project Reference ID** (from the URL: `https://supabase.com/dashboard/project/<project-ref>`)

### Step 2: Link Local Project

Run this command to link your local project to the hosted Supabase:

```bash
cd /home/divy/Desktop/writing-partner/packages/supabase
supabase link --project-ref <your-project-ref>
```

You'll be prompted to enter your database password (if you haven't saved it, you can reset it in the Supabase dashboard under Settings → Database).

### Step 3: Pull Existing Schema (if any)

If your hosted database already has tables, pull the current schema:

```bash
supabase db pull
```

This will create a migration file with your existing schema.

### Step 4: Set Up Environment Variables

The credentials will be added to the appropriate environment files.

