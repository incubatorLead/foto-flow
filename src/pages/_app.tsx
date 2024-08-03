import type { AppProps } from 'next/app'
// ToDo fix css import ESLint: Missing file extension "css" for "@teamlead.incubator/ui-kit/css"(import/extensions)
// eslint-disable-next-line import/extensions
import '@teamlead.incubator/ui-kit/css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
