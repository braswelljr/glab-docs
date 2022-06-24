import clsx from 'clsx'
import { useRouter } from 'next/router'
import { HiChevronRight } from 'react-icons/hi'
import shallow from 'zustand/shallow'
import useStore from '@/store/index'
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayout'
import documentation from '@/components/documentation'
import toArray from '@/utils/toArray'
import LinkWithRef from '@/components/LinkWithRef'

function PageMenu({
  pageList,
  setPageList
}: {
  pageList: any
  setPageList: (pageList: any) => void
}) {
  const router = useRouter()
  const [pageStruct, setPageStruct] = useStore(
    state => [state.pageStruct, state.setPageStruct],
    shallow
  )

  // set page struct on page load
  useIsomorphicLayoutEffect(() => {
    function Loader() {
      Object.entries(documentation).map(([category, categoryItems]) => {
        toArray(categoryItems)?.map(item => {
          if (
            router.pathname.split('/')[2] === category.toLowerCase() &&
            router.pathname.split('/')[3] ===
              (Array.isArray(item) ? item[0] : item)
          ) {
            setPageStruct(item)
          }
        })
      })
    }

    window.addEventListener('load', Loader)
    return () => {
      window.removeEventListener('load', Loader)
    }
  }, [router.pathname, pageStruct])

  return (
    <nav
      className={clsx(
        'scrollbar-hidden scrollbar-hidden-f fixed right-0 z-[6] h-full w-72 transform overflow-y-auto border-current bg-yellow-200 py-6 px-3 transition-all duration-300 dark:bg-neutral-900 md:w-96 lg:relative lg:block lg:w-full lg:translate-x-0 lg:border-l lg:bg-white lg:pl-6',
        pageList ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      {/* Header */}
      <h2 className={clsx('font-semibold uppercase text-yellow-600')}>
        {router.pathname.split('/')[3] ===
          (Array.isArray(pageStruct) ? pageStruct[0] : pageStruct) &&
          router.pathname.split('/')[3].replace(/-/g, ' ')}
      </h2>

      {/* Content */}
      {Array.isArray(pageStruct) &&
        (pageStruct[1] as unknown as any[]).map((item: any) => (
          <div key={typeof item === 'object' ? item.title : item}>
            <LinkWithRef
              href={
                item === 'introduction'
                  ? `/docs`
                  : `/docs/${router.pathname.split('/')[2]}/${
                      router.pathname.split('/')[3]
                    }/${typeof item === 'object' ? item.title : item}`
              }
              className={clsx(
                'relative overflow-hidden rounded-md text-sm font-semibold text-neutral-800 dark:text-yellow-200',
                item.title && 'disabled:block'
              )}
              onClick={() =>
                (document.documentElement.scrollTop = 0) &&
                (document.body.scrollTop = 0)
              }
            >
              <div
                className={clsx(
                  'relative flex items-center px-1 py-1 transition-all',
                  {
                    'translate-x-0':
                      router.pathname.split('/')[4] ===
                        decodeURI(
                          typeof item === 'object' ? item.title : item
                        ) || router.pathname === '/docs',
                    '-translate-x-4':
                      router.pathname.split('/')[4] !==
                        decodeURI(
                          typeof item === 'object' ? item.title : item
                        ) && router.pathname !== '/docs'
                  }
                )}
              >
                <div
                  className={clsx(
                    'absolute inset-0 bg-brown-800/50 dark:bg-yellow-300/20 lg:bg-yellow-200 dark:lg:bg-yellow-200/20',
                    router.pathname.split('/')[4] ===
                      decodeURI(typeof item === 'object' ? item.title : item) ||
                      router.pathname === '/docs'
                      ? 'w-full'
                      : 'w-0'
                  )}
                />
                <HiChevronRight
                  className={clsx('relative z-[1] h-4 w-auto text-current')}
                />
                <span
                  className="relative z-[1] block h-full w-full py-0.5 pl-1 text-sm transition-all"
                  onClick={() => setPageList(false)}
                >
                  {typeof item === 'object'
                    ? item.title.replace(/(-)/g, ' ')
                    : item.replace(/(-)/g, ' ')}
                </span>
              </div>
            </LinkWithRef>
            {typeof item === 'object' && (
              <div className={clsx('ml-2')}>
                {item.commands.map((command: any) => (
                  <LinkWithRef
                    href={
                      item === 'introduction'
                        ? `/docs`
                        : `/docs/${router.pathname.split('/')[2]}/${
                            router.pathname.split('/')[3]
                          }/${typeof item === 'object' ? item.title : item}/${
                            typeof command === 'object'
                              ? command.title
                              : command
                          }`
                    }
                    className={clsx(
                      'relative overflow-hidden text-sm font-semibold text-yellow-700'
                    )}
                    key={typeof command === 'object' ? command.title : command}
                    onClick={() =>
                      (document.documentElement.scrollTop = 0) &&
                      (document.body.scrollTop = 0)
                    }
                  >
                    <div
                      className={clsx(
                        'relative flex items-center px-1 transition-all',
                        {
                          'translate-x-0':
                            router.pathname.split('/')[5] ===
                              decodeURI(
                                typeof item === 'object'
                                  ? command.title
                                  : command
                              ) || router.pathname === '/docs',
                          '-translate-x-2':
                            router.pathname.split('/')[5] !==
                              decodeURI(
                                typeof item === 'object'
                                  ? command.title
                                  : command
                              ) && router.pathname !== '/docs'
                        }
                      )}
                    >
                      <div
                        className={clsx(
                          'absolute inset-0 bg-brown-800/50 dark:bg-yellow-300/20 lg:bg-yellow-300 dark:lg:bg-yellow-300/20',
                          router.pathname.split('/')[5] ===
                            decodeURI(
                              typeof item === 'object' ? command.title : command
                            ) || router.pathname === '/docs'
                            ? 'w-full'
                            : 'w-0'
                        )}
                      />
                      <HiChevronRight
                        className={clsx(
                          'relative z-[1] h-4 w-auto text-current'
                        )}
                      />
                      <span
                        className="relative z-[1] block h-full w-full py-0.5 pl-2 text-sm transition-all"
                        onClick={() => setPageList(false)}
                      >
                        {typeof command === 'object'
                          ? command.title.replace(/(-)/g, ' ')
                          : command.replace(/(-)/g, ' ')}
                      </span>
                    </div>
                  </LinkWithRef>
                ))}
              </div>
            )}
          </div>
        ))}
    </nav>
  )
}

export default PageMenu
