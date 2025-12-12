'use client'

import { HttpLink } from '@apollo/client'
import {
	ApolloClient,
	ApolloNextAppProvider,
	InMemoryCache,
} from '@apollo/client-integration-nextjs'

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

	return new ApolloClient({
		cache: new InMemoryCache({
			typePolicies: {
				Query: {
					fields: {},
				},
			},
		}),
		link: httpLink,
	})
}

export function ApolloWrapper({ children }: ApolloWrapperProps) {
	return (
		<ApolloNextAppProvider makeClient={makeClient}>
			{children}
		</ApolloNextAppProvider>
	)
}
