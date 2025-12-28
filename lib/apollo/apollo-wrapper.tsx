'use client'

import { ApolloLink, HttpLink, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import {
	ApolloClient,
	ApolloNextAppProvider,
	InMemoryCache,
} from '@apollo/client-integration-nextjs'
import { createClient as createWsClient } from 'graphql-ws'
import { createClient } from 'lib/supabase/client'

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

	// Auth link to add user headers
	const authLink = setContext(async (_, prevContext) => {
		const ctx = prevContext as { headers?: Record<string, string> }
		const headers = ctx.headers ?? {}
		try {
			const supabase = createClient()
			const {
				data: { user },
			} = await supabase.auth.getUser()

			if (user) {
				return {
					headers: {
						...headers,
						'x-user-id': user.id,
						'x-user-email': user.email ?? '',
						'x-user-name':
							user.user_metadata?.full_name ??
							user.user_metadata?.name ??
							user.email ??
							'Usuario',
					},
				}
			}
		} catch {
			// Silently fail if auth is not available
		}

		return { headers }
	})

	// Combine auth link with http link
	const httpLinkWithAuth = authLink.concat(httpLink)

	// WebSocket link for subscriptions
	const wsLink =
		typeof window !== 'undefined'
			? new GraphQLWsLink(
					createWsClient({
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
					httpLinkWithAuth
				)
			: httpLinkWithAuth

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
