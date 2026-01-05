import { gql } from '@apollo/client'

/**
 * Query to get website analysis for a contact by contactId
 */
export const GET_WEBSITE_ANALYSIS = gql`
	query GetContactAnalysis($contactId: String!) {
		contactAnalysis(contactId: $contactId) {
			id
			contactId
			websiteUrl
			websiteScore
			seoScore
			overallScore
			professionalismLevel
			professionalismScore
			freshnessLevel
			freshnessScore
			loadTimeMs
			loadTimeScore
			loadTimeCategory
			clarityPassed
			commercialIntentPassed
			primaryIssues
			screenshotUrl
			lastError
			analyzedAt
			createdAt
			updatedAt
		}
	}
`
