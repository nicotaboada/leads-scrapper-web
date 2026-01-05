'use client'

import { Check, Loader2, Trash2 } from 'lucide-react'
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
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import type { ApiKey } from '../types'

interface ActiveKeyDisplayProps {
	apiKey: ApiKey
	onDelete?: (id: string) => void
	isDeleting?: boolean
}

/**
 * Displays the active API key with masked value and label
 */
export function ActiveKeyDisplay({
	apiKey,
	onDelete,
	isDeleting,
}: ActiveKeyDisplayProps) {
	const maskedKey = `*********${apiKey.keyLastFour}`

	return (
		<div className="group bg-muted/30 hover:bg-muted/50 relative rounded-lg border p-4 transition-colors">
			<div className="flex items-center justify-between">
				<p className="text-muted-foreground text-xs font-medium uppercase">
					Current Active Key
				</p>
				<div className="flex items-center gap-2">
					{onDelete && (
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="text-muted-foreground hover:text-destructive h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
									disabled={isDeleting}
								>
									{isDeleting ? (
										<Loader2 className="h-3 w-3 animate-spin" />
									) : (
										<Trash2 className="h-3 w-3" />
									)}
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>Delete Active API Key?</AlertDialogTitle>
									<AlertDialogDescription>
										This will delete the currently active API key for this
										service.
										{apiKey.label && ` Label: ${apiKey.label}`}
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
					)}
					<Check className="text-foreground h-4 w-4" />
				</div>
			</div>
			<p className="mt-2 font-mono text-sm font-semibold">{maskedKey}</p>
			{apiKey.label && (
				<p className="text-muted-foreground mt-1 text-sm">{apiKey.label}</p>
			)}
		</div>
	)
}
