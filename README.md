# ELF

ELF turns 4 live crypto data sources into 11 ready-to-film content ideas in one click, using a 2-LLM pipeline (Gemini + DeepSeek fallback).

- **11 content ideas per run:** a 3-step pipeline (collect, analyze, generate) gives 5 Instagram reels, 3 YouTube videos and 3 X threads. Each idea comes with a hook, angle, script outline and source link.
- **4 live sources, 2 LLMs, works with 0 keys:** signals come from Reddit, YouTube, 4 crypto news RSS feeds (CoinDesk, Cointelegraph, Decrypt, Bitcoin Magazine) and web search. Gemini is the primary LLM with DeepSeek (via OpenRouter) as fallback. With every API key empty, the backend runs in mock mode so the demo still works.

## Structure

- [`kairosFrontend`](kairosFrontend) — Next.js dashboard (port 3000)
- [`kairosbackend`](kairosbackend) — Fastify API (port 8080)

## Run locally

```bash
cd kairosbackend && cp .env.example .env && npm install && npm run dev
cd kairosFrontend && npm install && npm run dev   # needs .env.local: BACKEND_URL=http://localhost:8080, PROXY_SECRET=<same as backend>
```
