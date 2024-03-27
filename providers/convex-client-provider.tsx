"use client"

import { ClerkProvider, useAuth } from "@clerk/nextjs"
import { Loading } from "@/components/auth/loading"
import {
	AuthLoading,
	Authenticated,
	ConvexReactClient,
	Unauthenticated,
} from "convex/react"
import { ConvexProviderWithClerk } from "convex/react-clerk"

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export default function ConvexClientProvider({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<ClerkProvider>
			<ConvexProviderWithClerk
				useAuth={useAuth}
				client={convex}
			>
				<AuthLoading>
					<Loading />
				</AuthLoading>
				<Authenticated>{children}</Authenticated>
				<Unauthenticated>{children}</Unauthenticated>
			</ConvexProviderWithClerk>
		</ClerkProvider>
	)
}
