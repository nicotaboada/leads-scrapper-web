import { type Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Facturas - Next.js Enterprise',
	description: 'Gestión de facturas',
}

export default function InvoicesPage() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Facturas</h1>
				<p className="text-muted-foreground">
					Visualiza y gestiona todas las facturas del sistema
				</p>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				<div className="bg-card text-card-foreground rounded-lg border p-6 shadow-sm">
					<h3 className="text-lg font-semibold">Total Facturas</h3>
					<p className="text-muted-foreground mt-2">Placeholder content</p>
				</div>

				<div className="bg-card text-card-foreground rounded-lg border p-6 shadow-sm">
					<h3 className="text-lg font-semibold">Facturas Vencidas</h3>
					<p className="text-muted-foreground mt-2">Placeholder content</p>
				</div>

				<div className="bg-card text-card-foreground rounded-lg border p-6 shadow-sm">
					<h3 className="text-lg font-semibold">Monto Total</h3>
					<p className="text-muted-foreground mt-2">Placeholder content</p>
				</div>
			</div>
		</div>
	)
}
