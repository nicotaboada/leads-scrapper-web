'use client'

import { useState } from 'react'
import { Check, Trash2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
import type { ApiKey } from '../types'

interface ActiveKeyDisplayProps {
	apiKey: ApiKey
	onDelete?: (id: string) => void
	isDeleting?: boolean
}

/**
 * Displays the active API key with masked value and label
 */
export function ActiveKeyDisplay({ apiKey, onDelete, isDeleting }: ActiveKeyDisplayProps) {
	const [isHovered, setIsHovered] = useState(false)
	const maskedKey = `*********${apiKey.keyLastFour}`

	return (
		<div 
			className="group relative rounded-lg border-2 border-emerald-500/30 bg-emerald-500/5 p-4"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className="flex items-center justify-between">
				<p className="text-xs font-medium uppercase text-emerald-600">
					Current Active Key
				</p>
				<div className="flex items-center gap-2">
					{isHovered && onDelete && (
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="h-6 w-6 text-destructive hover:bg-destructive/10 hover:text-destructive"
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
										This will delete the currently active API key for this service.
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
					<Check className="h-4 w-4 text-emerald-500" />
				</div>
			</div>
			<p className="mt-2 font-mono text-sm font-semibold">{maskedKey}</p>
			{apiKey.label && (
				<p className="mt-1 text-sm text-muted-foreground">{apiKey.label}</p>
			)}
		</div>
	)
}

