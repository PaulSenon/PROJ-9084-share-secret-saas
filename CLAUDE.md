# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an ephemeral secret-sharing SaaS built with Next.js, using Convex as the backend and tRPC to proxy Convex operations. The application implements client-side 256-bit AES-GCM encryption where secrets are encrypted in the browser before being sent to the server, ensuring zero-knowledge architecture.

## Architecture

### Core Flow
1. **Homepage (`/`)**: User enters plaintext → generates AES-GCM key → encrypts locally → sends ciphertext via tRPC to Convex → receives secret ID → constructs shareable URL with key in fragment
2. **Secret viewing (`/[id]`)**: Static page → extracts key from URL fragment → fetches and deletes ciphertext from Convex via tRPC → decrypts locally → displays with reveal/copy functionality

### Key Components
- **Frontend**: Next.js 15 with App Router, React 19, Tailwind CSS 4
- **Backend**: Convex database with tRPC API layer (no direct Convex client usage)  
- **Encryption**: Client-side AES-GCM 256-bit encryption (`src/lib/crypto.ts`)
- **State Management**: React Query via tRPC, localStorage caching for creator preview
- **Routing**: SSG-enabled dynamic routes for secret pages

### Data Flow
```
Client → encrypt(plaintext) → tRPC → Convex → secretId
Recipient → tRPC → Convex → ciphertext → decrypt(key_from_fragment) → plaintext
```

## Development Commands

```bash
# Development (runs both frontend and backend)
pnpm dev

# Frontend only
pnpm dev:frontend

# Backend only (Convex)
pnpm dev:backend

# Build and type checking
pnpm build
pnpm typecheck
pnpm check  # lint + typecheck

# Linting and formatting  
pnpm lint
pnpm lint:fix
pnpm format:check
pnpm format:write
```

## Key Files and Structure

### Convex Backend
- `convex/schema.ts`: Simple secrets table with optional payload field
- `convex/myFunctions.ts`: setSecret (create) and getSecret (read-and-delete) mutations

### tRPC API Layer
- `src/server/api/routers/secrets.ts`: Proxies Convex operations, never uses direct client queries
- `src/app/api/trpc/[trpc]/route.ts`: Next.js API route handler for tRPC

### Client Components  
- `src/components/secret-form.tsx`: Main form with encryption and URL generation
- `src/components/secret-viewer.tsx`: Secret display with blur/reveal functionality
- `src/lib/crypto.ts`: All AES-GCM encryption/decryption utilities

### Pages
- `src/app/page.tsx`: Homepage with secret creation form
- `src/app/[id]/page.tsx`: Dynamic secret viewing page (SSG-enabled)

## Important Constraints

1. **No Direct Convex Client Usage**: Always use tRPC endpoints instead of Convex's useQuery/useMutation hooks
2. **Client-Side Encryption**: All encryption/decryption happens in the browser using Web Crypto API
3. **Ephemeral Secrets**: Convex mutations delete the payload immediately after reading
4. **URL Fragment Keys**: Encryption keys are stored in URL fragments (#key) for client-side access
5. **SSG Architecture**: Secret pages use generateStaticParams() for optimal performance

## Caching Strategy

### Secret Persistence Behavior
- **getSecret endpoint**: Configured with `staleTime: Infinity` and `gcTime: Infinity`
- **Cache pre-population**: When creating secrets, ciphertext is immediately cached to prevent owner from consuming their own secret
- **Cross-session persistence**: Uses `@tanstack/query-async-storage-persister` with localStorage
- **Cache key format**: TanStack Query keys + `secret_${id}` in localStorage for metadata
- **No refetching**: All refetch options disabled (`refetchOnMount`, `refetchOnWindowFocus`, etc.)

### Cache Population Points
1. **Secret creation**: Owner's cache pre-populated in `SecretForm` component
2. **First viewing**: Recipient's cache populated after server fetch in `SecretViewer`
3. **Page refresh**: Both owner and recipient load from cache, no server calls

## TanStack Query Setup

### Query Client Architecture
- **Single source**: `src/trpc/query-client.ts` serves both server and client
- **Server behavior**: Creates fresh QueryClient for each request, no persistence
- **Client behavior**: Singleton pattern with localStorage persistence via `createAsyncStoragePersister`
- **Hydration**: Shared configuration ensures proper SSR/client hydration
- **Modern patterns**: Uses `@tanstack/query-async-storage-persister` (not deprecated `createSyncStoragePersister`)

## Security Notes

- Encryption keys never leave the client browser
- Server only stores encrypted ciphertext, never plaintext
- Secrets are deleted immediately upon first access
- Base64url encoding used for URL-safe key transmission
- Local cache only stores encrypted ciphertext, never plaintext or keys