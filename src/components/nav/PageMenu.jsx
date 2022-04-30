import clsx from 'clsx'
import { useRouter } from 'next/router'
import useStore from '@/store/index'
import NavLink from '@/components/nav/NavLink'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayout'
import { documentation } from '@/components/nav/documentation'
import toArray from '@/utils/toArray'
import { HiChevronRight } from 'react-icons/hi'

function PageMenu({ pageList, setPageList }) {
  const router = useRouter()
  const pageStruct = useStore(state => state.pageStruct)
  const setPageStruct = useStore(state => state.setPageStruct)
  const theme = useStore(state => state.theme)

  // set page struct on page load
  useIsomorphicLayoutEffect(() => {
    function Loader() {
      Object.entries(documentation).map(([category, categoryItems]) => {
        toArray(categoryItems).map(item => {
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
        'scrollbar-hidden scrollbar-hidden-f fixed right-0 z-[6] h-full w-72 transform overflow-y-auto border-current py-6 px-3 transition-all duration-300 md:w-96 lg:relative lg:block lg:w-full lg:translate-x-0 lg:border-l lg:pl-6',
        {
          'translate-x-full': !pageList,
          'translate-x-0': pageList,
          'bg-yellow-200 lg:bg-white': theme === 'dark',
          'bg-neutral-900': theme === 'light'
        }
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
        pageStruct[1].map(item => (
          <div key={typeof item === 'object' ? item.title : item}>
            <NavLink
              href={
                item === 'introduction'
                  ? `/docs`
                  : `/docs/${router.pathname.split('/')[2]}/${
                      router.pathname.split('/')[3]
                    }/${typeof item === 'object' ? item.title : item}`
              }
              className={clsx(
                'relative overflow-hidden rounded-sm text-sm font-semibold',
                {
                  'disabled:block': item.title,
                  'text-yellow-200': theme === 'light',
                  'text-neutral-800': theme === 'dark'
                }
              )}
            >
              <div
                className={clsx(
                  'relative flex items-center px-1 transition-all',
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
                  className={clsx('absolute inset-0', {
                    'bg-yellow-300 lg:bg-yellow-200': theme === 'dark',
                    'bg-yellow-200/20': theme === 'light',
                    'w-full':
                      router.pathname.split('/')[4] ===
                        decodeURI(
                          typeof item === 'object' ? item.title : item
                        ) || router.pathname === '/docs',
                    'w-0':
                      router.pathname.split('/')[4] !==
                        decodeURI(
                          typeof item === 'object' ? item.title : item
                        ) && router.pathname !== '/docs'
                  })}
                />
                <HiChevronRight
                  className={clsx('relative z-[1] h-4 w-auto text-current')}
                />
                <span
                  className="relative z-[1] block h-full w-full py-0.5 pl-1 text-sm transition-all"
                  onClick={() => {
                    setPageList(false)
                  }}
                >
                  {typeof item === 'object'
                    ? item.title.replace(/(-)/g, ' ')
                    : item.replace(/(-)/g, ' ')}
                </span>
              </div>
            </NavLink>
            {typeof item === 'object' && (
              <div className={clsx('')}>
                {item.commands.map(command => (
                  <NavLink
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
                      'relative ml-2 overflow-hidden text-sm font-semibold text-yellow-700'
                    )}
                    key={typeof command === 'object' ? command.title : command}
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
                          '-translate-x-4':
                            router.pathname.split('/')[5] !==
                              decodeURI(
                                typeof item === 'object'
                                  ? command.title
                                  : command
                              ) && router.pathname !== '/docs'
                        }
                      )}
                    >
                      <HiChevronRight
                        className={clsx(
                          'relative z-[1] h-4 w-auto text-current'
                        )}
                      />
                      <span
                        className="relative z-[1] block h-full w-full py-0.5 pl-2 text-sm transition-all"
                        onClick={() => {
                          setPageList(false)
                        }}
                      >
                        {typeof command === 'object'
                          ? command.title.replace(/(-)/g, ' ')
                          : command.replace(/(-)/g, ' ')}
                      </span>
                    </div>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
    </nav>
  )
}

export default PageMenu
