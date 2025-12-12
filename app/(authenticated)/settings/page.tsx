import { type Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Configuración - Next.js Enterprise',
	description: 'Configuración de la plataforma',
}

export default function SettingsPage() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
				<p className="text-muted-foreground">
					Administra la configuración de la plataforma
				</p>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				<div className="bg-card text-card-foreground rounded-lg border p-6 shadow-sm">
					<h3 className="text-lg font-semibold">Perfil</h3>
					<p className="text-muted-foreground mt-2">
						Configuración de perfil de usuario
					</p>
				</div>

				<div className="bg-card text-card-foreground rounded-lg border p-6 shadow-sm">
					<h3 className="text-lg font-semibold">Sistema</h3>
					<p className="text-muted-foreground mt-2">
						Configuración general del sistema
					</p>
				</div>

				<div className="bg-card text-card-foreground rounded-lg border p-6 shadow-sm">
					<h3 className="text-lg font-semibold">Seguridad</h3>
					<p className="text-muted-foreground mt-2">
						Configuración de seguridad
					</p>
				</div>
			</div>
		</div>
	)
}
