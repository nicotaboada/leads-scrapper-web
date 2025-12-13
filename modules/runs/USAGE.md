# Runs Module - Usage Guide

## 📚 Overview

This module provides complete integration with the GraphQL backend for managing scraping runs, including:
- Creating new runs
- Playing (starting) paused runs
- Real-time status updates via WebSocket subscriptions
- Automatic polling for run completion

## 🎯 Quick Start

### 1. Create a Run

```typescript
import { useCreateRun } from '@/modules/runs/hooks/use-create-run'

function MyComponent() {
  const { createRun, loading } = useCreateRun()

  const handleCreate = async () => {
    const run = await createRun({
      name: 'Coffee Shops in Manhattan',
      actorType: 'GOOGLE_MAPS',
      input: {
        searchTerms: ['coffee shop', 'cafe'],
        location: 'Manhattan, NY',
        numberOfPlaces: 50,
      },
    })
    
    console.log('Created run:', run)
  }

  return <button onClick={handleCreate} disabled={loading}>Create Run</button>
}
```

### 2. Play (Start) a Run

```typescript
import { usePlayRun } from '@/modules/runs/hooks/use-play-run'

function MyComponent({ runId }: { runId: string }) {
  const { playRun, loading } = usePlayRun()

  const handlePlay = async () => {
    const run = await playRun(runId)
    console.log('Run started:', run)
  }

  return <button onClick={handlePlay} disabled={loading}>Play Run</button>
}
```

### 3. Subscribe to Run Updates

```typescript
import { useRunSubscription } from '@/modules/runs/hooks/use-run-subscription'

function MyComponent({ runId }: { runId: string }) {
  const { run, loading } = useRunSubscription({
    runId,
    enabled: true,
    onStatusChange: (updatedRun) => {
      console.log('Status changed:', updatedRun.status)
      if (updatedRun.status === 'SUCCEEDED') {
        console.log('Results:', updatedRun.resultCount)
      }
    },
  })

  return <div>Status: {run?.status}</div>
}
```

### 4. Fetch All Runs

```typescript
import { useRunsGraphQL } from '@/modules/runs/hooks/use-runs-graphql'

function MyComponent() {
  const { runs, loading, refetch } = useRunsGraphQL({
    filters: {
      status: 'RUNNING',
      limit: 10,
    },
    pollInterval: 30000, // Poll every 30 seconds
  })

  return (
    <div>
      {runs.map(run => (
        <div key={run.id}>{run.name}</div>
      ))}
    </div>
  )
}
```

## 🔄 Complete Flow Example

Here's a complete example showing create → play → subscribe:

```typescript
'use client'

import { useState } from 'react'
import { useCreateRun } from '@/modules/runs/hooks/use-create-run'
import { usePlayRun } from '@/modules/runs/hooks/use-play-run'
import { useRunSubscription } from '@/modules/runs/hooks/use-run-subscription'
import { RunStatus } from '@/modules/runs/types/run'

export function CompleteRunExample() {
  const [runId, setRunId] = useState<string | null>(null)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const { createRun, loading: creating } = useCreateRun()
  const { playRun, loading: playing } = usePlayRun()
  
  // Subscribe only when a run is active
  const { run } = useRunSubscription({
    runId: runId || '',
    enabled: isSubscribed && !!runId,
    onStatusChange: (updatedRun) => {
      console.log('Status:', updatedRun.status, 'Results:', updatedRun.resultCount)
      
      // Stop subscription when finished
      if (
        updatedRun.status === RunStatus.SUCCEEDED ||
        updatedRun.status === RunStatus.FAILED
      ) {
        setIsSubscribed(false)
      }
    },
  })

  const handleCreateAndPlay = async () => {
    // 1. Create the run
    const newRun = await createRun({
      name: 'Gyms in Los Angeles',
      actorType: 'GOOGLE_MAPS',
      input: {
        searchTerms: ['gym', 'fitness center'],
        location: 'Los Angeles, CA',
        numberOfPlaces: 100,
      },
    })

    if (newRun) {
      setRunId(newRun.id)

      // 2. Play the run
      const startedRun = await playRun(newRun.id)

      if (startedRun) {
        // 3. Start subscription
        setIsSubscribed(true)
      }
    }
  }

  return (
    <div>
      <button onClick={handleCreateAndPlay} disabled={creating || playing}>
        {creating ? 'Creating...' : playing ? 'Starting...' : 'Create & Play Run'}
      </button>

      {run && (
        <div>
          <p>Status: {run.status}</p>
          <p>Results: {run.resultCount}</p>
          {isSubscribed && <span>🔴 Live</span>}
        </div>
      )}
    </div>
  )
}
```

## 📊 Run Status Flow

```
CREATE RUN
    ↓
  PAUSED (⏸️)
    ↓ (user clicks Play)
  PENDING (⏳) 
    ↓ (Apify confirms)
  RUNNING (🔄)
    ↓
SUCCEEDED (✅) or FAILED (❌)
```

## 🎨 Components

### RunsTable
Displays a list of runs with:
- Automatic subscription for running runs
- Play button for paused runs
- Real-time status updates
- Live indicator when subscription is active

```typescript
import { RunsTable } from '@/modules/runs/components/runs-table'

<RunsTable runs={runs} />
```

### CreateRunSheet
Form to create a new run:
- Validates input with Zod
- Supports Google Maps actor (extensible)
- Automatic GraphQL mutation

```typescript
import { CreateRunSheet } from '@/modules/runs/components/create-run-sheet'

<CreateRunSheet
  open={isOpen}
  onOpenChange={setIsOpen}
  onRunCreated={(data) => console.log('Created:', data)}
/>
```

## ⚙️ Environment Variables

```env
# Backend GraphQL endpoint
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:3000/graphql

# WebSocket endpoint for subscriptions
NEXT_PUBLIC_GRAPHQL_WS_ENDPOINT=ws://localhost:3000/graphql
```

## 🔌 Apollo Client Configuration

The Apollo Client is configured with:
- HTTP link for queries and mutations
- WebSocket link for subscriptions
- Automatic split based on operation type
- Cache management

See: `lib/apollo/apollo-client.ts`

## 📝 TypeScript Types

All types are fully typed:

```typescript
import type {
  Run,
  RunStatus,
  RunResult,
  CreateRunInput,
  PlayRunInput,
  RunFiltersInput,
} from '@/modules/runs/types/run'
```

## 🐛 Troubleshooting

### Subscription not working?
- Check WebSocket endpoint in `.env.local`
- Ensure backend has subscriptions enabled
- Check browser console for WebSocket connection errors

### Mutations failing?
- Verify GraphQL endpoint is correct
- Check network tab for error responses
- Ensure input data matches backend schema

### Cache not updating?
- Mutations automatically update cache
- Use `refetch()` if needed
- Check Apollo DevTools for cache state

## 📚 Further Reading

- [Apollo Client Subscriptions](https://www.apollographql.com/docs/react/data/subscriptions/)
- [GraphQL-WS](https://github.com/enisdenjo/graphql-ws)
- [NestJS GraphQL Subscriptions](https://docs.nestjs.com/graphql/subscriptions)

