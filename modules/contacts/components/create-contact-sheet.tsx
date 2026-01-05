'use client'

/**
 * Create Contact Sheet Component
 *
 * A Sheet component that displays a form to create a new person contact.
 * Supports selecting an existing company or creating a new one inline.
 */

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from 'components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from 'components/ui/form'
import { Input } from 'components/ui/input'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from 'components/ui/sheet'
import { CompanySearchSelect } from './company-search-select'
import { useCreateCompany } from '../hooks/use-create-company'
import { useCreateContact } from '../hooks/use-create-contact'
import {
	type CreateContactFormInput,
	createContactSchema,
} from '../types/create-contact'

interface CreateContactSheetProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	onContactCreated?: () => void
}

export function CreateContactSheet({
	open,
	onOpenChange,
	onContactCreated,
}: CreateContactSheetProps) {
	const { createCompany, loading: companyLoading } = useCreateCompany()
	const { createContact, loading: contactLoading } = useCreateContact()

	const isSubmitting = companyLoading || contactLoading

	const form = useForm<CreateContactFormInput>({
		resolver: zodResolver(createContactSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			linkedinUrl: '',
			jobTitle: '',
			companyId: undefined,
			isCreatingNewCompany: false,
			newCompanyName: '',
			newCompanyEmail: '',
			newCompanyPhone: '',
		},
		mode: 'onBlur',
		reValidateMode: 'onChange',
	})

	const isCreatingNewCompany = form.watch('isCreatingNewCompany')
	const selectedCompanyName = form.watch('newCompanyName') // Used for display when creating new

	async function handleSubmit(data: CreateContactFormInput) {
		try {
			let companyId = data.companyId

			// If creating new company, create it first
			if (data.isCreatingNewCompany && data.newCompanyName) {
				const newCompanyId = await createCompany({
					companyName: data.newCompanyName,
					companyEmail: data.newCompanyEmail || undefined,
					companyPhone: data.newCompanyPhone || undefined,
				})

				if (!newCompanyId) {
					toast.error('Error al crear la empresa')
					return
				}

				companyId = newCompanyId
			}

			// Create the person contact
			const contactId = await createContact({
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email || undefined,
				celular: data.phone || undefined,
				linkedinUrl: data.linkedinUrl || undefined,
				jobTitle: data.jobTitle || undefined,
				companyId: companyId || undefined,
			})

			if (contactId) {
				toast.success('Contacto creado exitosamente')
				onContactCreated?.()
				handleOpenChange(false)
			}
		} catch (error) {
			toast.error('Error al crear el contacto')
			console.error('Error creating contact:', error)
		}
	}

	function handleOpenChange(open: boolean) {
		if (!open) {
			form.reset()
			form.clearErrors()
		}
		onOpenChange(open)
	}

	function handleSelectCompany(companyId: string, companyName: string) {
		form.setValue('companyId', companyId)
		form.setValue('isCreatingNewCompany', false)
		form.setValue('newCompanyName', companyName) // Store for display
	}

	function handleCreateNewCompany(companyName: string) {
		form.setValue('companyId', undefined)
		form.setValue('isCreatingNewCompany', true)
		form.setValue('newCompanyName', companyName)
	}

	function handleClearCompany() {
		form.setValue('companyId', undefined)
		form.setValue('isCreatingNewCompany', false)
		form.setValue('newCompanyName', '')
		form.setValue('newCompanyEmail', '')
		form.setValue('newCompanyPhone', '')
	}

	return (
		<Sheet open={open} onOpenChange={handleOpenChange}>
			<SheetContent
				className="flex h-full flex-col sm:max-w-md"
				onOpenAutoFocus={(e) => e.preventDefault()}
			>
				<SheetHeader className="shrink-0">
					<SheetTitle>Crear Contacto</SheetTitle>
					<SheetDescription>
						Ingrese los datos del nuevo contacto
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
								name="firstName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nombre *</FormLabel>
										<FormControl>
											<Input
												placeholder="Ingrese el nombre"
												{...field}
												disabled={isSubmitting}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Apellido */}
							<FormField
								control={form.control}
								name="lastName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Apellido *</FormLabel>
										<FormControl>
											<Input
												placeholder="Ingrese el apellido"
												{...field}
												disabled={isSubmitting}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Email */}
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												type="email"
												placeholder="contacto@ejemplo.com"
												{...field}
												disabled={isSubmitting}
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
												placeholder="+54 9 11 1234-5678"
												{...field}
												disabled={isSubmitting}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Empresa */}
							<FormItem>
								<FormLabel>Empresa</FormLabel>
								<CompanySearchSelect
									value={form.watch('companyId')}
									selectedCompanyName={selectedCompanyName}
									isCreatingNew={isCreatingNewCompany ?? false}
									newCompanyName={form.watch('newCompanyName')}
									onSelectCompany={handleSelectCompany}
									onCreateNew={handleCreateNewCompany}
									onClear={handleClearCompany}
									disabled={isSubmitting}
								/>
							</FormItem>

							{/* New Company Fields */}
							{isCreatingNewCompany && (
								<div className="space-y-4 rounded-lg border border-blue-200 bg-blue-50/50 p-4">
									<p className="text-sm font-medium text-blue-800">
										Nueva empresa
									</p>

									<FormField
										control={form.control}
										name="newCompanyEmail"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email de empresa</FormLabel>
												<FormControl>
													<Input
														type="email"
														placeholder="info@empresa.com"
														{...field}
														disabled={isSubmitting}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="newCompanyPhone"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Teléfono de empresa</FormLabel>
												<FormControl>
													<Input
														placeholder="+54 11 4567-8900"
														{...field}
														disabled={isSubmitting}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							)}

							{/* LinkedIn */}
							<FormField
								control={form.control}
								name="linkedinUrl"
								render={({ field }) => (
									<FormItem>
										<FormLabel>LinkedIn</FormLabel>
										<FormControl>
											<Input
												placeholder="https://linkedin.com/in/..."
												{...field}
												disabled={isSubmitting}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Job Title */}
							<FormField
								control={form.control}
								name="jobTitle"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Cargo</FormLabel>
										<FormControl>
											<Input
												placeholder="Ej: Gerente de Ventas"
												{...field}
												disabled={isSubmitting}
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
								disabled={isSubmitting}
								className="flex-[0.2] cursor-pointer"
							>
								Cancelar
							</Button>
							<Button
								type="submit"
								disabled={isSubmitting || !form.formState.isValid}
								className="flex-[0.5] cursor-pointer"
							>
								{isSubmitting ? 'Guardando...' : 'Guardar'}
							</Button>
						</SheetFooter>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	)
}
