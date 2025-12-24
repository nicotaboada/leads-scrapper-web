'use client'

/**
 * Create Run Sheet Component
 *
 * A Sheet component that displays a form to create a new scraping run.
 * Includes validation using Zod and React Hook Form.
 * Supports different actor types with dynamic configuration inputs.
 */

import { zodResolver } from '@hookform/resolvers/zod'
import { HelpCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ChipInput } from '@/components/ui/chip-input'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { useCreateRun } from '../hooks/use-create-run'
import {
	ACTOR_TYPE_LABELS,
	type CreateRunFormInput,
	createRunSchema,
} from '../types/create-run'
import type { CreateRunInput } from '../types/run'

interface CreateRunSheetProps {
	/**
	 * Controls the Sheet visibility
	 */
	open: boolean
	/**
	 * Callback when Sheet visibility changes
	 */
	onOpenChange: (open: boolean) => void
	/**
	 * Optional callback when a run is successfully created
	 * Receives the created run data
	 */
	onRunCreated?: (data: CreateRunFormInput) => void
}

/**
 * CreateRunSheet component
 *
 * Displays a form to create a new scraping run with actor-specific configuration
 *
 * @param open - Controls the Sheet visibility
 * @param onOpenChange - Callback when Sheet visibility changes
 * @param onRunCreated - Optional callback when a run is successfully created
 */
