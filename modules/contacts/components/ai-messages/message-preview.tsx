'use client'

/**
 * Message Preview Component
 *
 * Displays the generated AI message with copy functionality
 */

import { useState } from 'react'
import { Copy, Check, Sparkles } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from 'components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card'
import { Skeleton } from 'components/ui/skeleton'
import { cn } from 'lib/utils/merge'

interface MessagePreviewProps {
	message: string | null
	isLoading?: boolean
	emptyStateMessage?: string
	className?: string
}

export function MessagePreview({
	message,
	isLoading,
	emptyStateMessage = 'Selecciona al menos un problema',
	className,
}: MessagePreviewProps) {
	const [isCopied, setIsCopied] = useState(false)

	async function handleCopy() {
		if (!message) return
		try {
			await navigator.clipboard.writeText(message)
			setIsCopied(true)
			toast.success('¡Mensaje copiado!')
			setTimeout(() => setIsCopied(false), 2000)
		} catch {
			toast.error('Error al copiar')
		}
	}

	return (
		<Card className={cn('flex h-full flex-col', className)}>
			<CardHeader className="flex flex-row items-center justify-between pb-4">
				<CardTitle className="text-base font-semibold">Mensaje generado</CardTitle>
				{message && (
					<Button
						variant="outline"
						size="sm"
						onClick={handleCopy}
						className="gap-2"
						disabled={isCopied}
					>
						{isCopied ? (
							<>
								<Check className="h-4 w-4" />
								Copiado
							</>
						) : (
							<>
								<Copy className="h-4 w-4" />
								Copiar
							</>
						)}
					</Button>
				)}
			</CardHeader>
			<CardContent className="flex-1">
				{isLoading ? (
					<div className="space-y-3">
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-11/12" />
						<Skeleton className="h-4 w-10/12" />
						<Skeleton className="h-4 w-9/12" />
						<Skeleton className="h-4 w-11/12" />
					</div>
				) : message ? (
					<div className="min-h-[200px] rounded-lg border border-dashed border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900">
						<p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
							{message}
						</p>
					</div>
				) : (
					<div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed border-zinc-200 bg-zinc-50 p-8 text-center dark:border-zinc-700 dark:bg-zinc-900">
						<div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
							<Sparkles className="h-6 w-6 text-zinc-400" />
						</div>
						<p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
							{emptyStateMessage}
						</p>
						<p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
							y haz clic en "Generar Mensaje"
						</p>
					</div>
				)}
			</CardContent>
		</Card>
	)
}

