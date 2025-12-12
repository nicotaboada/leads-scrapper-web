'use client'

import { CheckCircle2, Clock, XCircle } from 'lucide-react'
import { Button } from 'components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from 'components/ui/card'

/**
 * Student payments tab component.
 * Displays payment history and account status of a student.
 *
 * @returns The student payments tab content
 */
export function StudentPaymentsTab() {
	// Mock payment data
	const payments = [
		{
			id: 1,
			date: '2024-11-01',
			concept: 'Cuota Noviembre 2024',
			amount: 45000,
			status: 'paid',
		},
		{
			id: 2,
			date: '2024-10-01',
			concept: 'Cuota Octubre 2024',
			amount: 45000,
			status: 'paid',
		},
		{
			id: 3,
			date: '2024-09-01',
			concept: 'Cuota Septiembre 2024',
			amount: 45000,
			status: 'paid',
		},
		{
			id: 4,
			date: '2024-08-01',
			concept: 'Cuota Agosto 2024',
			amount: 45000,
			status: 'pending',
		},
	]

	const totalDebt = payments
		.filter((p) => p.status === 'pending')
		.reduce((sum, p) => sum + p.amount, 0)

	const getStatusIcon = (status: string) => {
		switch (status) {
			case 'paid':
				return <CheckCircle2 className="h-5 w-5 text-green-600" />
			case 'pending':
				return <Clock className="h-5 w-5 text-yellow-600" />
			case 'overdue':
				return <XCircle className="h-5 w-5 text-red-600" />
			default:
				return null
		}
	}

	const getStatusText = (status: string) => {
		switch (status) {
			case 'paid':
				return 'Pagado'
			case 'pending':
				return 'Pendiente'
			case 'overdue':
				return 'Vencido'
			default:
				return status
		}
	}

	const getStatusClass = (status: string) => {
		switch (status) {
			case 'paid':
				return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
			case 'pending':
				return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
			case 'overdue':
				return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
			default:
				return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
		}
	}

	return (
		<div className="grid gap-6 md:grid-cols-3">
			{/* Account Summary */}
			<div className="space-y-6 md:col-span-1">
				<Card>
					<CardHeader>
						<CardTitle>Estado de Cuenta</CardTitle>
						<CardDescription>Resumen financiero</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div>
							<p className="text-muted-foreground text-sm">Deuda Total</p>
							<p className="text-2xl font-bold text-red-600 dark:text-red-400">
								${totalDebt.toLocaleString('es-AR')}
							</p>
						</div>

						<div className="border-t pt-4">
							<p className="text-muted-foreground mb-2 text-sm">
								Próximo Vencimiento
							</p>
							<p className="text-sm font-medium">15 de Diciembre 2024</p>
							<p className="text-muted-foreground mt-1 text-xs">
								Cuota mensual: $45.000
							</p>
						</div>

						<Button className="w-full" size="sm">
							Registrar Pago
						</Button>
					</CardContent>
				</Card>
			</div>

			{/* Payment History */}
			<Card className="md:col-span-2">
				<CardHeader>
					<CardTitle>Historial de Pagos</CardTitle>
					<CardDescription>Últimos movimientos registrados</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-3">
						{payments.map((payment) => (
							<div
								key={payment.id}
								className="hover:bg-muted/50 flex items-center justify-between rounded-lg border p-4 transition-colors"
							>
								<div className="flex items-center gap-3">
									{getStatusIcon(payment.status)}
									<div>
										<p className="text-sm font-medium">{payment.concept}</p>
										<p className="text-muted-foreground text-xs">
											{new Date(payment.date).toLocaleDateString('es-AR', {
												year: 'numeric',
												month: 'long',
												day: 'numeric',
											})}
										</p>
									</div>
								</div>
								<div className="flex items-center gap-3">
									<p className="text-sm font-semibold">
										${payment.amount.toLocaleString('es-AR')}
									</p>
									<span
										className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusClass(payment.status)}`}
									>
										{getStatusText(payment.status)}
									</span>
								</div>
							</div>
						))}
					</div>

					{payments.length === 0 && (
						<p className="text-muted-foreground py-8 text-center text-sm">
							No hay pagos registrados
						</p>
					)}
				</CardContent>
			</Card>
		</div>
	)
}
