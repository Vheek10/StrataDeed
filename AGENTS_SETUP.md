<!-- @format -->

/\*_ @format _/

/\*\*

- AGENTS_SETUP.md
- Quick-start guide for setting up and running StrataDeed AI Agents
  \*/

# StrataDeed AI Agents - Setup Guide

## Overview

This guide walks you through setting up and running the AI agents for the StrataDeed platform. The agents leverage OpenAI's GPT-4 Turbo API to provide intelligent real estate analysis.

## Prerequisites

- Node.js 18.17+ or 20+
- pnpm (recommended) or npm
- OpenAI API key with access to GPT-4 Turbo
- Sui Network configuration (optional, for blockchain features)

## Installation & Setup

### 1. Install Dependencies

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the project root with:

```env
# OpenAI Configuration (REQUIRED)
OPENAI_API_KEY=sk_YOUR_API_KEY_HERE
OPENAI_MODEL=gpt-4-turbo

# Sui Network Configuration (Optional)
NEXT_PUBLIC_SUI_NETWORK=testnet
# or for mainnet:
# NEXT_PUBLIC_SUI_NETWORK=mainnet

# Optional: Supabase Configuration (for persistence)
# NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

### 3. Verify OpenAI Connection

Before running the app, verify your API key works:

```bash
# This will be done automatically when you first use an agent
# But you can test manually by running:
pnpm dev
# Then navigate to /agents/valuation and try a property
```

## Running the Agents

### Development Mode

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

### Production Build

```bash
pnpm build
pnpm start
```

## Accessing the Agents

### Agent Hub / Dashboard

- **URL:** `http://localhost:3000/agents`
- View all available agents
- See their status (available/coming-soon)
- Quick navigation to each agent

### Property Valuation Agent (Agent #1)

- **URL:** `http://localhost:3000/agents/valuation`
- **Status:** ✅ Available & Fully Implemented
- **Features:**
  - Property address & type input
  - Advanced options (size, bedrooms, year built, condition)
  - Real-time AI-powered valuation analysis
  - Risk assessment with visual gauges
  - Chain-of-thought reasoning visualization
  - Processing progress tracking

### Investor Matching Agent (Agent #2)

- **URL:** `http://localhost:3000/agents/matching`
- **Status:** 🟡 Coming Soon

### Due Diligence Agent (Agent #3)

- **URL:** `http://localhost:3000/agents/due-diligence`
- **Status:** 🟡 Coming Soon

### Portfolio Manager Agent (Agent #4)

- **URL:** `http://localhost:3000/agents/portfolio`
- **Status:** 🟡 Coming Soon

## Architecture Overview

### File Structure

```
src/
├── app/
│   ├── agents/
│   │   ├── page.tsx              # Agent hub / dashboard
│   │   └── valuation/
│   │       └── page.tsx          # Valuation agent page
│   └── api/
│       └── agents/
│           └── valuate/
│               └── route.ts      # API endpoint
├── components/
│   └── agents/
│       ├── ValuationAgent.tsx    # Main component (Agent #1)
│       └── common/
│           ├── AgentHeader.tsx
│           ├── ReasoningDisplay.tsx
│           ├── ConfidenceScore.tsx
│           └── LoadingState.tsx
├── hooks/
│   └── useValuationAgent.ts      # State management
├── lib/
│   └── agents/
│       ├── openai-client.ts      # OpenAI API wrapper
│       ├── validators.ts         # Zod schemas
│       └── prompts.ts            # LLM prompts
└── types/
    └── agents.ts                 # Type definitions
```

### Data Flow

```
User Input Form
    ↓
ValuationAgent Component
    ↓
useValuationAgent Hook
    ↓
POST /api/agents/valuate
    ↓
openai-client.ts (API wrapper)
    ↓
OpenAI GPT-4 Turbo
    ↓
validators.ts (output validation)
    ↓
useValuationAgent Hook (state update)
    ↓
Result Display (cards, gauges, reasoning)
```

## API Endpoints

### Property Valuation API

**Endpoint:** `POST /api/agents/valuate`

**Request:**

```json
{
	"propertyAddress": "123 Main St, Los Angeles, CA",
	"propertyType": "residential",
	"size": 1200,
	"bedrooms": 2,
	"bathrooms": 1.5,
	"yearBuilt": 2005,
	"condition": "good",
	"marketContext": "Recent neighborhood improvements"
}
```

**Response:**

