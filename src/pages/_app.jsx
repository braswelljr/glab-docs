import '../styles/index.css'
import '../styles/docsearch.css'
import { useState, useEffect, Fragment } from 'react'
import Navbar from '@/components/Navbar'
import useStore from '@/store/index'
import SideNav from '@/components/nav/SideNav'
import clsx from 'clsx'
import { HiMenu, HiX } from 'react-icons/hi'
import { IoIosList } from 'react-icons/io'
import { Title } from '@/components/Title'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import DocsLayout from '@/components/layouts/DocsLayout'
import PageMenu from '@/components/nav/PageMenu'
import PrevNext from '@/components/PrevNext'
import { documentation } from '@/components/nav/documentation'
import flattenArray from '@/utils/flattenArray'

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
  }, [appId, setDark, setLight, theme])

  // get specific page menus for specific paths
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
    .filter(item => item !== null || item != undefined)
    .includes(router.pathname)

  return (
    <>
      <Title
        suffix={
          router.pathname === '/'
            ? undefined
            : 'glab (GitLab command line tool)'
        }
      >
        {router.pathname.split('/')[2]
          ? router.pathname.split('/')[2]
          : router.pathname.split('/')[1]}
      </Title>
      <main>
        <Navbar appName={appName} appId={appId} />
        {router.pathname.split('/')[1] === 'docs' ? (
          <>
            <section
              className={clsx(
                'fixed inset-0 grid h-full px-8 pt-40 md:px-16 lg:px-28 lg:pt-16 xl:px-36',
                {
                  'text-yellow-900': theme === 'dark',
                  'bg-neutral-900 text-yellow-200': theme === 'light',
                  'lg:grid-cols-[2fr,6fr,2fr] xl:grid-cols-[1.8fr,6.4fr,1.8fr]':
                    pathway == true,
                  'lg:grid-cols-[2fr,8fr] xl:grid-cols-[1.8fr,8.2fr]':
                    pathway != true
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
                      'absolute inset-0 z-[5] h-full w-full bg-yellow-300 bg-opacity-10 lg:hidden',
                      { hidden: !pageList }
                    )}
                    onClick={() => setPageList(!pageList)}
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    className={clsx(
                      'absolute top-44 right-0 z-[6] transform rounded-l  border-0 p-2 shadow-xl transition-all duration-300 focus:outline-none lg:hidden',
                      {
                        'bg-yellow-200': theme === 'light',
                        'bg-yellow-900': theme === 'dark',
                        '-translate-x-72 md:-translate-x-96': pageList === true
                      }
                    )}
                    onClick={() => setPageList(!pageList)}
                  >
                    <IoIosList
                      className={clsx('h-5 w-auto', {
                        'text-yellow-900': theme === 'light',
                        'text-yellow-200': theme === 'dark'
                      })}
                    />
                  </button>
                </>
              )}
            </section>

            <motion.button
              type="button"
              drag
              dragConstraints={{
                top: -150,
                left: -120,
                right: -10,
                bottom: -10
              }}
              tabIndex={-1}
              className={clsx(
                'fixed bottom-10 right-10 z-[8] h-10 w-10 overflow-hidden rounded-full border-0 p-2 shadow-xl focus:outline-none lg:hidden',
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
              <HiMenu
                className={clsx(
                  'absolute top-1/2 right-1/2 h-auto w-7 -translate-y-1/2 transform transition-all',
                  {
                    'text-yellow-900': theme === 'light',
                    'text-yellow-200': theme === 'dark',
                    '-translate-x-1/2 scale-50': doc,
                    'translate-x-1/2': !doc
                  }
                )}
              />
              <HiX
                className={clsx(
                  'absolute top-1/2 left-1/2 h-auto w-7 -translate-y-1/2 transform transition-all',
                  {
                    'text-yellow-900': theme === 'light',
                    'text-yellow-200': theme === 'dark',
                    '-translate-x-1/2': doc,
                    'translate-x-1/2 scale-50': !doc
                  }
                )}
              />
            </motion.button>
          </>
        ) : (
          <section
            className={clsx('pt-40 lg:pt-20', {
              'text-yellow-900': theme === 'dark',
              'bg-neutral-900 text-yellow-200': theme === 'light'
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
