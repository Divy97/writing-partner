#!/bin/bash

# Aura - Supabase Setup Script
# This script helps you connect to your hosted Supabase instance

set -e

echo "🚀 Aura - Supabase Connection Setup"
echo "===================================="
echo ""

# Check if supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI is not installed."
    echo ""
    echo "Please install it first:"
    echo "  macOS:   brew install supabase/tap/supabase"
    echo "  Linux:   https://supabase.com/docs/guides/cli/getting-started"
    echo ""
    exit 1
fi

echo "✅ Supabase CLI found"
echo ""

# Navigate to supabase package
cd "$(dirname "$0")/../packages/supabase"

echo "📋 Please provide your Supabase project details:"
echo "(You can find these at: https://supabase.com/dashboard)"
echo ""

# Get project reference
read -p "Enter your Project Reference ID: " PROJECT_REF

if [ -z "$PROJECT_REF" ]; then
    echo "❌ Project Reference ID is required"
    exit 1
fi

echo ""
echo "🔗 Linking to project: $PROJECT_REF"
echo ""

# Link the project
supabase link --project-ref "$PROJECT_REF"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully linked to Supabase project!"
    echo ""
    echo "📊 Checking current database schema..."
    
    # Try to pull current schema
    supabase db pull || echo "⚠️  No existing schema found or connection failed"
    
    echo ""
    echo "✅ Setup complete!"
    echo ""
    echo "Next steps:"
    echo "  1. Review the migration files in packages/supabase/migrations/"
    echo "  2. Define your schema (we'll do this next)"
    echo "  3. Run: supabase db push (to push migrations)"
    echo ""
else
    echo ""
    echo "❌ Failed to link project"
    echo "Please check your credentials and try again"
    exit 1
fi

