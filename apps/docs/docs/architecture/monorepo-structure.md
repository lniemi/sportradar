# Monorepo Structure

TrailRadar uses a pnpm monorepo with Turborepo for build orchestration.

## Directory Layout

```
trailradar/
├── apps/
│   ├── spectator/          # Main spectator app
│   ├── website/            # Company website
│   └── docs/               # Documentation (Docusaurus)
├── packages/
│   ├── auth/               # @trailradar/auth
│   ├── ui/                 # @trailradar/ui
│   ├── utils/              # @trailradar/utils
│   ├── config/             # @trailradar/config
│   └── typescript-config/  # @trailradar/typescript-config
├── supabase/               # Supabase configuration
├── data/                   # Shared data files
├── los_module/             # Python research module
├── pnpm-workspace.yaml     # Workspace configuration
├── turbo.json              # Turborepo configuration
└── package.json            # Root package.json
```

## Apps

### Spectator (`apps/spectator`)

The main application for spectators to track race participants.

- **Package name**: `@trailradar/spectator`
- **Port**: 5173
- **Tech**: React + Vite + TypeScript

### Website (`apps/website`)

The company marketing website.

- **Package name**: `@trailradar/website`
- **Port**: 5174
- **Tech**: React + Vite + TypeScript

### Docs (`apps/docs`)

This documentation site.

- **Package name**: `@trailradar/docs`
- **Port**: 3000
- **Tech**: Docusaurus

## Packages

### @trailradar/auth

Authentication utilities using Supabase.

```typescript
import { AuthProvider, useAuth, getSupabaseClient } from '@trailradar/auth'
```

### @trailradar/ui

Shared UI components.

```typescript
import { Button, Card } from '@trailradar/ui'
```

### @trailradar/utils

Shared utilities, primarily geo calculations.

```typescript
import {
  haversineDistance,
  calculateTotalDistance,
  getPositionAtDistance
} from '@trailradar/utils/geo'
```

### @trailradar/config

Shared ESLint and Tailwind configurations.

### @trailradar/typescript-config

Shared TypeScript configuration files.

## Workspace Configuration

### pnpm-workspace.yaml

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

### turbo.json

Defines the task pipeline:

- **build**: Depends on `^build` (builds dependencies first)
- **dev**: Runs in parallel, persistent
- **lint**: Can run in parallel
- **typecheck**: Can run in parallel

## Adding New Packages

1. Create directory under `apps/` or `packages/`
2. Add `package.json` with appropriate name (e.g., `@trailradar/new-package`)
3. The workspace will automatically recognize it
4. Run `pnpm install` to link dependencies
