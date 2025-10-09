# 🔗 Quick Supabase Connection Guide

## Prerequisites
✅ Supabase CLI installed (version 2.48.3)

## Steps to Connect

### 1️⃣ Login to Supabase (if not already)

```bash
supabase login
```

This will open your browser for authentication.

### 2️⃣ Navigate to Supabase Package

```bash
cd /home/divy/Desktop/writing-partner/packages/supabase
```

### 3️⃣ Link to Your Hosted Project

```bash
supabase link --project-ref YOUR_PROJECT_REF
```

**Where to find YOUR_PROJECT_REF:**
- Go to: https://supabase.com/dashboard
- Look at the URL when viewing your project
- Format: `https://supabase.com/dashboard/project/YOUR_PROJECT_REF`
- It's usually an 8-20 character string

**You'll be prompted for:**
- **Database password** - The password you set when creating the project
  - Don't remember it? Reset at: Settings → Database → Reset database password

### 4️⃣ Verify Connection

```bash
supabase db pull
```

This will:
- ✅ Confirm connection is working
- ✅ Download any existing schema (if your DB has tables)
- ✅ Create migration files in `migrations/` directory

### 5️⃣ Check Status

```bash
supabase projects list
```

You should see your linked project in the list.

---

## What's Next?

Once connected, we'll:
1. ✅ Clear out the placeholder migration
2. ✅ Define the actual database schema
3. ✅ Push the schema to your hosted database
4. ✅ Generate TypeScript types for the extension

---

## Quick Commands

```bash
# Check connection
supabase projects list

# Pull schema from remote
supabase db pull

# Push local migrations to remote
supabase db push

# Generate TypeScript types
supabase gen types typescript --linked > ../extension/types/supabase.ts
```

---

## Need Help?

If you encounter issues:
1. Make sure you're logged in: `supabase login`
2. Verify project ref is correct
3. Check database password is correct
4. Ensure you have internet connection

**Ready to connect?** Run the commands above! 🚀

