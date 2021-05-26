import '../styles/index.css'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import useStore from '@/store/index'
import Index from './index'
import SideNav from '@/components/nav/SideNav'
import clsx from 'clsx'
import { HiPlus } from 'react-icons/hi'

function App({ Component, pageProps }) {
  const appName = `glab`
  const theme = useStore(state => state.theme)
  const [doc, setDoc] = useState(false)

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>GLAB - GitLab command line tool.</title>

        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="./favicon.ico" type="image/x-icon" />
        <link href="/icons/icon192.png" rel="icon" type="image/png" />
        <link href="/icons/icon512.png" rel="icon" type="image/png" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="theme-color" content="#317EFB" />
      </Head>
      <main
        className={clsx('', {
          'text-yellow-900': theme,
          'text-yellow-200 bg-gray-900': !theme
        })}
      >
        <Navbar appName={appName} />
        {Component == Index ? (
          <section className="pt-40 lg:pt-20">
            <Component {...pageProps} />
            <Footer />
          </section>
        ) : (
          <>
            <section
              className={clsx(
                'px-8 h-full grid pt-40 lg:pt-16 fixed inset-0  lg:grid-cols-[2.5fr,7.5fr] xl:grid-cols-[2fr,8fr] md:px-20 xl:px-40 lg:px-32',
                {
                  'text-yellow-900': theme,
                  'text-yellow-200 bg-gray-900': !theme
                }
              )}
            >
              <SideNav doc={doc} />
              <Component {...pageProps} />
            </section>
            <button
              type="button"
              tabIndex={-1}
              className="fixed p-2 bg-yellow-200 border-0 rounded-full shadow lg:hidden focus:outline-none bottom-10 right-10"
              onClick={() => setDoc(!doc)}
            >
              <HiPlus
                className={clsx('w-auto h-10 transition-all transform', {
                  'rotate-45': doc,
                  'text-yellow-900': !theme
                })}
              />
            </button>
          </>
        )}
      </main>
    </>
  )
}

export default App
