'use client'

/**
 * Create Student Sheet Component
 *
 * A Sheet component that displays a form to create a new student.
 * Includes validation using Zod and React Hook Form.
 */

import { useMutation } from '@apollo/client/react'
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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from 'components/ui/select'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from 'components/ui/sheet'
import { CREATE_STUDENT } from '../graphql/mutations'
import {
	type CreateStudentFormInput,
	type CreateStudentInput,
	createStudentSchema,
	MOCK_COURSES,
} from '../types/student'

interface CreateStudentSheetProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	onStudentCreated?: () => void
}

/**
 * CreateStudentSheet component
 *
 * @param open - Controls the Sheet visibility
 * @param onOpenChange - Callback when Sheet visibility changes
 * @param onStudentCreated - Optional callback when a student is successfully created
 */
export function CreateStudentSheet({
	open,
	onOpenChange,
	onStudentCreated,
}: CreateStudentSheetProps) {
	const [createStudent, { loading }] = useMutation(CREATE_STUDENT)

	const form = useForm<CreateStudentFormInput>({
		resolver: zodResolver(createStudentSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			course: '',
		},
		mode: 'onBlur',
		reValidateMode: 'onChange',
	})

	/**
	 * Handles form submission
	 * Transforms form data to backend format and calls GraphQL mutation
	 */
	async function handleSubmit(data: CreateStudentFormInput) {
		try {
			// Transform form data to backend format (remove course field)
			const input: CreateStudentInput = {
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				// phoneNumber is optional and not in the form yet
			}

			// Call GraphQL mutation
			await createStudent({
				variables: { input },
			})

			// Show success toast
			toast.success('Estudiante creado exitosamente')

			// Call refetch callback if provided
			if (onStudentCreated) {
				onStudentCreated()
			}

			// Close sheet (form will be reset by handleOpenChange)
			handleOpenChange(false)
		} catch (error) {
			// Show error toast
			toast.error('Error al crear el estudiante. Intente nuevamente')
			console.error('Error creating student:', error)
		}
	}

	/**
	 * Handles cancel action
	 * Closes the sheet (form will be reset by handleOpenChange)
	 */
	function handleCancel() {
		handleOpenChange(false)
	}

	/**
	 * Handles Sheet open/close state changes
	 * Resets form when Sheet is closed
	 */
	function handleOpenChange(open: boolean) {
		if (!open) {
			// Reset form and clear errors when Sheet closes
			form.reset()
			form.clearErrors()
		}
		onOpenChange(open)
	}

	return (
		<Sheet open={open} onOpenChange={handleOpenChange}>
			<SheetContent
				className="flex flex-col sm:max-w-sm"
				onOpenAutoFocus={(e) => e.preventDefault()}
			>
				<SheetHeader>
					<SheetTitle>Crear Estudiante</SheetTitle>
					<SheetDescription>
						Ingrese los datos del nuevo estudiante
					</SheetDescription>
				</SheetHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="flex flex-1 flex-col gap-4"
					>
						<div className="flex-1 space-y-6 overflow-y-auto px-4">
							{/* First Name Field */}
							<FormField
								control={form.control}
								name="firstName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nombre</FormLabel>
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

							{/* Last Name Field */}
							<FormField
								control={form.control}
								name="lastName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Apellido</FormLabel>
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

							{/* Email Field */}
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												type="email"
												placeholder="estudiante@ejemplo.com"
												{...field}
												disabled={loading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Course Field */}
							<FormField
								control={form.control}
								name="course"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Curso (opcional)</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
											disabled={loading}
										>
											<FormControl>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Seleccione un curso" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{MOCK_COURSES.map((course) => (
													<SelectItem key={course.id} value={course.id}>
														{course.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<SheetFooter className="flex flex-row gap-2">
							<div className="flex-[0.5]" />
							<Button
								type="button"
								variant="outline"
								onClick={handleCancel}
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
								{loading ? 'Guardando...' : 'Guardar'}
							</Button>
						</SheetFooter>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	)
}
