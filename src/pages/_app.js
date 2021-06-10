import '../styles/index.css'
import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import useStore from '@/store/index'
import SideNav from '@/components/nav/SideNav'
import clsx from 'clsx'
import { HiPlus } from 'react-icons/hi'
import { Title } from '@/components/Title'
import { useRouter } from 'next/router'
import DocsLayout from '@/components/layouts/DocsLayout'
import PageMenu from '@/components/nav/PageMenu'

function App({ Component, pageProps }) {
  const appName = 'glab'
  const appId = 'gitlabcli'
  const theme = useStore(state => state.theme)
  const [doc, setDoc] = useState(false)
  const router = useRouter()
  const setTheme = useStore(state => state.setTheme)

  useEffect(() => {
    window.addEventListener('load', () => {
      if (typeof Storage !== 'undefined') {
        localStorage.getItem(appId) === null
          ? localStorage.setItem(appId, theme)
          : localStorage.getItem(appId)
      }
      localStorage.getItem(appId) == theme ? setTheme(theme) : setTheme(!theme)
    })
  }, [appId])

  return (
    <>
      <Title
        suffix={
          router.pathname === '/'
            ? undefined
            : 'GLAB (GitLab command line tool)'
        }
      >
        {router.pathname.split('/')[2]
          ? router.pathname.split('/')[2].toUpperCase()
          : router.pathname.split('/')[1].toUpperCase()}
      </Title>
      <main>
        <Navbar appName={appName} appId={appId} />
        {router.pathname.split('/')[1] === 'docs' ? (
          <>
            <section
              className={clsx(
                'px-8 h-full grid pt-40 lg:pt-16 fixed inset-0  lg:grid-cols-[2fr,6fr,2fr] xl:grid-cols-[1.8fr,6fr,2.2fr] md:px-16 xl:px-36 lg:px-28',
                {
                  'text-yellow-900': theme,
                  'text-yellow-200 bg-gray-900': !theme
                }
              )}
            >
              <SideNav doc={doc} setDoc={setDoc} />
              <DocsLayout>
                <Component {...pageProps} />
              </DocsLayout>
              {router.pathname !== '/docs' && <PageMenu />}
            </section>
            <button
              type="button"
              tabIndex={-1}
              className="fixed p-2 bg-yellow-200 border-0 rounded-full shadow-xl lg:hidden focus:outline-none bottom-10 right-10"
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
        ) : (
          <section
            className={clsx('pt-40 lg:pt-20', {
              'text-yellow-900': theme,
              'text-yellow-200 bg-gray-900': !theme
            })}
          >
            <Component {...pageProps} />
            <Footer />
          </section>
        )}
      </main>
    </>
  )
}

export default App
