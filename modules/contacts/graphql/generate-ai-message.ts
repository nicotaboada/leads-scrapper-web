import { gql } from '@apollo/client'

/**
 * Mutation to generate an AI-powered outreach message
 */
export const GENERATE_AI_MESSAGE = gql`
	mutation GenerateAIMessage($input: GenerateMessageInput!) {
		generateAIMessage(input: $input) {
			content
			channel
			tone
			generatedAt
		}
	}
`

