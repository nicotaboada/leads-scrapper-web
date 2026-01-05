'use client'

import { Bot, Camera, Search, Sparkles } from 'lucide-react'
import type { ApiKeyService } from '../types'
import { SERVICE_CONFIGS } from '../types'

interface ServiceSelectorProps {
	onSelect: (service: ApiKeyService) => void
	getKeyCount: (service: ApiKeyService) => number
}

const SERVICE_ICONS: Record<ApiKeyService, React.ElementType> = {
	APIFY: Bot,
	OPENAI: Sparkles,
	SERPAPI: Search,
	SCREENSHOTONE: Camera,
}

/**
 * Step 1: Service selection for adding a new API key
 */
export function ServiceSelector({
	onSelect,
	getKeyCount,
}: ServiceSelectorProps) {
	return (
		<div className="space-y-4">
			<p className="text-muted-foreground text-sm">
				Select a service to add an API key
			</p>

			<div className="space-y-2">
				{SERVICE_CONFIGS.map((config) => {
					const Icon = SERVICE_ICONS[config.key]
					const keyCount = getKeyCount(config.key)

					return (
						<button
							key={config.key}
							type="button"
							onClick={() => onSelect(config.key)}
							className="hover:bg-muted/50 flex w-full items-center gap-3 rounded-lg border p-4 text-left transition-colors"
						>
							<div className="bg-muted flex h-10 w-10 items-center justify-center rounded-lg">
								<Icon className="text-muted-foreground h-5 w-5" />
							</div>
							<div>
								<p className="font-medium">{config.name}</p>
								<p className="text-muted-foreground text-sm">
									{keyCount} key(s) configured
								</p>
							</div>
						</button>
					)
				})}
			</div>
		</div>
	)
}
