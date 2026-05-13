<!-- @format -->

# StrataDeed AI Agents Architecture

**Sui Overflow 2026 Hackathon — Agentic Web Track**

---

## 1. Overview

This document defines the architecture for four autonomous AI agents that enhance StrataDeed's real estate tokenization platform. These agents leverage OpenAI's GPT-4 Turbo API, Next.js 16, and the Sui blockchain to provide intelligent analysis, recommendations, and portfolio management for property investors.

### Agent Portfolio

1. **Property Valuation & Analysis Agent** — Analyzes property docs/images, provides market valuation, risk scoring
2. **Investor Matching Agent** — Recommends properties based on investor risk profile, budget, preferences
3. **Due Diligence & Document Intelligence Agent** — Parses legal documents, flags risks, summarizes key terms
4. **Autonomous Portfolio Manager Agent** — Monitors fractional holdings, suggests rebalancing, alerts

---

## 2. System Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js)                       │
├────────────────────────────────────────────────────────────────┤
│  - Agent UI Components (React + Framer Motion)                 │
│  - Input Forms (File upload, property data, portfolio view)    │
│  - Real-time reasoning display (chain-of-thought)              │
│  - Confidence scores & source citations                        │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                    ┌──────▼──────┐
                    │ API Routes  │
                    │  /api/...   │
                    └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
   ┌────▼──────┐  ┌────────▼────────┐  ┌────▼──────┐
   │  OpenAI   │  │ Sui Blockchain  │  │ Database  │
   │  GPT-4    │  │  (@mysten/sui)  │  │ Supabase  │
   └───────────┘  └─────────────────┘  └───────────┘
        │                  │                  │
        └──────────────────┼──────────────────┘
                           │
                    ┌──────▼────────┐
                    │ Agent Memory  │
                    │ (localStorage)│
                    └───────────────┘
