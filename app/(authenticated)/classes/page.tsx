import { type Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Clases - Next.js Enterprise',
	description: 'Gestión de clases',
}

export default function ClassesPage() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Clases</h1>
				<p className="text-muted-foreground">
					Gestiona y administra las clases de la plataforma
				</p>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				<div className="bg-card text-card-foreground rounded-lg border p-6 shadow-sm">
					<h3 className="text-lg font-semibold">Total Clases</h3>
					<p className="text-muted-foreground mt-2">Placeholder content</p>
				</div>

				<div className="bg-card text-card-foreground rounded-lg border p-6 shadow-sm">
					<h3 className="text-lg font-semibold">Clases Activas</h3>
					<p className="text-muted-foreground mt-2">Placeholder content</p>
				</div>

				<div className="bg-card text-card-foreground rounded-lg border p-6 shadow-sm">
					<h3 className="text-lg font-semibold">Próximas Clases</h3>
					<p className="text-muted-foreground mt-2">Placeholder content</p>
				</div>
			</div>
		</div>
	)
}
