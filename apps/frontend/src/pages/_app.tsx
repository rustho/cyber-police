import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import nextI18NextConfig from "../../next-i18next.config";
import "../styles/globals.css"; // Add this line

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(App);
