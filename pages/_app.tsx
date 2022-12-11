import "@/styles/globals.css";
import "@/styles/uicons-regular-rounded/webfonts/uicons-regular-rounded.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
