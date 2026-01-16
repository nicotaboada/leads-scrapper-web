'use client'

/**
 * Edit Company Sheet Component
 *
 * A Sheet component to edit an existing company contact.
 * Shows only company-specific fields.
 */

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from 'components/ui/button'
import { ChipInput } from 'components/ui/chip-input'
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
import { useAllTags } from 'modules/tags/hooks/use-all-tags'
import { useUpdateCompany } from '../hooks/use-update-company'
import type { CompanyContact } from '../types'
import {
	type EditCompanyFormInput,
	editCompanySchema,
} from '../types/edit-contact'

interface EditCompanySheetProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	company: CompanyContact
	onCompanyUpdated?: () => void
}

export function EditCompanySheet({
	open,
	onOpenChange,
	company,
	onCompanyUpdated,
}: EditCompanySheetProps) {
	const { updateCompany, loading } = useUpdateCompany()
	// Pre-fetch tags when sheet opens to avoid loading delay on input click
	const { tags: availableTags } = useAllTags({
		skip: !open,
	})

	const form = useForm<EditCompanyFormInput>({
		resolver: zodResolver(editCompanySchema),
		defaultValues: {
			companyName: '',
			businessType: '',
			companyEmails: [],
			whatsapp: '',
			website: '',
			instagram: '',
			linkedinUrl: '',
			tagIds: [],
		},
		mode: 'onBlur',
		reValidateMode: 'onChange',
	})

	// Update form when company changes
	useEffect(() => {
		if (company && open) {
			form.reset({
				companyName: company.companyName,
				businessType: company.businessType ?? '',
				companyEmails: company.companyEmails ?? [],
				whatsapp: company.whatsapp ?? '',
				website: company.website ?? '',
				instagram: company.instagram ?? '',
				linkedinUrl: company.linkedinUrl ?? '',
				tagIds: company.tags?.map((tag) => tag.id) ?? [],
			})
		}
	}, [company, open, form])

	async function handleSubmit(data: EditCompanyFormInput) {
		try {
			const result = await updateCompany(company.id, {
				companyName: data.companyName,
				businessType: data.businessType || undefined,
				companyEmails: data.companyEmails,
				whatsapp: data.whatsapp || undefined,
				website: data.website || undefined,
				instagram: data.instagram || undefined,
				linkedinUrl: data.linkedinUrl || undefined,
				tagIds: data.tagIds,
			})

			if (result) {
				toast.success('Empresa actualizada exitosamente')
				onCompanyUpdated?.()
				handleOpenChange(false)
			} else {
				toast.error('Error al actualizar la empresa')
			}
		} catch (error) {
			toast.error('Error al actualizar la empresa')
			console.error('Error updating company:', error)
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
					<SheetTitle>Editar Empresa</SheetTitle>
					<SheetDescription>Modifique los datos de la empresa</SheetDescription>
				</SheetHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="flex min-h-0 flex-1 flex-col"
					>
						<div className="flex-1 space-y-6 overflow-y-auto px-4 py-4">
							{/* Nombre de empresa */}
							<FormField
								control={form.control}
								name="companyName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nombre de empresa *</FormLabel>
										<FormControl>
											<Input
												placeholder="Ingrese el nombre de la empresa"
												{...field}
												disabled={loading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Tipo de negocio */}
							<FormField
								control={form.control}
								name="businessType"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tipo de negocio</FormLabel>
										<FormControl>
											<Input
												placeholder="Ej: Academia de inglés, Restaurante"
												{...field}
												disabled={loading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Emails de empresa */}
							<FormField
								control={form.control}
								name="companyEmails"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Emails</FormLabel>
										<FormControl>
											<ChipInput
												value={field.value}
												onChange={field.onChange}
												placeholder="Agregar email y presionar Enter"
												disabled={loading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* WhatsApp/Teléfono */}
							<FormField
								control={form.control}
								name="whatsapp"
								render={({ field }) => (
									<FormItem>
										<FormLabel>WhatsApp / Teléfono</FormLabel>
										<FormControl>
											<Input
												placeholder="+54 11 4567-8900"
												{...field}
												disabled={loading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Website */}
							<FormField
								control={form.control}
								name="website"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Sitio Web</FormLabel>
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

							{/* LinkedIn */}
							<FormField
								control={form.control}
								name="linkedinUrl"
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
												availableTags={availableTags}
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
