import '../styles/index.css'
import '../styles/docsearch.css'
import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import useStore from '@/store/index'
import SideNav from '@/components/nav/SideNav'
import clsx from 'clsx'
import { HiMenuAlt4, HiX } from 'react-icons/hi'
import { IoIosList } from 'react-icons/io'
import { Title } from '@/components/Title'
import { useRouter } from 'next/router'
import DocsLayout from '@/components/layouts/DocsLayout'
import PageMenu from '@/components/nav/PageMenu'
import PrevNext from '@/components/PrevNext'
import { documentation } from '@/components/nav/documentation'
import { flattenArray } from '@/utils/flattenArray'

function App({ Component, pageProps }) {
  const appName = 'glab'
  const appId = 'gitlabcli'
  const theme = useStore(state => state.theme)
  const [doc, setDoc] = useState(false)
  const [pageList, setPageList] = useState(false)
  const router = useRouter()
  const setDark = useStore(state => state.themeDark)
  const setLight = useStore(state => state.themeLight)

  useEffect(() => {
    window.addEventListener('load', () => {
      if (typeof Storage !== 'undefined') {
        localStorage.getItem(appId) === null
          ? localStorage.setItem(appId, theme)
          : localStorage.getItem(appId)
      }
      localStorage.getItem(appId) === 'light' ? setLight() : setDark()
    })
  }, [appId])

  const pathway = flattenArray(
    Object.entries(documentation.Commands).map(([key, value]) => {
      if (value.length > 0)
        return [
          `/docs/commands/${key}`,
          value.map(v => `/docs/commands/${key}/${v.title}`),
          value.map(v =>
            v.commands.map(c => `/docs/commands/${key}/${v.title}/${c.title}`)
          )
        ]
      else null
    })
  )
    .filter(item => item != null || item != undefined)
    .includes(router.pathname)

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
                'px-8 h-full grid pt-40 lg:pt-16 fixed inset-0 md:px-16 xl:px-36 lg:px-28',
                {
                  'text-yellow-900': theme === 'dark',
                  'text-yellow-200 bg-gray-900': theme === 'light',
                  'lg:grid-cols-[2fr,6fr,2fr] xl:grid-cols-[1.8fr,6.4fr,1.8fr]':
                    pathway == true,
                  'lg:grid-cols-[2.5fr,7.5fr]': pathway != true
                }
              )}
            >
              <SideNav doc={doc} setDoc={setDoc} />
              <DocsLayout>
                <Component {...pageProps} />
                <PrevNext />
              </DocsLayout>
              {pathway == true && (
                <>
                  <PageMenu pageList={pageList} setPageList={setPageList} />
                  <button
                    type="button"
                    className={clsx(
                      'bg-yellow-300 bg-opacity-10 absolute h-full w-full lg:hidden z-[5] inset-0',
                      { hidden: !pageList }
                    )}
                    onClick={() => setPageList(!pageList)}
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    className={clsx(
                      'absolute p-2 border-0 z-[6] rounded-l shadow-xl  duration-300 lg:hidden focus:outline-none top-44 right-0 transform transition-all',
                      {
                        'bg-yellow-200': theme === 'light',
                        'bg-yellow-900': theme === 'dark',
                        '-translate-x-72 md:-translate-x-96': pageList === true
                      }
                    )}
                    onClick={() => setPageList(!pageList)}
                  >
                    <IoIosList
                      className={clsx('w-auto h-5', {
                        'text-yellow-900': theme === 'light',
                        'text-yellow-200': theme === 'dark'
                      })}
                    />
                  </button>
                </>
              )}
            </section>

            <button
              type="button"
              tabIndex={-1}
              className={clsx(
                'fixed p-2 z-[8] border-0 rounded-full shadow-xl lg:hidden focus:outline-none bottom-10 right-10',
                {
                  'bg-yellow-200': theme === 'light',
                  'bg-yellow-900': theme === 'dark'
                }
              )}
              onClick={() => {
                setDoc(!doc)
                setPageList(false)
              }}
            >
              {!doc ? (
                <HiMenuAlt4
                  className={clsx('w-auto h-10 transition-all transform', {
                    'text-yellow-900': theme === 'light',
                    'text-yellow-200': theme === 'dark'
                  })}
                />
              ) : (
                <HiX
                  className={clsx('w-auto h-10 transition-all transform', {
                    'text-yellow-900': theme === 'light',
                    'text-yellow-200': theme === 'dark'
                  })}
                />
              )}
            </button>
          </>
        ) : (
          <section
            className={clsx('pt-40 lg:pt-20', {
              'text-yellow-900': theme === 'dark',
              'text-yellow-200 bg-gray-900': theme === 'light'
            })}
          >
            <Component {...pageProps} />
          </section>
        )}
      </main>
    </>
  )
}

export default App
