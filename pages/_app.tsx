import { ROUTES } from "@/routes";
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider
      afterSignInUrl={ROUTES.dashboard}
      afterSignUpUrl={ROUTES.dashboard}
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      {...pageProps}
    >
      <QueryClientProvider client={queryClient}>
        <Toaster position="bottom-right" />
        <div className={inter.className}>
          <ReactQueryDevtools initialIsOpen={true} />
          <Component {...pageProps} />
        </div>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