```

### Component Layers

#### **Frontend Layer**

- React components in `src/components/agents/`
- Custom hooks in `src/hooks/` for agent logic
- Tailwind CSS + Framer Motion for premium UI
- Real-time streaming of agent reasoning

#### **API Layer** (`src/app/api/agents/`)

- Standalone serverless functions
- Each agent has its own route: `/api/agents/valuate`, `/api/agents/match`, etc.
- Handles OpenAI calls, data validation, error handling
- Returns structured JSON with reasoning, scores, and recommendations

#### **Blockchain Layer**

- `@mysten/sui` SDK for on-chain interactions
- Read property data from Sui objects
- Support for PTBs (Programmable Transaction Blocks) for on-chain actions
- Integration with Sui's zkLogin for private identity verification

#### **Persistence Layer**

- localStorage for client-side agent memory (conversation history, user preferences)
- Supabase (PostgreSQL) for backend persistence (optional for production)
- API responses cached with 24-hour TTL

---

## 3. Tech Stack

| Layer       | Technology                       | Purpose                             |
| ----------- | -------------------------------- | ----------------------------------- |
| Frontend    | Next.js 16 + TypeScript          | Server/client rendering, API routes |
| UI/UX       | React 18 + Framer Motion         | Interactive components, animations  |
| Styling     | Tailwind CSS                     | Responsive, premium design          |
| AI          | OpenAI GPT-4 Turbo               | Language models for agent reasoning |
| Blockchain  | @mysten/sui SDK                  | Read/write on Sui                   |
| Form/Upload | React Hook Form + react-dropzone | File handling                       |
| State       | React hooks + localStorage       | Client-side state                   |
| Validation  | Zod                              | Type-safe schema validation         |

---

## 4. Agent Specifications

### 4.1 Property Valuation & Analysis Agent

**Purpose:** Analyze property documents/images and provide intelligent valuation estimates, risk assessments, and market comparisons.

**Inputs:**

- Property address/details
- Photos/images (via upload or Walrus)
- Market data (comparables, location, property type)
- Property documents (deed, survey, inspection reports)

**Processing:**

1. Extract property features (size, condition, location, amenities)
2. Analyze comparable properties in the market
3. Assess risk factors (structural, legal, market, environmental)
4. Generate valuation using comparable market analysis (CMA)
5. Produce investment rating (1-5 stars)

**Outputs:**

```json
{
	"estimatedValue": { "min": 450000, "max": 520000, "confidence": 0.87 },
	"riskScore": {
		"overall": 0.32,
		"structural": 0.25,
		"legal": 0.35,
		"market": 0.28
	},
	"marketComparison": [
		{
			"address": "...",
			"soldPrice": 480000,
			"soldDate": "2026-01-15",
			"similarity": 0.92
		}
	],
	"investmentRating": 4.2,
	"reasoning": ["Excellent location near transit...", "Recent renovations..."],
	"sources": ["Zillow comps", "County records", "Image analysis"]
}
```

**API Route:** `POST /api/agents/valuate`

---

### 4.2 Investor Matching Agent

**Purpose:** Recommend properties from marketplace that align with investor's risk profile, budget, and investment goals.

**Inputs:**

- Investor risk tolerance (conservative/moderate/aggressive)
- Budget range
- Investment preferences (residential, commercial, mixed-use)
- Geographic preferences
- Desired yield/returns
- Portfolio composition preferences

**Processing:**

1. Load investor profile from localStorage/database
2. Fetch available properties from Sui blockchain
3. Score each property against investor criteria
4. Rank by fit score
5. Explain reasoning for top matches

**Outputs:**

```json
{
	"matches": [
		{
			"propertyId": "0x...",
			"address": "...",
			"fitScore": 0.94,
			"reasoning": "Matches risk profile (moderate), within budget, strong yield potential",
			"expectedYield": 7.2,
			"riskLevel": "moderate",
			"tokenPrice": 5000,
			"fractionalShares": 0.025
		}
	],
	"investorProfile": { "riskTolerance": "moderate", "budget": 50000 },
	"totalMatches": 12
}
```

**API Route:** `POST /api/agents/match`

---

### 4.3 Due Diligence & Document Intelligence Agent

**Purpose:** Automatically parse and analyze legal documents for risks, red flags, and key terms.

**Inputs:**

- Deed documents (PDF/image)
- Title reports
- Legal agreements
- Inspection reports
- Property contracts

**Processing:**

1. Extract key clauses and terms via LLM
2. Identify risks/red flags (liens, easements, zoning violations, etc.)
3. Summarize ownership structure and encumbrances
4. Flag problematic language
5. Provide recommendations

**Outputs:**

```json
{
	"documentSummary": {
		"title": "Deed of Trust — 123 Main St",
		"date": "2024-01-15",
		"parties": ["John Doe", "First National Bank"],
		"propertyDescription": "Residential, 2 bed/1 bath, 1,200 sqft"
	},
	"risks": [
		{
			"severity": "high",
			"type": "Lien",
			"description": "Tax lien filed 2025-06-22, amount $15,000",
			"recommendation": "Resolve before closing"
		},
		{
			"severity": "medium",
			"type": "Easement",
			"description": "Utility easement across rear 10 feet",
			"recommendation": "Verify impact on development plans"
		}
	],
	"keyTerms": {
		"ownershipType": "Fee Simple",
		"recordedDate": "2024-01-15",
		"county": "Los Angeles",
		"parcelId": "ABC-123-456"
	},
	"overallRiskScore": 0.42
}
```

**API Route:** `POST /api/agents/due-diligence`

---

### 4.4 Autonomous Portfolio Manager Agent

**Purpose:** Monitor investor's tokenized property portfolio, suggest rebalancing, and alert to opportunities.

**Inputs:**

- Wallet address (Sui)
- List of owned property tokens
- Portfolio parameters (target allocation, risk tolerance)
- Market data stream

**Processing:**

1. Fetch investor's token holdings from Sui blockchain
2. Analyze portfolio composition and performance
3. Calculate current vs. target allocation
4. Identify underperforming assets
5. Suggest rebalancing trades
6. Alert to market opportunities

**Outputs:**

```json
{
	"portfolio": {
		"totalValue": 250000,
		"tokens": [
			{
				"propertyId": "0x...",
				"share": 0.15,
				"currentValue": 37500,
				"yield": 6.5
			},
			{
				"propertyId": "0x...",
				"share": 0.25,
				"currentValue": 62500,
				"yield": 7.2
			}
		]
	},
	"analysis": {
		"allocation": { "residential": 0.55, "commercial": 0.25, "mixed": 0.2 },
		"targetAllocation": { "residential": 0.5, "commercial": 0.3, "mixed": 0.2 },
		"drift": 0.08,
		"diversificationScore": 0.78
	},
	"recommendations": [
		{
			"action": "Reduce",
			"property": "0x...",
			"reason": "Underperforming, yield below portfolio average",
			"targetShare": 0.1
		}
	],
	"alerts": [
		{
			"type": "Opportunity",
			"message": "New commercial property matches your profile"
		}
	]
}
```

**API Route:** `POST /api/agents/portfolio`

---

## 5. Data Flow Diagrams

### 5.1 Valuation Agent Flow

```
User uploads property docs
         │
         ▼
