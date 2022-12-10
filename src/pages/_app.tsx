import '../styles/index.css'
import type { AppProps } from 'next/app'
import type { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
import Router from 'next/router'
import ProgressBar from '@badrap/bar-of-progress'
import useTheme from '@/hooks/useTheme'
import Layout from '@/layouts/Layout'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const progress = new ProgressBar({
  size: 3,
  color: '#382519',
  className: 'bar-of-progress',
  delay: 100
})

// this fixes safari jumping to the bottom of the page
// when closing the search modal using the `esc` key
if (typeof window !== 'undefined') {
  progress.start()
  progress.finish()
}

Router.events.on('routeChangeStart', () => progress.start())
Router.events.on('routeChangeComplete', () => progress.finish())
Router.events.on('routeChangeError', () => progress.finish())

const App = ({
  Component,
  pageProps: { ...pageProps }
}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page: any) => page)
  // theme to get user's preferred theme
  // fix theme initalization
  const _ = useTheme()

  return getLayout(
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default App
