#!/bin/bash

# Aura - Environment Setup Script
# This script helps you create the required .env files

set -e

echo "🔐 Aura - Environment Configuration Setup"
echo "=========================================="
echo ""

# Check if .env files already exist
EXTENSION_ENV="/home/divy/Desktop/writing-partner/packages/extension/.env"
BACKEND_ENV="/home/divy/Desktop/writing-partner/packages/backend/.env"

if [ -f "$EXTENSION_ENV" ] || [ -f "$BACKEND_ENV" ]; then
    echo "⚠️  Warning: .env files already exist!"
    read -p "Do you want to overwrite them? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Cancelled. Existing files not modified."
        exit 0
    fi
fi

echo "📋 Please enter your Supabase credentials:"
echo "(Get them from: https://supabase.com/dashboard/project/okcstgzhsaovczqbzftu/settings/api)"
echo ""

# Get Supabase credentials
read -p "Enter your Supabase Anon/Public Key: " ANON_KEY
echo ""
read -sp "Enter your Supabase Service Role Key: " SERVICE_KEY
echo ""
echo ""

# Create extension .env
echo "📝 Creating packages/extension/.env..."
cat > "$EXTENSION_ENV" << EOF
# Supabase Configuration
VITE_SUPABASE_URL=https://okcstgzhsaovczqbzftu.supabase.co
VITE_SUPABASE_ANON_KEY=$ANON_KEY

# Backend API (local development)
VITE_API_URL=http://localhost:3000
EOF

# Create backend .env
echo "📝 Creating packages/backend/.env..."
cat > "$BACKEND_ENV" << EOF
# Supabase Configuration
SUPABASE_URL=https://okcstgzhsaovczqbzftu.supabase.co
SUPABASE_ANON_KEY=$ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=$SERVICE_KEY

# AI API Keys (add these when you have them)
GEMINI_API_KEY=your_gemini_api_key
CLAUDE_API_KEY=your_claude_api_key

# JWT Secret (generate with: openssl rand -base64 32)
JWT_SECRET=$(openssl rand -base64 32)

# AWS S3 Bucket
BUCKET_NAME=aura-interaction-logs
EOF

echo ""
echo "✅ Environment files created successfully!"
echo ""
echo "📁 Files created:"
echo "   - $EXTENSION_ENV"
echo "   - $BACKEND_ENV"
echo ""
echo "⚠️  Remember to add your AI API keys later:"
echo "   - GEMINI_API_KEY (https://makersuite.google.com/app/apikey)"
echo "   - CLAUDE_API_KEY (https://console.anthropic.com/)"
echo ""
echo "🚀 You can now run: pnpm dev:extension"
echo ""

