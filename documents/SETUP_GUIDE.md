# Setup Guide for Aura Writing Partner

This guide will help you set up the development environment for Aura.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 20.0.0 ([Download](https://nodejs.org/))
- **pnpm** >= 9.0.0 (Install: `npm install -g pnpm`)
- **Git** ([Download](https://git-scm.com/))

### Optional Tools

- **Supabase CLI** - For local database development ([Installation Guide](https://supabase.com/docs/guides/cli))
- **AWS SAM CLI** - For backend deployment ([Installation Guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html))
- **AWS CLI** - For AWS configuration ([Installation Guide](https://aws.amazon.com/cli/))

## 🚀 Quick Start

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd aura-writing-partner

# Install all dependencies
pnpm install
```

### 2. Environment Variables Setup

Create the following environment files:

#### `packages/extension/.env`
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_API_URL=https://your-api-gateway-url/prod
```

#### `packages/backend/.env`
```env
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here

# Authentication
JWT_SECRET=your-jwt-secret-here

# AI API Keys
GEMINI_API_KEY=your-gemini-api-key-here
CLAUDE_API_KEY=your-claude-api-key-here

# AWS
BUCKET_NAME=aura-interaction-logs
AWS_REGION=us-east-1
```

### 3. Set Up Supabase

#### Option A: Use Supabase Cloud

1. Create a project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from Settings > API
3. Run migrations:
   ```bash
   cd packages/supabase
   supabase link --project-ref <your-project-id>
   supabase db push
   ```

#### Option B: Run Locally

```bash
# Start local Supabase
pnpm supabase:start

# Run migrations
pnpm supabase:migrate

# Check status
cd packages/supabase && supabase status
```

Your local Supabase will be available at:
- Studio UI: http://localhost:54323
- API: http://localhost:54321

### 4. Get API Keys

#### Google Gemini API
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add to `packages/backend/.env` as `GEMINI_API_KEY`

#### Anthropic Claude API
1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Create an API key
3. Add to `packages/backend/.env` as `CLAUDE_API_KEY`

### 5. Start Development

#### Start the Extension

```bash
# Start extension in dev mode
pnpm dev:extension
```

Then:
1. Open Chrome/Edge and go to `chrome://extensions`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select `.output/chrome-mv3` directory from `packages/extension/`

#### Test Backend Locally (Optional)

```bash
# In packages/backend/
pnpm local

# Test the triage endpoint
curl -X POST http://localhost:3000/triage \
  -H "Content-Type: application/json" \
  -d '{"text":"teh quick brown fox"}'
```

## 🏗️ Project Structure

```
aura-writing-partner/
├── packages/
│   ├── extension/          # Browser extension (WXT + React)
│   ├── backend/            # Lambda functions (Node.js)
│   ├── supabase/           # Database & auth
│   └── tsconfig-custom/    # Shared TS config
├── docs/                   # Documentation
├── README.md
└── package.json            # Root package (workspace config)
```

## 🔧 Common Commands

```bash
# Development
pnpm dev:extension          # Start extension in dev mode
pnpm dev:backend            # Start backend locally (requires SAM CLI)

# Building
pnpm build:extension        # Build extension for production
pnpm build:backend          # Build backend functions

# Database
pnpm supabase:start         # Start local Supabase
pnpm supabase:stop          # Stop local Supabase
pnpm supabase:migrate       # Run migrations

# Code Quality
pnpm typecheck              # Check TypeScript types
pnpm format                 # Format all files
pnpm format:check           # Check formatting

# Deployment
pnpm deploy:backend         # Deploy backend to AWS
pnpm --filter extension zip # Create extension zip for store
```

## 🚢 Deployment

### Deploy Backend to AWS

1. Configure AWS credentials:
   ```bash
   aws configure
   ```

2. Deploy using SAM:
   ```bash
   cd packages/backend
   sam build
   sam deploy --guided
   ```

3. Note the API Gateway URL from the output

4. Update `packages/extension/.env` with the API URL

### Publish Extension

1. Build the extension:
   ```bash
   pnpm build:extension
   pnpm --filter extension zip
   ```

2. Upload to Chrome Web Store:
   - Go to [Chrome Developer Dashboard](https://chrome.google.com/webstore/devconsole)
   - Upload the zip file from `packages/extension/.output/`

## 🐛 Troubleshooting

### Extension not loading
- Make sure you've run `pnpm dev:extension` or `pnpm build:extension`
- Check that Developer mode is enabled in Chrome
- Look for errors in Chrome DevTools

### Backend errors
- Verify all environment variables are set correctly
- Check AWS credentials: `aws sts get-caller-identity`
- Review CloudWatch logs in AWS Console

### Supabase connection issues
- Verify SUPABASE_URL and SUPABASE_ANON_KEY are correct
- Check network connectivity
- For local: ensure `supabase status` shows all services running

### Type errors
- Run `pnpm install` to ensure all dependencies are installed
- Try `pnpm typecheck` to see detailed errors
- Clear build cache: `pnpm clean` then rebuild

## 📚 Additional Resources

- [WXT Documentation](https://wxt.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/)
- [Google Gemini API](https://ai.google.dev/docs)
- [Anthropic Claude API](https://docs.anthropic.com/)

## 🆘 Getting Help

- Check the [README.md](./README.md) for project overview
- Review [PROJECT_SCOPE.md](./docs/PROJECT_SCOPE.md) for product details
- See [TECHNICAL_SOLUTION_DESIGN.md](./docs/TECHNICAL_SOLUTION_DESIGN.md) for architecture

---

**Happy Coding! 🚀**

