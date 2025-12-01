import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import Alert from "@/components/Alert";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MenuBar from "@/components/MenuBar";
import NotFound from "@/components/NotFound";
import { alertMessage } from "@/data/alert";
import { env } from "@/env";
import TanStackQueryDevtools from "@/integrations/tanstack-query/devtools";
import StoreDevtools from "@/lib/demo-store-devtools";
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
  loader: async () => await alertMessage(),
  notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const message = Route.useLoaderData();
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body id="root-body">
        <Alert message={message ?? ""} />
        <Header />
        <MenuBar />
        {children}
        <a
          href="#root-body"
          className="grid place-items-center bg-gray-700 hover:bg-gray-800 text-zinc-200 p-2"
        >
          Go to Top
        </a>
        <Footer />
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
        <Scripts />
      </body>
    </html>
  );
}
