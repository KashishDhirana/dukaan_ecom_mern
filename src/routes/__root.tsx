import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { alertMessage } from "@/data/alert";
import TanStackQueryDevtools from "@/integrations/tanstack-query/devtools";
import Alert from "@/layout/Alert";
import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import MenuBar from "@/layout/MenuBar";
import StoreDevtools from "@/lib/demo-store-devtools";
import { Toaster } from "@/shared/components/ui/sonner";
import { env } from "@/utils/env";
import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: env.VITE_APP_TITLE,
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),

	shellComponent: RootDocument,
	loader: () => alertMessage(),
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const message = Route.useLoaderData();
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body
				id="root-body"
				className="min-h-svh bg-primary-foreground flex flex-col justify-between"
			>
				<div>
					<Alert message={message ?? ""} />
					<Header />
					<MenuBar />
				</div>
				{children}
				<Footer />
				<Toaster />
				{!true && (
					<TanStackDevtools
						config={{
							position: "bottom-right",
						}}
						plugins={[
							{
								name: "Tanstack Router",
								render: <TanStackRouterDevtoolsPanel />,
							},
							TanStackQueryDevtools,
							StoreDevtools,
						]}
					/>
				)}
				<Scripts />
			</body>
		</html>
	);
}
