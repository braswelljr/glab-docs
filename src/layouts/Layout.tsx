import { useState } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { IoIosList } from 'react-icons/io'
import { Title } from '@/components/Title'
import Navbar from '@/components/Navbar'
import SideNav from '@/components/SideNav'
import DocsLayout from '@/layouts/DocsLayout'
import PageMenu from '@/components/PageMenu'
import PrevNext from '@/components/PrevNext'
import documentation from '@/components/documentation'
import flattenArray from '@/utils/flattenArray'

const Layout = ({ children }: { children: JSX.Element }) => {
  const [doc, setDoc] = useState(false)
  const [pageList, setPageList] = useState(false)
  const router = useRouter()

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
      else return null
    })
  )
    .filter((item: any) => item !== null)
    .includes(router.pathname)

  return (
    <>
      <Title
        suffix={
          router.pathname === '/'
            ? undefined
            : 'GLab (GitLab command line tool)'
        }
      >
        {router.pathname.split('/')[2]
          ? router.pathname.split('/')[2]
          : router.pathname.split('/')[1]}
      </Title>
      <main>
        <Navbar doc={doc} setDoc={setDoc} setPageList={setPageList} />
        {router.pathname.split('/')[1] === 'docs' ? (
          <section
            className={clsx(
              'fixed inset-0 grid h-full px-4 pt-40 text-yellow-900 dark:bg-neutral-900 dark:text-yellow-200 md:px-10 lg:px-20 lg:pt-16 xl:px-28',
              pathway
                ? 'lg:grid-cols-[2fr,6fr,2fr] xl:grid-cols-[1.8fr,6.4fr,1.8fr]'
                : 'lg:grid-cols-[2fr,8fr] xl:grid-cols-[1.8fr,8.2fr]'
            )}
          >
            <SideNav doc={doc} setDoc={setDoc} />
            <DocsLayout>
              {children}
              <PrevNext />
            </DocsLayout>
            {pathway && (
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
                    'absolute top-44 right-0 z-[6] transform rounded-l  border-0 bg-yellow-300 p-2 shadow-xl transition-all duration-300 focus:outline-none dark:bg-yellow-900 lg:hidden',
                    pageList && '-translate-x-72 md:-translate-x-96'
                  )}
                  onClick={() => setPageList(!pageList)}
                >
                  <IoIosList
                    className={clsx(
                      'h-5 w-auto text-yellow-900 dark:text-yellow-200'
                    )}
                  />
                </button>
              </>
            )}
          </section>
        ) : (
          <section
            className={clsx(
              'pt-40 text-yellow-900 dark:bg-neutral-900 dark:text-yellow-200 lg:pt-20'
            )}
          >
            {children}
          </section>
        )}
      </main>
    </>
  )
}

export default Layout
