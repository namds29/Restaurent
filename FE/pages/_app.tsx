import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Header from '@components/Header'
import { AppProvider } from 'context-api/AppContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Header>
        <Component {...pageProps} />
      </Header>
    </AppProvider>
  )


}