Frontend: ValuationAgent component
         │
         ├─ Extract images/files
         └─ Call POST /api/agents/valuate
         │
         ▼
API Route: /api/agents/valuate
         │
         ├─ Parse upload (multer)
         ├─ Send to OpenAI with vision
         ├─ Extract property features
         ├─ Fetch market comparables
         ├─ Calculate risk scores
         └─ Generate valuation estimate
         │
         ▼
Return structured JSON
         │
         ▼
Frontend: Display results with
          - Chain-of-thought reasoning
          - Confidence scores
          - Source citations
          - Investment rating visualization
```

### 5.2 Investor Matching Flow

```
User inputs profile (risk, budget, prefs)
         │
         ▼
Frontend: InvestorMatchingAgent component
         │
         └─ Call POST /api/agents/match
         │
         ▼
API Route: /api/agents/match
         │
         ├─ Validate investor profile
         ├─ Fetch properties from Sui blockchain
         ├─ Score each property (OpenAI reasoning)
         ├─ Rank by fit score
         └─ Cache results (localStorage/Redis)
         │
         ▼
Return ranked matches with reasoning
         │
         ▼
Frontend: Display matched properties
          - Interactive cards
          - "Why matched" explanations
          - One-click to property detail/purchase
```

### 5.3 Due Diligence Flow

```
User uploads legal documents
         │
         ▼
Frontend: DueDiligenceAgent component
         │
         └─ Call POST /api/agents/due-diligence
         │
         ▼
API Route: /api/agents/due-diligence
         │
         ├─ Extract text from PDF/images (OCR)
         ├─ Parse with OpenAI (legal entity extraction)
         ├─ Identify risks (regex + LLM)
         ├─ Summarize key terms
         └─ Calculate risk score
         │
         ▼
Return structured risk analysis
         │
         ▼
Frontend: Display report with
          - Risk cards (high/medium/low severity)
          - Key terms summary
          - Recommendations
          - Risk gauge visualization
```

### 5.4 Portfolio Manager Flow

```
Wallet connected (Sui)
         │
         ▼
Frontend: PortfolioManagerAgent component
         │
         ├─ Read user's wallet address
         └─ Call POST /api/agents/portfolio
         │
         ▼
API Route: /api/agents/portfolio
         │
         ├─ Query Sui blockchain (get tokens)
         ├─ Fetch property metadata
         ├─ Calculate portfolio metrics
         ├─ Analyze allocation drift
         ├─ Generate rebalancing suggestions
         └─ Check for opportunities
         │
         ▼
Return portfolio analysis + recommendations
         │
         ▼
Frontend: Display dashboard with
          - Portfolio composition (pie chart)
          - Performance metrics
          - Rebalancing suggestions
          - Market alerts
