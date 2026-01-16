import { gql } from '@apollo/client'

/**
 * Mutation to create a new company
 */
export const CREATE_COMPANY = gql`
	mutation CreateCompany($input: CreateCompanyInput!) {
		createCompany(input: $input) {
			id
			companyName
		}
	}
`

/**
 * Mutation to create a new person contact
 */
export const CREATE_PERSON_CONTACT = gql`
	mutation CreatePersonContact($input: CreatePersonContactInput!) {
		createPersonContact(input: $input) {
			id
			firstName
			lastName
		}
	}
`

/**
 * Mutation to update a person contact
 */
export const UPDATE_PERSON_CONTACT = gql`
	mutation UpdatePersonContact(
		$id: String!
		$input: UpdatePersonContactInput!
	) {
		updatePersonContact(id: $id, input: $input) {
			id
			firstName
			lastName
			email
			celular
			jobTitle
			linkedinUrl
			leadStatus
			contactedChannels
			company {
				id
				companyName
			}
			tags {
				id
				name
				color
			}
		}
	}
`

/**
 * Mutation to update a company
 */
export const UPDATE_COMPANY = gql`
	mutation UpdateCompany($id: String!, $input: UpdateCompanyInput!) {
		updateCompany(id: $id, input: $input) {
			id
			companyName
			businessType
			companyEmails
			whatsapp
			website
			instagram
			linkedinUrl
			leadStatus
			contactedChannels
			tags {
				id
				name
				color
			}
		}
	}
`

/**
 * Mutation to delete a contact
 */
export const DELETE_CONTACT = gql`
	mutation DeleteContact($id: String!) {
		deleteContact(id: $id)
	}
`

/**
 * Mutation to update contact lead status
 */
export const UPDATE_CONTACT_LEAD_STATUS = gql`
	mutation UpdateContactLeadStatus($id: String!, $leadStatus: LeadStatus!) {
		updateContactLeadStatus(id: $id, leadStatus: $leadStatus) {
			... on PersonContact {
				id
				leadStatus
			}
			... on CompanyContact {
				id
				leadStatus
			}
		}
	}
`

/**
 * Mutation to toggle contact channel (add or remove)
 */
export const TOGGLE_CONTACT_CHANNEL = gql`
	mutation ToggleContactChannel($id: String!, $channel: ContactChannel!) {
		toggleContactChannel(id: $id, channel: $channel) {
			... on PersonContact {
				id
				contactedChannels
			}
			... on CompanyContact {
				id
				contactedChannels
			}
		}
	}
`

/**
 * Mutation to update contact tags
 */
export const UPDATE_CONTACT_TAGS = gql`
	mutation UpdateContactTags($input: UpdateContactTagsInput!) {
		updateContactTags(input: $input) {
			... on PersonContact {
				id
				tags {
					id
					name
					color
				}
			}
			... on CompanyContact {
				id
				tags {
					id
					name
					color
				}
			}
		}
	}
`