```json
{
	"success": true,
	"data": {
		"estimatedValue": {
			"min": 450000,
			"max": 550000,
			"midpoint": 500000,
			"confidence": 0.85
		},
		"investmentRating": 4.2,
		"riskScore": {
			"overall": 0.35,
			"breakdown": {
				"structural": 0.3,
				"legal": 0.2,
				"market": 0.45
			}
		},
		"reasoning": [
			"Analyzed comparable properties in the area...",
			"Assessed structural condition as good...",
			"Market factors indicate stable demand..."
		],
		"marketComparables": [
			"456 Oak Ave - $475k (2000 sqft, 2005)",
			"789 Pine Rd - $525k (1400 sqft, 2008)"
		],
		"sources": ["Zillow market data", "County records", "Recent sales history"],
		"timestamp": "2024-01-15T10:30:00Z"
	},
	"metadata": {
		"processingTimeMs": 3420,
		"tokensUsed": 1250
	}
}
```

**Error Response:**

```json
{
	"success": false,
	"error": {
		"code": "VALIDATION_ERROR",
		"message": "Invalid property address",
		"details": "Address must be at least 5 characters"
	}
}
```

## Troubleshooting

### OpenAI API Error: Invalid API Key

**Solution:**

1. Verify your API key in `.env.local`
2. Check that the key starts with `sk_`
3. Confirm it's for a valid OpenAI organization
4. Check API key permissions in OpenAI dashboard

### OpenAI API Error: Rate Limit (429)

**Solution:**

- The client automatically retries with exponential backoff
- Wait a few moments and try again
- Check your API usage limits in OpenAI dashboard

### OpenAI API Error: Server Error (5xx)

**Solution:**

- OpenAI servers are experiencing issues
- The client automatically retries up to 3 times
- Check OpenAI status page at https://status.openai.com

### Component Not Rendering / Blank Page

**Solution:**

1. Check browser console for errors
2. Verify all environment variables are set
3. Clear browser cache: `Cmd/Ctrl + Shift + R`
4. Restart development server: `pnpm dev`

### Form Submission Hangs

**Solution:**

1. Check that OPENAI_API_KEY is set and valid
2. Open browser DevTools → Network tab
3. Look for failed requests to `/api/agents/valuate`
4. Check the response body for error details

## Performance Tuning

### Caching

The valuation hook supports localStorage caching:

```typescript
// Auto-save drafts
agent.saveToDraft();

// Clear cached results
agent.reset();
```

### Token Estimation

Monitor API costs:

- Each request shows `tokensUsed` in metadata
- Typical valuation: 800-1500 tokens (~$0.02-0.04)

### Response Time

- First request: 3-5 seconds (includes LLM processing)
- Cached results: Instant
- Network latency varies by location

## Next Steps

### Building Agent #2: Investor Matching

```bash
# 1. Create the hook (similar pattern to useValuationAgent)
# File: src/hooks/useInvestorMatching.ts

# 2. Create the API route
# File: src/app/api/agents/match/route.ts

# 3. Create the component
# File: src/components/agents/InvestorMatchingAgent.tsx

# 4. Create the page route
# File: src/app/agents/matching/page.tsx
```

## Testing

### Manual Testing Checklist

- [ ] Navigate to `/agents` - should see agent hub
- [ ] Navigate to `/agents/valuation` - should see form
- [ ] Fill in property address and click "Analyze Property"
- [ ] Watch loading progress update
- [ ] See valuation result with risk scores and reasoning
- [ ] Click "Show Advanced" to reveal optional fields
- [ ] Test error handling (invalid address, API errors)
- [ ] Test responsive design on mobile

### API Testing with cURL

```bash
curl -X POST http://localhost:3000/api/agents/valuate \
  -H "Content-Type: application/json" \
  -d '{
    "propertyAddress": "123 Main St, Los Angeles, CA",
    "propertyType": "residential"
  }'
```

## Deployment

### Vercel Deployment

```bash
# 1. Push code to GitHub
git push origin main

# 2. Connect repository to Vercel
# https://vercel.com/new

# 3. Set environment variables in Vercel dashboard:
#    - OPENAI_API_KEY
#    - OPENAI_MODEL
#    - NEXT_PUBLIC_SUI_NETWORK (optional)

# 4. Deploy
vercel deploy --prod
```

### Self-Hosted Deployment

```bash
# Build
pnpm build

# Start
pnpm start

# For production, use PM2 or similar:
pm2 start pnpm --name stratadeed -- start
```

## Support

For issues or questions:

1. Check this guide's Troubleshooting section
2. Review agent logs: Check browser console and server logs
3. Check OpenAI documentation: https://platform.openai.com/docs
4. Create an issue on GitHub with:
   - Error message
   - Browser/Node version
   - Steps to reproduce
   - Environment setup (without exposing keys)

## Key Contacts

- OpenAI Support: https://help.openai.com
- Vercel Support: https://vercel.com/help
- StrataDeed Development: See project README

---

Last Updated: January 2024
Agent #1 (Property Valuation): ✅ Complete
Agent #2-4: 🟡 In Development
