import type { AppProps } from "next/app"

// ToDo fix css import ESLint: Missing file extension "css" for "@teamlead.incubator/ui-kit/css"(import/extensions)
import { ReactNode } from "react"
import { Provider } from "react-redux"

import { wrapper } from "@/store"
import { Toaster } from "@teamlead.incubator/ui-kit"

import "../styles/index.scss"
// eslint-disable-next-line import/extensions
import "@teamlead.incubator/ui-kit/css"
import { Header } from "@/components/header/header"

export default function App({ Component, ...rest }: AppProps) {
  const { props, store } = wrapper.useWrappedStore(rest)

  return (
    <Provider store={store}>
      <Layout>
        <Component {...props.pageProps} />
        <Toaster />
      </Layout>
    </Provider>
  )
}

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}
