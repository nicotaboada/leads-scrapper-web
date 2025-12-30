'use client'

import { useState } from 'react'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from 'components/ui/sheet'
import { toast } from 'sonner'
import { ServiceSelector } from './service-selector'
import { KeyForm } from './key-form'
import { useCreateApiKey } from '../hooks/use-create-api-key'
import type { ApiKeyService } from '../types'

interface AddKeySheetProps {
	isOpen: boolean
	onClose: () => void
	getKeyCount: (service: ApiKeyService) => number
}

type Step = 'select-service' | 'enter-key'

/**
 * Sheet/modal for adding a new API key with 2-step flow
 */
export function AddKeySheet({ isOpen, onClose, getKeyCount }: AddKeySheetProps) {
	const [step, setStep] = useState<Step>('select-service')
	const [selectedService, setSelectedService] = useState<ApiKeyService | null>(
		null
	)
	const [error, setError] = useState<string | null>(null)

	const { createApiKey, loading } = useCreateApiKey()

	function handleServiceSelect(service: ApiKeyService) {
		setSelectedService(service)
		setStep('enter-key')
		setError(null)
	}

	function handleBack() {
		setStep('select-service')
		setSelectedService(null)
		setError(null)
	}

	async function handleSubmit(key: string, label?: string) {
		if (!selectedService) return

		setError(null)
		try {
			await createApiKey({
				service: selectedService,
				key,
				label,
			})
			toast.success('API key added successfully')
			handleClose()
		} catch (err) {
			const message =
				err instanceof Error ? err.message : 'Failed to add API key'
			setError(message)
		}
	}

	function handleClose() {
		setStep('select-service')
		setSelectedService(null)
		setError(null)
		onClose()
	}

	return (
		<Sheet open={isOpen} onOpenChange={(open) => !open && handleClose()}>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Add API Key</SheetTitle>
				</SheetHeader>

				<div className="mt-6">
					{step === 'select-service' && (
						<ServiceSelector
							onSelect={handleServiceSelect}
							getKeyCount={getKeyCount}
						/>
					)}

					{step === 'enter-key' && selectedService && (
						<KeyForm
							selectedService={selectedService}
							onBack={handleBack}
							onSubmit={handleSubmit}
							isLoading={loading}
							error={error}
						/>
					)}
				</div>
			</SheetContent>
		</Sheet>
	)
}

