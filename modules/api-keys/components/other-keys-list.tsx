'use client'

import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from 'components/ui/alert-dialog'
import { Button } from 'components/ui/button'
import type { ApiKey } from '../types'

interface OtherKeysListProps {
	keys: ApiKey[]
	onSetActive: (id: string) => Promise<void>
	onDelete: (id: string) => Promise<void>
	isSettingActive: boolean
	isDeleting: boolean
}

/**
 * Displays a collapsible list of non-active API keys with actions
 */
export function OtherKeysList({
	keys,
	onSetActive,
	onDelete,
	isSettingActive,
	isDeleting,
}: OtherKeysListProps) {
	const [isExpanded, setIsExpanded] = useState(false)

	if (keys.length === 0) {
		return null
	}

	return (
		<div className="mt-4">
			<div className="flex items-center justify-between">
				<p className="text-muted-foreground text-xs font-medium uppercase">
					Other Keys ({keys.length})
				</p>
				<button
					type="button"
					onClick={() => setIsExpanded(!isExpanded)}
					className="text-primary text-sm font-medium hover:underline"
				>
					{isExpanded ? 'Hide' : 'Show all'}
				</button>
			</div>

			{isExpanded && (
				<div className="mt-3 space-y-2">
					{keys.map((key) => (
						<OtherKeyItem
							key={key.id}
							apiKey={key}
							onSetActive={onSetActive}
							onDelete={onDelete}
							isSettingActive={isSettingActive}
							isDeleting={isDeleting}
						/>
					))}
				</div>
			)}
		</div>
	)
}

interface OtherKeyItemProps {
	apiKey: ApiKey
	onSetActive: (id: string) => Promise<void>
	onDelete: (id: string) => Promise<void>
	isSettingActive: boolean
	isDeleting: boolean
}

function OtherKeyItem({
	apiKey,
	onSetActive,
	onDelete,
	isSettingActive,
	isDeleting,
}: OtherKeyItemProps) {
	const maskedKey = `*********${apiKey.keyLastFour}`

	return (
		<div className="group bg-muted/30 hover:bg-muted/50 flex items-center justify-between rounded-lg border p-3 transition-colors">
			<div>
				<p className="font-mono text-sm">{maskedKey}</p>
				{apiKey.label && (
					<p className="text-muted-foreground text-xs">{apiKey.label}</p>
				)}
			</div>

			<div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
				<Button
					variant="outline"
					size="sm"
					onClick={() => onSetActive(apiKey.id)}
					disabled={isSettingActive || isDeleting}
				>
					Set Active
				</Button>

				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="text-muted-foreground hover:text-destructive h-8 w-8"
							disabled={isDeleting}
						>
							<Trash2 className="h-4 w-4" />
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Delete API Key</AlertDialogTitle>
							<AlertDialogDescription>
								Are you sure you want to delete this API key? This action cannot
								be undone.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction
								onClick={() => onDelete(apiKey.id)}
								className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
							>
								Delete
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</div>
	)
}