```

---

## 6. File Structure

```
src/
├── app/
│   └── api/
│       └── agents/
│           ├── valuate/
│           │   └── route.ts          # POST /api/agents/valuate
│           ├── match/
│           │   └── route.ts          # POST /api/agents/match
│           ├── due-diligence/
│           │   └── route.ts          # POST /api/agents/due-diligence
│           └── portfolio/
│               └── route.ts          # POST /api/agents/portfolio
│
├── components/
│   └── agents/
│       ├── ValuationAgent.tsx        # UI Component
│       ├── InvestorMatchingAgent.tsx
│       ├── DueDiligenceAgent.tsx
│       ├── PortfolioManagerAgent.tsx
│       └── common/
│           ├── AgentHeader.tsx       # Shared header
│           ├── ReasoningDisplay.tsx  # Chain-of-thought
│           ├── ConfidenceScore.tsx   # Confidence visualization
│           └── LoadingState.tsx      # Skeleton loaders
│
├── hooks/
│   ├── useValuationAgent.ts          # Agent logic + OpenAI calls
│   ├── useInvestorMatching.ts
│   ├── useDueDiligence.ts
│   ├── usePortfolioManager.ts
│   └── useAgentMemory.ts             # localStorage + persistence
│
├── lib/
│   ├── agents/
│   │   ├── prompts.ts                # System prompts for each agent
│   │   ├── validators.ts             # Input/output validation (Zod)
│   │   ├── transformers.ts           # Data transformation utilities
│   │   └── openai-client.ts          # OpenAI API wrapper
│   └── sui/
│       ├── client.ts                 # Sui SDK setup
│       └── property-queries.ts       # Fetch property data from chain
│
├── types/
│   └── agents.ts                     # TypeScript interfaces for agents
│
└── config/
    └── agents.ts                     # Agent configuration (models, temps, etc.)
```

---

## 7. API Specification

### 7.1 POST /api/agents/valuate

**Request:**

```json
{
	"propertyAddress": "123 Main St, Los Angeles, CA",
	"propertyType": "residential",
	"size": 1200,
	"bedrooms": 2,
	"bathrooms": 1,
	"year": 2005,
	"images": ["base64...", "base64..."],
	"documents": ["deed.pdf", "inspection.pdf"]
}
```

**Response:**

```json
{
	"success": true,
	"estimatedValue": {
		"min": 450000,
		"max": 520000,
		"confidence": 0.87,
		"currency": "USD"
	},
	"riskScore": {
		"overall": 0.32,
		"breakdown": { "structural": 0.25, "legal": 0.35, "market": 0.28 }
	},
	"investmentRating": 4.2,
	"reasoning": ["...", "..."],
	"sources": ["Zillow", "County records"],
	"timestamp": "2026-05-13T10:30:00Z"
}
```

### 7.2 POST /api/agents/match

**Request:**

```json
{
	"investorProfile": {
		"riskTolerance": "moderate",
		"budget": 50000,
		"preferences": ["residential", "strong_yield"],
		"excludeGeographies": ["rural"]
	}
}
```

**Response:**

```json
{
	"success": true,
	"matches": [
		{
			"propertyId": "0x...",
			"fitScore": 0.94,
			"reasoning": "...",
			"expectedYield": 7.2,
			"address": "..."
		}
	],
	"matchCount": 12
}
```

### 7.3 POST /api/agents/due-diligence

**Request:**

```json
{
	"documentContent": "...",
	"documentType": "deed",
	"propertyAddress": "..."
}
```

**Response:**

```json
{
	"success": true,
	"summary": { "title": "...", "date": "..." },
	"risks": [{ "severity": "high", "type": "Lien", "description": "..." }],
	"overallRiskScore": 0.42
}
```

### 7.4 POST /api/agents/portfolio

**Request:**

```json
{
	"walletAddress": "0x..."
}
```

**Response:**

```json
{
  "success": true,
  "portfolio": {
    "totalValue": 250000,
    "tokens": [...]
  },
  "recommendations": [...],
  "alerts": [...]
}
```

---

## 8. Environment Configuration

### `.env.local`

```bash
# OpenAI API
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4-turbo

