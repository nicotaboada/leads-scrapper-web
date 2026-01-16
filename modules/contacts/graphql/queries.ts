import { gql } from '@apollo/client'

/**
 * GraphQL query to get contacts with pagination and search
 * Uses union types to handle both PersonContact and CompanyContact
 */
export const GET_CONTACTS = gql`
	query GetContacts($page: Int, $limit: Int, $filter: ContactsFilterInput) {
		contacts(page: $page, limit: $limit, filter: $filter) {
			data {
				... on PersonContact {
					id
					type
					firstName
					lastName
					email
					celular
					jobTitle
					linkedinUrl
					leadStatus
					contactedChannels
					createdAt
					updatedAt
					company {
						id
						companyName
					}
					tags {
						id
						name
						color
					}
					followUp {
						id
						dueDate
						note
					}
				}
				... on CompanyContact {
					id
					type
					companyName
					businessType
					companyEmails
					whatsapp
					website
					instagram
					city
					linkedinUrl
					leadStatus
					contactedChannels
					createdAt
					updatedAt
					tags {
						id
						name
						color
					}
					followUp {
						id
						dueDate
						note
					}
				}
			}
			meta {
				total
				page
				limit
				totalPages
				hasNextPage
				hasPreviousPage
			}
		}
	}
`

/**
 * GraphQL query to get a single contact by ID
 * Returns full details including linkedinUrl
 */
export const GET_CONTACT = gql`
	query GetContact($id: String!) {
		contact(id: $id) {
			... on PersonContact {
				id
				type
				firstName
				lastName
				jobTitle
				celular
				email
				linkedinUrl
				leadStatus
				contactedChannels
				createdAt
				updatedAt
				company {
					id
					companyName
				}
				tags {
					id
					name
					color
				}
				followUp {
					id
					contactId
					dueDate
					note
					createdAt
					updatedAt
				}
			}
			... on CompanyContact {
				id
				type
				companyName
				businessType
				companyEmails
				whatsapp
				website
				instagram
				city
				countryCode
				linkedinUrl
				leadStatus
				contactedChannels
				createdAt
				updatedAt
				tags {
					id
					name
					color
				}
				followUp {
					id
					contactId
					dueDate
					note
					createdAt
					updatedAt
				}
				websiteAnalysis {
					id
					websiteUrl
					websiteScore
					seoScore
					overallScore
					primaryIssues
					analyzedAt
				}
			}
		}
	}
`

/**
 * GraphQL query to get employees (Person contacts) of a company
 * Returns paginated list of employees
 */
export const GET_COMPANY_EMPLOYEES = gql`
	query GetCompanyEmployees($filter: CompanyEmployeesFilterInput!) {
		companyEmployees(filter: $filter) {
			data {
				id
				type
				firstName
				lastName
				jobTitle
				celular
				email
				linkedinUrl
				createdAt
				updatedAt
			}
			meta {
				total
				page
				limit
				totalPages
				hasNextPage
				hasPreviousPage
			}
		}
	}
`

/**
 * GraphQL query to get available cities
 * Returns unique non-null cities from contacts sorted alphabetically
 */
export const GET_AVAILABLE_CITIES = gql`
	query GetAvailableCities {
		availableCities
	}
`
