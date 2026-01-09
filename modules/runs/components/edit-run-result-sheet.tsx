'use client'

/**
 * Edit Run Result Sheet Component
 *
 * A Sheet component to edit run result data before creating contacts.
 * Allows quick correction of data scraped from Apify.
 */

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet'
import { useUpdateRunResult } from '../hooks/use-update-run-result'
import type { RunResult } from '../types/run-result'
import { extractGoogleMapsResult } from '../types/run-result'

/**
 * Form input for editing run result
 */
interface EditRunResultFormInput {
	name: string
	city: string
	website: string
	phone: string
	instagram: string
	facebook: string
	linkedin: string
}

interface EditRunResultSheetProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	result: RunResult | null
	onResultUpdated?: () => void
}

export function EditRunResultSheet({
	open,
	onOpenChange,
	result,
	onResultUpdated,
}: EditRunResultSheetProps) {
	const { updateRunResult, loading } = useUpdateRunResult()

	const form = useForm<EditRunResultFormInput>({
		defaultValues: {
			name: '',
			city: '',
			website: '',
			phone: '',
			instagram: '',
			facebook: '',
			linkedin: '',
		},
		mode: 'onBlur',
		reValidateMode: 'onChange',
	})

	// Update form when result changes
	useEffect(() => {
		if (result && open) {
			const googleResult = extractGoogleMapsResult(result)
			const normalized = result.normalized as Record<string, unknown> | null
			const raw = result.raw as Record<string, unknown>

			// Get phone from various possible fields
			const phone =
				(normalized?.phone as string) ||
				(raw.phone as string) ||
				(raw.phoneNumber as string) ||
				(raw.telephone as string) ||
				''

			form.reset({
				name: googleResult.placeName || '',
				city: googleResult.city || '',
				website: googleResult.website || '',
				phone,
				instagram: googleResult.instagram || '',
				facebook: googleResult.facebook || '',
				linkedin: googleResult.linkedin || '',
			})
		}
	}, [result, open, form])

	async function handleSubmit(data: EditRunResultFormInput) {
		if (!result) return

		try {
			const updatedResult = await updateRunResult(result.id, {
				name: data.name || undefined,
				city: data.city || undefined,
				website: data.website || undefined,
				phone: data.phone || undefined,
				instagram: data.instagram || undefined,
				facebook: data.facebook || undefined,
				linkedin: data.linkedin || undefined,
			})

			if (updatedResult) {
				toast.success('Resultado actualizado exitosamente')
				onResultUpdated?.()
				handleOpenChange(false)
			} else {
				toast.error('Error al actualizar el resultado')
			}
		} catch (error) {
			toast.error('Error al actualizar el resultado')
			console.error('Error updating run result:', error)
		}
	}

	function handleOpenChange(open: boolean) {
		if (!open) {
			form.reset()
			form.clearErrors()
		}
		onOpenChange(open)
	}

	return (
		<Sheet open={open} onOpenChange={handleOpenChange}>
			<SheetContent
				className="flex h-full flex-col sm:max-w-md"
				onOpenAutoFocus={(e) => e.preventDefault()}
			>
				<SheetHeader className="shrink-0">
					<SheetTitle>Editar Resultado</SheetTitle>
					<SheetDescription>
						Modifique los datos antes de crear el contacto
					</SheetDescription>
				</SheetHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="flex min-h-0 flex-1 flex-col"
					>
						<div className="flex-1 space-y-6 overflow-y-auto px-4 py-4">
							{/* Nombre */}
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nombre</FormLabel>
										<FormControl>
											<Input
												placeholder="Nombre del lugar"
												{...field}
												disabled={loading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Ciudad */}
							<FormField
								control={form.control}
								name="city"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Ciudad</FormLabel>
										<FormControl>
											<Input
												placeholder="Ciudad"
												{...field}
												disabled={loading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Sitio web */}
							<FormField
								control={form.control}
								name="website"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Sitio web</FormLabel>
										<FormControl>
											<Input
												placeholder="https://www.ejemplo.com"
												{...field}
												disabled={loading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Teléfono */}
							<FormField
								control={form.control}
								name="phone"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Teléfono</FormLabel>
										<FormControl>
											<Input
												placeholder="+54 351 123 4567"
												{...field}
												disabled={loading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Instagram */}
							<FormField
								control={form.control}
								name="instagram"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Instagram</FormLabel>
										<FormControl>
											<Input
												placeholder="https://instagram.com/usuario"
												{...field}
												disabled={loading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Facebook */}
							<FormField
								control={form.control}
								name="facebook"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Facebook</FormLabel>
										<FormControl>
											<Input
												placeholder="https://facebook.com/usuario"
												{...field}
												disabled={loading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* LinkedIn */}
							<FormField
								control={form.control}
								name="linkedin"
								render={({ field }) => (
									<FormItem>
										<FormLabel>LinkedIn</FormLabel>
										<FormControl>
											<Input
												placeholder="https://linkedin.com/company/..."
												{...field}
												disabled={loading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<SheetFooter className="mt-4 shrink-0 flex-row gap-2 border-t pt-4">
							<div className="flex-[0.5]" />
							<Button
								type="button"
								variant="outline"
								onClick={() => handleOpenChange(false)}
								disabled={loading}
								className="flex-[0.2] cursor-pointer"
							>
								Cancelar
							</Button>
							<Button
								type="submit"
								disabled={loading}
								className="flex-[0.5] cursor-pointer"
							>
								{loading ? 'Guardando...' : 'Guardar'}
							</Button>
						</SheetFooter>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	)
}