# Sui Blockchain
NEXT_PUBLIC_SUI_NETWORK=mainnet
NEXT_PUBLIC_SUI_PACKAGE_ID=0x...

# Database (optional)
SUPABASE_URL=https://...
SUPABASE_ANON_KEY=...

# File Upload (optional)
WALRUS_API_KEY=...
```

---

## 9. Integration Points

### 9.1 Sui Blockchain

- **Read operations:**
  - Fetch property objects from marketplace
  - Read property metadata and valuation history
  - Query investor's token holdings (portfolio)
- **Write operations:**
  - Sign and execute PTBs for property recommendations → purchase flow
  - Log agent recommendations on-chain (for transparency)

### 9.2 Walrus (Document Storage)

- Store property documents, inspection reports, legal deeds
- Retrieve via content hash for agent analysis
- Optional: Store agent analysis reports

### 9.3 zkLogin

- Authenticate users without full KYC
- Privacy-preserving wallet connection
- User preferences stored locally

---

## 10. Error Handling & Logging

### Error Hierarchy

```
APIError (base)
├── OpenAIError (API call failed)
├── SuiBlockchainError (chain interaction failed)
├── ValidationError (invalid input)
├── NotFoundError (resource not found)
└── RateLimitError (quota exceeded)
```

### Logging Strategy

- Client: localStorage + browser console
- Server: structured logging (JSON) to stdout
- Monitoring: (optional) Sentry for production errors

---

## 11. Performance & Scaling

### Caching Strategy

| Data                | TTL     | Cache Layer                    |
| ------------------- | ------- | ------------------------------ |
| Property valuations | 24h     | localStorage + Redis           |
| Market comparables  | 6h      | Redis                          |
| Investor profiles   | Session | localStorage                   |
| Portfolio data      | 1h      | Redis (stale-while-revalidate) |

### Rate Limiting

- OpenAI: 3 requests/min per user (configurable)
- Sui RPC: 100 requests/min (Sui default)
- File uploads: 5MB max per file

---

## 12. Security Considerations

- **API key rotation:** Monthly
- **Input validation:** Zod schemas on all routes
- **File validation:** MIME type + size checks
- **Rate limiting:** Per-user quotas
- **Data privacy:** No PII stored without consent
- **Wallet security:** Private keys never exposed (use Sui SDK)

---

## 13. Testing Strategy

### Unit Tests

- Agent logic (validators, transformers)
- OpenAI prompt formatting
- Data transformations

### Integration Tests

- API routes end-to-end
- Sui blockchain queries (testnet)
- File upload handling

### E2E Tests

- Full user flows (upload → valuation → recommendation)
- Wallet connection → portfolio view

---

## 14. Deployment

### Development

```bash
npm run dev  # Starts Next.js on localhost:3000
```

### Production

- Vercel deployment (recommended for Next.js)
- Environment variables in Vercel dashboard
- GitHub Actions for CI/CD
- Testnet → Mainnet promotion flow

---

## 15. Next Steps (Implementation Order)

1. ✅ **Architecture Doc** (this file)
2. **Agent 1: Property Valuation Agent** — Foundation
   - API route (`/api/agents/valuate`)
   - Hook (`useValuationAgent`)
   - Component (`ValuationAgent.tsx`)
   - Prompts & validators
3. **Agent 2: Investor Matching Agent**
4. **Agent 3: Due Diligence Agent**
5. **Agent 4: Portfolio Manager Agent**
6. **Integration & Polish**
   - Shared components (ReasoningDisplay, ConfidenceScore)
   - localStorage persistence
   - Error handling & loading states
7. **Demo & Hackathon Submission**

---

## 16. References

- [OpenAI API Docs](https://platform.openai.com/docs)
- [Sui Documentation](https://docs.sui.io)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [Zod Validation](https://zod.dev)

---

**Document Version:** 1.0  
**Last Updated:** May 13, 2026  
**Status:** Ready for Implementation
