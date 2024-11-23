import "@/styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { APIProvider as MapsApiProvider } from "@vis.gl/react-google-maps";
import type { AppProps } from "next/app";
import { Work_Sans as FontSans } from "next/font/google";

import Layout from "@/components/main/header/Layout";
import { AuthProvider } from "@/context/AuthProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style
        jsx
        global
      >{`:root { --font-sans: ${fontSans.style.fontFamily};}}`}</style>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <MapsApiProvider
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""}
          >
            <ReactQueryDevtools initialIsOpen={false} />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </MapsApiProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}
