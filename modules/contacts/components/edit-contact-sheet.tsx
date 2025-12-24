'use client'

/**
 * Edit Contact Sheet Component
 *
 * A Sheet component to edit an existing person contact.
 * Pre-fills fields with current contact data.
 */

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
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
import { Separator } from 'components/ui/separator'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from 'components/ui/sheet'
import { TagMultiselect } from 'modules/tags/components/tag-multiselect'
import { useUpdatePersonContact } from '../hooks/use-update-person-contact'
import type { PersonContact } from '../types'
import {
	type EditPersonContactFormInput,
	editPersonContactSchema,
} from '../types/edit-contact'
import { CompanySearchSelect } from './company-search-select'

interface EditContactSheetProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	contact: PersonContact
	onContactUpdated?: () => void
}

export function EditContactSheet({
	open,
	onOpenChange,
	contact,
	onContactUpdated,
}: EditContactSheetProps) {
	const { updatePersonContact, loading } = useUpdatePersonContact()

	const form = useForm<EditPersonContactFormInput>({
		resolver: zodResolver(editPersonContactSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			linkedinUrl: '',
			jobTitle: '',
			companyId: null,
			companyName: '',
			tagIds: [],
		},
		mode: 'onBlur',
		reValidateMode: 'onChange',
	})

	// Update form when contact changes
	useEffect(() => {
		if (contact && open) {
			form.reset({
				firstName: contact.firstName,
				lastName: contact.lastName,
				email: contact.email ?? '',
				phone: contact.celular ?? '',
				linkedinUrl: contact.linkedinUrl ?? '',
				jobTitle: contact.jobTitle ?? '',
				companyId: contact.company?.id ?? null,
				companyName: contact.company?.companyName ?? '',
				tagIds: contact.tags?.map((tag) => tag.id) ?? [],
			})
		}
	}, [contact, open, form])

	async function handleSubmit(data: EditPersonContactFormInput) {
		try {
			const result = await updatePersonContact(contact.id, {
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email || undefined,
				celular: data.phone || undefined,
				linkedinUrl: data.linkedinUrl || undefined,
				jobTitle: data.jobTitle || undefined,
				companyId: data.companyId,
				tagIds: data.tagIds,
			})

			if (result) {
				toast.success('Contacto actualizado exitosamente')
				onContactUpdated?.()
				handleOpenChange(false)
			} else {
				toast.error('Error al actualizar el contacto')
			}
		} catch (error) {
			toast.error('Error al actualizar el contacto')
			console.error('Error updating contact:', error)
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
		form.setValue('companyName', companyName)
	}

	function handleClearCompany() {
		form.setValue('companyId', null)
		form.setValue('companyName', '')
	}

	return (
		<Sheet open={open} onOpenChange={handleOpenChange}>
			<SheetContent
				className="flex h-full flex-col sm:max-w-md"
				onOpenAutoFocus={(e) => e.preventDefault()}
			>
				<SheetHeader className="shrink-0">
					<SheetTitle>Editar Contacto</SheetTitle>
					<SheetDescription>
						Modifique los datos del contacto
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
												disabled={loading}
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
												disabled={loading}
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
												placeholder="+54 9 11 1234-5678"
												{...field}
												disabled={loading}
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
									value={form.watch('companyId') ?? undefined}
									selectedCompanyName={form.watch('companyName')}
									isCreatingNew={false}
									newCompanyName=""
									onSelectCompany={handleSelectCompany}
									onCreateNew={() => {}} // No permitir crear empresa al editar
									onClear={handleClearCompany}
									disabled={loading}
									hideCreateOption
								/>
							</FormItem>

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
												disabled={loading}
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
												disabled={loading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Separator />

							{/* Tags Section */}
							<FormField
								control={form.control}
								name="tagIds"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tags</FormLabel>
										<FormControl>
											<TagMultiselect
												selectedTagIds={field.value}
												onChange={field.onChange}
												placeholder="Seleccionar tags..."
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
								disabled={loading || !form.formState.isValid}
								className="flex-[0.5] cursor-pointer"
							>
								{loading ? 'Guardando...' : 'Guardar cambios'}
							</Button>
						</SheetFooter>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	)
}

