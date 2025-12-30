'use client'

import { useState } from 'react'
import { Bot, Camera, Search, Sparkles } from 'lucide-react'
import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { Label } from 'components/ui/label'
import type { ApiKeyService } from '../types'
import { SERVICE_CONFIGS } from '../types'

interface KeyFormProps {
	selectedService: ApiKeyService
	onBack: () => void
	onSubmit: (key: string, label?: string) => Promise<void>
	isLoading: boolean
	error?: string | null
}

const SERVICE_ICONS: Record<ApiKeyService, React.ElementType> = {
	APIFY: Bot,
	OPENAI: Sparkles,
	SERPAPI: Search,
	SCREENSHOTONE: Camera,
}

/**
 * Step 2: API key input form
 */
export function KeyForm({
	selectedService,
	onBack,
	onSubmit,
	isLoading,
	error,
}: KeyFormProps) {
	const [apiKey, setApiKey] = useState('')
	const [label, setLabel] = useState('')

	const serviceConfig = SERVICE_CONFIGS.find((c) => c.key === selectedService)
	const Icon = SERVICE_ICONS[selectedService]

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		if (!apiKey.trim()) return
		await onSubmit(apiKey.trim(), label.trim() || undefined)
	}

	const isValid = apiKey.trim().length > 0

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			{/* Selected service display */}
			<div className="flex items-center gap-3 rounded-lg border p-4">
				<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
					<Icon className="h-5 w-5 text-muted-foreground" />
				</div>
				<div className="flex-1">
					<p className="font-medium">{serviceConfig?.name}</p>
					<button
						type="button"
						onClick={onBack}
						className="text-sm text-primary hover:underline"
					>
						Change service
					</button>
				</div>
			</div>

			{/* Label input */}
			<div className="space-y-2">
				<Label htmlFor="label">Label (Optional)</Label>
				<Input
					id="label"
					placeholder="e.g. Personal Account"
					value={label}
					onChange={(e) => setLabel(e.target.value)}
					disabled={isLoading}
				/>
			</div>

			{/* API Key input */}
			<div className="space-y-2">
				<Label htmlFor="apiKey">API Key</Label>
				<Input
					id="apiKey"
					placeholder="Paste your API key here"
					value={apiKey}
					onChange={(e) => setApiKey(e.target.value)}
					disabled={isLoading}
					type="password"
				/>
				{error && <p className="text-sm text-destructive">{error}</p>}
			</div>

			{/* Actions */}
			<div className="flex justify-end gap-3 pt-2">
				<Button type="button" variant="outline" onClick={onBack} disabled={isLoading}>
					Cancel
				</Button>
				<Button type="submit" disabled={!isValid || isLoading}>
					{isLoading ? 'Validating...' : 'Add Key'}
				</Button>
			</div>
		</form>
	)
}

