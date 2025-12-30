'use client'

import { Bot, Camera, Search, Sparkles } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card'
import { Badge } from 'components/ui/badge'
import { toast } from 'sonner'
import { ActiveKeyDisplay } from './active-key-display'
import { OtherKeysList } from './other-keys-list'
import { useSetActiveKey } from '../hooks/use-set-active-key'
import { useDeleteApiKey } from '../hooks/use-delete-api-key'
import type { ApiKey, ApiKeyService } from '../types'

interface ServiceCardProps {
	service: ApiKeyService
	serviceName: string
	activeKey: ApiKey | undefined
	otherKeys: ApiKey[]
}

const SERVICE_ICONS: Record<ApiKeyService, React.ElementType> = {
	APIFY: Bot,
	OPENAI: Sparkles,
	SERPAPI: Search,
	SCREENSHOTONE: Camera,
}

/**
 * Card component displaying API keys for a single service
 */
export function ServiceCard({
	service,
	serviceName,
	activeKey,
	otherKeys,
}: ServiceCardProps) {
	const Icon = SERVICE_ICONS[service]
	const hasActiveKey = !!activeKey

	const { setActiveKey, loading: isSettingActive } = useSetActiveKey()
	const { deleteApiKey, loading: isDeleting } = useDeleteApiKey()

	async function handleSetActive(id: string) {
		try {
			await setActiveKey(id)
			toast.success('API key set as active')
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : 'Failed to set active key'
			)
		}
	}

	async function handleDelete(id: string) {
		try {
			await deleteApiKey(id)
			toast.success('API key deleted')
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : 'Failed to delete API key'
			)
		}
	}

	return (
		<Card>
			<CardHeader className="pb-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
							<Icon className="h-5 w-5 text-muted-foreground" />
						</div>
						<div>
							<CardTitle className="text-lg">{serviceName}</CardTitle>
							<p className="text-xs text-muted-foreground">
								{hasActiveKey ? 'Active key configured' : 'No active key'}
							</p>
						</div>
					</div>
					{hasActiveKey && (
						<Badge
							variant="secondary"
							className="border-border bg-muted/50 text-foreground"
						>
							Active
						</Badge>
					)}
				</div>
			</CardHeader>
			<CardContent>
				{activeKey ? (
					<ActiveKeyDisplay 
						apiKey={activeKey} 
						onDelete={handleDelete}
						isDeleting={isDeleting}
					/>
				) : (
					<div className="rounded-lg border-2 border-dashed border-muted-foreground/20 p-4 text-center">
						<p className="text-sm text-muted-foreground">
							No active API key configured
						</p>
					</div>
				)}

				<OtherKeysList
					keys={otherKeys}
					onSetActive={handleSetActive}
					onDelete={handleDelete}
					isSettingActive={isSettingActive}
					isDeleting={isDeleting}
				/>
			</CardContent>
		</Card>
	)
}