export function CreateRunSheet({
	open,
	onOpenChange,
	onRunCreated,
}: CreateRunSheetProps) {
	const { createRun, loading: isSubmitting } = useCreateRun()

	const form = useForm<CreateRunFormInput>({
		resolver: zodResolver(createRunSchema),
		defaultValues: {
			runName: '',
			actorType: 'google-maps',
			searchTerms: [],
			location: '',
			numberOfPlaces: undefined,
			scrapeContacts: false,
		},
		mode: 'onBlur',
		reValidateMode: 'onChange',
	})

	// Watch actor type to show/hide configuration sections
	const selectedActorType = form.watch('actorType')

	/**
	 * Handles form submission
	 * Calls the GraphQL mutation to create the run
	 */
	async function handleSubmit(data: CreateRunFormInput) {
		try {
			// Transform form data to GraphQL input
			const input: CreateRunInput = {
				name: data.runName,
				actorType: 'GOOGLE_MAPS', // Map frontend type to backend enum
				input: {
					searchTerms: data.searchTerms,
					location: data.location,
					...(data.numberOfPlaces && { numberOfPlaces: data.numberOfPlaces }),
					scrapeContacts: data.scrapeContacts ?? false,
				},
			}

			// Call the GraphQL mutation
			const createdRun = await createRun(input)

			if (createdRun) {
				// Show success toast
				toast.success('Run created successfully', {
					description: `${createdRun.name} is ready to be started`,
				})

				// Call callback if provided
				if (onRunCreated) {
					onRunCreated(data)
				}

				// Close sheet (form will be reset by handleSheetOpenChange)
				handleSheetOpenChange(false)
			}
		} catch (error) {
			// Show error toast
			toast.error('Error creating run', {
				description:
					error instanceof Error ? error.message : 'Please try again',
			})
			console.error('Error creating run:', error)
		}
	}

	/**
	 * Handles cancel action
	 * Closes the sheet (form will be reset by handleSheetOpenChange)
	 */
	function handleCancel() {
		handleSheetOpenChange(false)
	}

	/**
	 * Handles Sheet open/close state changes
	 * Resets form when Sheet is closed
	 */
	function handleSheetOpenChange(open: boolean) {
		if (!open) {
			// Reset form and clear errors when Sheet closes
			form.reset()
			form.clearErrors()
		}
		onOpenChange(open)
	}

	return (
		<Sheet open={open} onOpenChange={handleSheetOpenChange}>
			<SheetContent
				className="flex h-full flex-col sm:max-w-lg"
				onOpenAutoFocus={(e) => e.preventDefault()}
			>
				<SheetHeader className="shrink-0">
					<SheetTitle>Create New Run</SheetTitle>
					<SheetDescription>
						Configure and create a new scraping run
					</SheetDescription>
				</SheetHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="flex min-h-0 flex-1 flex-col"
					>
						<div className="flex-1 space-y-6 overflow-y-auto px-4 py-4">
							{/* Run Name Field */}
							<FormField
								control={form.control}
								name="runName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Run Name</FormLabel>
										<FormControl>
											<Input
												placeholder="e.g., Coffee Shops in Manhattan"
												{...field}
												disabled={isSubmitting}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Actor Type Field */}
							<FormField
								control={form.control}
								name="actorType"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Actor Type</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
											disabled={isSubmitting}
										>
											<FormControl>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Select an actor type" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{Object.entries(ACTOR_TYPE_LABELS).map(
													([value, label]) => (
														<SelectItem key={value} value={value}>
															{label}
														</SelectItem>
													)
												)}
											</SelectContent>
										</Select>
										<FormDescription>
											Choose the type of scraper to use
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Google Maps Configuration */}
							{selectedActorType === 'google-maps' && (
								<div className="space-y-6 rounded-lg border border-gray-200 bg-gray-50/50 p-4">
									<h3 className="text-sm font-semibold">
										Google Maps Configuration
									</h3>

									{/* Search Terms Field */}
									<FormField
										control={form.control}
										name="searchTerms"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<ChipInput
														value={field.value}
														onChange={field.onChange}
														placeholder="e.g., coffee shop"
														disabled={isSubmitting}
														label="Search Terms"
														helperText="Press Enter or click Add to create a search term"
														error={!!form.formState.errors.searchTerms}
														errorMessage={
															form.formState.errors.searchTerms?.message
														}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									{/* Location Field */}
									<FormField
										control={form.control}
										name="location"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Location</FormLabel>
												<FormControl>
													<Input
														placeholder="e.g., New York, NY"
														{...field}
														disabled={isSubmitting}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									{/* Number of Places Field */}
									<FormField
										control={form.control}
										name="numberOfPlaces"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Number of Places (optional)</FormLabel>
												<FormControl>
													<Input
														type="number"
														placeholder="e.g., 50"
														{...field}
														value={field.value || ''}
														onChange={(e) => {
															const value = e.target.value
															field.onChange(
																value === '' ? undefined : Number(value)
															)
														}}
														disabled={isSubmitting}
														min={1}
													/>
												</FormControl>
												<FormDescription>
													Leave empty to use system default
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>

									{/* Company Contacts Enrichment Checkbox */}
									<FormField
										control={form.control}
										name="scrapeContacts"
										render={({ field }) => (
											<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
												<FormControl>
													<Checkbox
														checked={field.value}
														onCheckedChange={field.onChange}
														disabled={isSubmitting}
													/>
												</FormControl>
												<div className="space-y-1 leading-none">
													<FormLabel className="flex items-center gap-1.5">
														Company Contacts Enrichment
														<Tooltip>
															<TooltipTrigger asChild>
																<HelpCircle className="h-4 w-4 cursor-help text-muted-foreground" />
															</TooltipTrigger>
															<TooltipContent
																side="right"
																className="max-w-xs"
															>
																<p>
																	Enrich Google Maps places with contact details
																	extracted from business websites, including
																	business emails and social media profiles
																	(Meta, LinkedIn, X, etc).
																</p>
																<p className="mt-2 font-semibold">
																	Pricing: $2.00 per 1,000 places ($0.002/place)
																</p>
															</TooltipContent>
														</Tooltip>
													</FormLabel>
													<FormDescription>
														Extract emails and social profiles from websites
													</FormDescription>
												</div>
											</FormItem>
										)}
									/>
								</div>
							)}
						</div>

						<SheetFooter className="mt-4 shrink-0 flex-row gap-2 border-t pt-4">
							<div className="flex-[0.5]" />
							<Button
								type="button"
								variant="outline"
								onClick={handleCancel}
								disabled={isSubmitting}
								className="flex-[0.2] cursor-pointer"
							>
								Cancel
							</Button>
							<Button
								type="submit"
								disabled={isSubmitting || !form.formState.isValid}
								className="flex-[0.5] cursor-pointer"
							>
								{isSubmitting ? 'Creating...' : 'Create Run'}
							</Button>
						</SheetFooter>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	)
}
