import { HttpLink, split } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import {
	ApolloClient,
	InMemoryCache,
	registerApolloClient,
} from '@apollo/client-integration-nextjs'
import { createClient } from 'graphql-ws'

const httpLink = new HttpLink({
	uri:
		process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:3000/graphql',
	fetchOptions: {
		cache: 'no-store',
	},
})

// WebSocket link for subscriptions (only on client side)
const wsLink =
	typeof window !== 'undefined'
		? new GraphQLWsLink(
				createClient({
					url:
						process.env.NEXT_PUBLIC_GRAPHQL_WS_ENDPOINT ||
						'ws://localhost:3000/graphql',
				})
			)
		: null

// Split link: use ws for subscriptions, http for queries/mutations
const splitLink =
	typeof window !== 'undefined' && wsLink
		? split(
				({ query }) => {
					const definition = getMainDefinition(query)
					return (
						definition.kind === 'OperationDefinition' &&
						definition.operation === 'subscription'
					)
				},
				wsLink,
				httpLink
			)
		: httpLink

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
	return new ApolloClient({
		cache: new InMemoryCache(),
		link: splitLink,
	})
})
