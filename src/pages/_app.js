import '../styles/index.css'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import useStore from '@/store/index'
import SideNav from '@/components/nav/SideNav'
import clsx from 'clsx'
import { HiPlus } from 'react-icons/hi'
import { Title } from '@/components/Title'
import { useRouter } from 'next/router'
import DocsLayout from '@/components/layouts/DocsLayout'

function App({ Component, pageProps }) {
  const appName = 'glab'
  const appId = 'gitlabcli'
  const theme = useStore(state => state.theme)
  const [doc, setDoc] = useState(false)
  const router = useRouter()

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
                'px-8 h-full grid pt-40 lg:pt-16 fixed inset-0  lg:grid-cols-[2.5fr,6fr,1.5fr] xl:grid-cols-[2fr,6fr,2fr] md:px-20 xl:px-40 lg:px-32',
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

// className={clsx('', {
//   'text-yellow-900': theme,
//   'text-yellow-200 bg-gray-900': !theme
// })}
