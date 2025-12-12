import { Metadata } from 'next'
import Link from 'next/link'
import { ROUTES } from '@/lib/config/routes'
import { Button } from 'components/ui/button'

export const metadata: Metadata = {
	title: 'Next.js Enterprise Boilerplate',
	twitter: {
		card: 'summary_large_image',
	},
	openGraph: {
		url: 'https://next-enterprise.vercel.app/',
		images: [
			{
				width: 1200,
				height: 630,
				url: 'https://raw.githubusercontent.com/Blazity/next-enterprise/main/.github/assets/project-logo.png',
			},
		],
	},
}

export default function Web() {
	return (
		<>
			<section className="bg-white dark:bg-gray-900">
				<div className="mx-auto grid max-w-(--breakpoint-xl) px-4 py-8 text-center lg:py-16">
					<div className="mx-auto place-self-center">
						<h1 className="mb-4 max-w-2xl text-4xl leading-none font-extrabold tracking-tight md:text-5xl xl:text-6xl dark:text-white">
							Next.js Enterprise Boilerplate
						</h1>
						<p className="mb-6 max-w-2xl font-light text-gray-500 md:text-lg lg:mb-8 lg:text-xl dark:text-gray-400">
							Jumpstart your enterprise project with our feature-packed,
							high-performance Next.js boilerplate! Experience rapid UI
							development, AI-powered code reviews, and an extensive suite of
							tools for a smooth and enjoyable development process.
						</p>
						<Button asChild className="mr-3">
							<Link href={ROUTES.LOGIN}>Login</Link>
						</Button>
					</div>
				</div>
			</section>
			<section className="bg-white dark:bg-gray-900">
				<div className="mx-auto max-w-(--breakpoint-xl) px-4 py-8 sm:py-16 lg:px-6">
					<div className="justify-center space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-3"></div>
				</div>
			</section>
		</>
	)
}
