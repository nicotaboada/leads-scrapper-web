'use client'

import { Activity, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { DetailHeader } from '@/components/layouts/detail-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

/**
 * Run detail page component (placeholder)
 * Displays detailed information about a specific run
 *
 * @param props - The page props containing the run ID
 * @returns The run detail page
 */
export default function RunDetailPage({
	params,
}: {
	params: { runId: string }
}) {
	// TODO: Fetch run data from API/database using the runId
	// This is placeholder data for demonstration
	const { runId } = params

	return (
		<div className="space-y-6">
			<DetailHeader
				breadcrumbItems={[
					{
						icon: Activity,
						label: 'Runs',
						href: '/runs',
					},
					{
						label: runId,
					},
				]}
				actions={
					<Button variant="outline" asChild>
						<Link href="/runs">
							<ArrowLeft className="mr-2 h-4 w-4" />
							Back to Runs
						</Link>
					</Button>
				}
			/>

			<Card>
				<CardHeader>
					<CardTitle>Run Details</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="rounded-lg border border-dashed p-8 text-center">
							<Activity className="text-muted-foreground mx-auto h-12 w-12" />
							<h3 className="mt-4 text-lg font-semibold">
								Detail page coming soon
							</h3>
							<p className="text-muted-foreground mt-2 text-sm">
								The detailed view for run <strong>{runId}</strong> will be
								implemented in a future update.
							</p>
							<p className="text-muted-foreground mt-2 text-sm">
								This page will display comprehensive information about the run,
								including results, logs, and execution details.
							</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
