import { ROUTES } from "@/routes";
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <Toaster position="top-center" />
      <ClerkProvider
        afterSignInUrl={ROUTES.dashboard}
        afterSignUpUrl={ROUTES.dashboard}
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        {...pageProps}
      >
        <Component {...pageProps} />
      </ClerkProvider>
    </div>
  );
}
