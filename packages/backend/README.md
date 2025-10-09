# Aura Backend

Serverless backend for the Aura Writing Partner, built with AWS Lambda.

## Architecture

- **Triage Service** - Fast rule-based grammar checks
- **Correction Service** - LLM-powered corrections using Google Gemini
- **Explanation Service** - Educational explanations using Anthropic Claude
- **Log Interaction Service** - Stores user interactions in S3

## Deployment

### Prerequisites

- AWS CLI configured
- AWS SAM CLI installed

### Deploy

```bash
# Build and deploy
pnpm deploy

# Or manually
sam build
sam deploy --guided
```

### Local Development

```bash
# Start local API
pnpm local

# Test endpoint
curl -X POST http://localhost:3000/triage \
  -H "Content-Type: application/json" \
  -d '{"text":"teh quick brown fox"}'
```

## Environment Variables

Required environment variables (set in `template.yaml` or `.env`):

- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anonymous key
- `JWT_SECRET` - JWT signing secret
- `GEMINI_API_KEY` - Google Gemini API key
- `CLAUDE_API_KEY` - Anthropic Claude API key
- `BUCKET_NAME` - S3 bucket for interaction logs

## API Endpoints

### POST /triage
Fast rule-based grammar checking.

**Request:**
```json
{
  "text": "teh quick brown fox"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "corrections": [...],
    "needsLlmCheck": false
  }
}
```

### POST /correct
LLM-powered grammar correction.

### POST /explain
Get detailed explanation for a correction.

### POST /log-interaction
Log user interaction for analysis.

