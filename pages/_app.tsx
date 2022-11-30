import "@/styles/globals.css";
import "@/styles/uicons-regular-rounded/webfonts/uicons-regular-rounded.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/helper/context/AuthContext";
import { SWRConfig } from "swr";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
    // <SWRConfig>
    //   <AuthProvider>
    //   </AuthProvider>
    // </SWRConfig>
  );
}
