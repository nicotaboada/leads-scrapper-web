'use client'

import { ApolloLink, HttpLink, split } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import {
	ApolloClient,
	ApolloNextAppProvider,
	InMemoryCache,
} from '@apollo/client-integration-nextjs'
import { createClient } from 'graphql-ws'

interface ApolloWrapperProps {
	children: React.ReactNode
}

function makeClient() {
	const httpLink = new HttpLink({
		uri:
			process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
			'http://localhost:3000/graphql',
		fetchOptions: {
			cache: 'no-store',
		},
	})

	// WebSocket link for subscriptions
	const wsLink =
		typeof window !== 'undefined'
			? new GraphQLWsLink(
					createClient({
						url:
							process.env.NEXT_PUBLIC_GRAPHQL_WS_ENDPOINT ||
							'ws://localhost:3000/graphql',
						on: {
							connected: () => console.log('WebSocket connected'),
							closed: () => console.log('WebSocket closed'),
							error: (error) => console.error('WebSocket error:', error),
						},
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
					wsLink as unknown as ApolloLink,
					httpLink
				)
			: httpLink

	return new ApolloClient({
		cache: new InMemoryCache({
			typePolicies: {
				Query: {
					fields: {},
				},
			},
		}),
		link: splitLink,
	})
}

export function ApolloWrapper({ children }: ApolloWrapperProps) {
	return (
		<ApolloNextAppProvider makeClient={makeClient}>
			{children}
		</ApolloNextAppProvider>
	)
}
