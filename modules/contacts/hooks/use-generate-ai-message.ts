import { useMutation } from '@apollo/client/react'
import { useCallback } from 'react'
import { toast } from 'sonner'
import { GENERATE_AI_MESSAGE } from '../graphql/generate-ai-message'
import type {
	GenerateAIMessageInput,
	GenerateAIMessageResponse,
	GeneratedMessage,
} from '../types/ai-message'

interface UseGenerateAIMessageOptions {
	onSuccess?: (message: GeneratedMessage) => void
	onError?: (error: Error) => void
}

interface UseGenerateAIMessageReturn {
	generateMessage: (input: GenerateAIMessageInput) => Promise<GeneratedMessage | null>
	isGenerating: boolean
}

/**
 * Hook for generating AI-powered outreach messages
 */
export function useGenerateAIMessage(
	options?: UseGenerateAIMessageOptions
): UseGenerateAIMessageReturn {
	const [mutate, { loading }] = useMutation<GenerateAIMessageResponse>(GENERATE_AI_MESSAGE)

	const generateMessage = useCallback(
		async (input: GenerateAIMessageInput): Promise<GeneratedMessage | null> => {
			try {
				const result = await mutate({
					variables: { input },
				})
				if (result.data?.generateAIMessage) {
					options?.onSuccess?.(result.data.generateAIMessage)
					return result.data.generateAIMessage
				}
				return null
			} catch (error) {
				const errorMessage =
					error instanceof Error ? error.message : 'Error al generar el mensaje'
				toast.error(errorMessage)
				options?.onError?.(error instanceof Error ? error : new Error(errorMessage))
				return null
			}
		},
		[mutate, options]
	)

	return {
		generateMessage,
		isGenerating: loading,
	}
}

