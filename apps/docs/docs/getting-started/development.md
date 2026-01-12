# Development

This guide covers the development workflow for TrailRadar.

## Development Commands

### Running Apps

```bash
# Run all apps in dev mode
pnpm dev

# Run spectator app only (port 5173)
pnpm dev:spectator

# Run website only (port 5174)
pnpm dev:website

# Run documentation (port 3000)
pnpm dev:docs
```

### Building

```bash
# Build all apps
pnpm build

# Build specific apps
pnpm build:spectator
pnpm build:website
pnpm build:docs
```

### Other Commands

```bash
# Lint all packages
pnpm lint

# TypeScript type checking
pnpm typecheck

# Clean all build artifacts
pnpm clean
```

## Supabase Local Development

### Starting Supabase

```bash
pnpm supabase:start
```

This starts the local Supabase instance. The output will include the API URL and keys needed for your `.env` file.

### Stopping Supabase

```bash
pnpm supabase:stop
```

### Resetting the Database

```bash
pnpm supabase:reset
```

This resets the local database to its initial state.

## Working with the Monorepo

### Package Structure

The monorepo uses pnpm workspaces. Packages can import each other using their package names:

```typescript
// Import from shared packages
import { haversineDistance } from '@trailradar/utils/geo'
import { AuthProvider, useAuth } from '@trailradar/auth'
import { Button, Card } from '@trailradar/ui'
```

### Adding Dependencies

To add a dependency to a specific package:

```bash
# Add to spectator app
pnpm --filter @trailradar/spectator add package-name

# Add to shared utils
pnpm --filter @trailradar/utils add package-name

# Add dev dependency
pnpm --filter @trailradar/spectator add -D package-name
```

### Running Commands in Specific Packages

```bash
pnpm --filter @trailradar/spectator <command>
pnpm --filter @trailradar/website <command>
```

## Turborepo

The monorepo uses Turborepo for build orchestration. The `turbo.json` configuration defines the task pipeline and caching behavior.

Key benefits:
- **Caching**: Build outputs are cached, speeding up subsequent builds
- **Parallelization**: Independent tasks run in parallel
- **Dependency awareness**: Tasks run in the correct order based on package dependencies
