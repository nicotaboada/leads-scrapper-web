import { type Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Facturación - Next.js Enterprise',
	description: 'Gestión de facturación',
}

export default function FacturacionPage() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Facturación</h1>
				<p className="text-muted-foreground">
					Gestiona la facturación y pagos de la plataforma
				</p>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				<div className="bg-card text-card-foreground rounded-lg border p-6 shadow-sm">
					<h3 className="text-lg font-semibold">Facturas Emitidas</h3>
					<p className="text-muted-foreground mt-2">Placeholder content</p>
				</div>

				<div className="bg-card text-card-foreground rounded-lg border p-6 shadow-sm">
					<h3 className="text-lg font-semibold">Pendientes de Pago</h3>
					<p className="text-muted-foreground mt-2">Placeholder content</p>
				</div>

				<div className="bg-card text-card-foreground rounded-lg border p-6 shadow-sm">
					<h3 className="text-lg font-semibold">Pagadas este mes</h3>
					<p className="text-muted-foreground mt-2">Placeholder content</p>
				</div>
			</div>
		</div>
	)
}
