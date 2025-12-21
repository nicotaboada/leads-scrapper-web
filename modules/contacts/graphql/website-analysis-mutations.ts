import { gql } from '@apollo/client'

/**
 * Mutation to trigger website analysis for a contact
 * Analyzes website quality and SEO metrics
 */
export const ANALYZE_CONTACT_WEBSITE = gql`
	mutation AnalyzeContactWebsite($contactId: String!) {
		analyzeContactWebsite(contactId: $contactId) {
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

