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
        'py-6 lg:border-l w-72 md:w-96 px-3 lg:w-full fixed lg:block border-current lg:pl-6 transition-all duration-300 z-[6] overflow-y-auto scrollbar-hidden right-0 scrollbar-hidden-f lg:translate-x-0 transform lg:relative h-full',
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
                'font-semibold text-sm relative overflow-hidden rounded-sm',
                {
                  'disabled:block': item.title,
                  'text-yellow-200': theme === 'light',
                  'text-neutral-800': theme === 'dark'
                }
              )}
            >
              <div
                className={clsx(
                  'flex items-center relative transition-all px-1',
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
                  className={clsx('w-auto h-4 text-current relative z-[1]')}
                />
                <span
                  className="block w-full h-full z-[1] relative text-sm py-0.5 transition-all pl-1"
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
                      'font-semibold text-sm ml-2 relative overflow-hidden text-yellow-700'
                    )}
                    key={typeof command === 'object' ? command.title : command}
                  >
                    <div
                      className={clsx(
                        'flex items-center relative transition-all px-1',
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
                          'w-auto h-4 text-current relative z-[1]'
                        )}
                      />
                      <span
                        className="block w-full h-full relative z-[1] text-sm py-0.5 transition-all pl-2"
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
