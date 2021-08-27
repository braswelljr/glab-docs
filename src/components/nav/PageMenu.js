import React from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import useStore from '@/store/index'
import NavLink from './NavLink'

function PageMenu({ pageList, setPageList }) {
  const router = useRouter()
  const pageStruct = useStore(state => state.pageStruct)
  const theme = useStore(state => state.theme)

  return (
    <nav
      className={clsx(
        'py-6 lg:border-l w-72 md:w-96 px-3 lg:w-full fixed lg:block border-current lg:pl-6 transition-all duration-300 z-[6] overflow-y-auto scrollbar-hidden right-0 scrollbar-hidden-f lg:translate-x-0 transform lg:relative h-full',
        {
          'translate-x-full': !pageList,
          'translate-x-0': pageList,
          'bg-yellow-200 lg:bg-white': theme === 'dark',
          'bg-gray-900': theme === 'light'
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
              className={clsx('font-semibold text-sm', {
                'disabled:block': item.title,
                ' text-yellow-200': theme === 'light',
                'text-gray-800': theme === 'dark'
              })}
              isActive={
                (router.pathname.split('/')[4] ===
                decodeURI(typeof item === 'object' ? item.title : item)
                  ? true
                  : false) || (router.pathname === '/docs' ? true : false)
              }
            >
              <span
                className="block w-full h-full text-sm py-0.5 transition-all pl-5"
                onClick={() => {
                  setPageList(false)
                }}
              >
                {typeof item === 'object'
                  ? item.title.replace(/(-)/g, ' ')
                  : item.replace(/(-)/g, ' ')}
              </span>
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
                    className={clsx('font-semibold text-sm ml-6', {
                      'text-yellow-800': !theme,
                      'text-yellow-900': theme
                    })}
                    isActive={
                      (router.pathname.split('/')[5] ===
                      decodeURI(
                        typeof item === 'object' ? command.title : command
                      )
                        ? true
                        : false) || (router.pathname === '/docs' ? true : false)
                    }
                    key={typeof command === 'object' ? command.title : command}
                  >
                    <span
                      className="block w-full h-full text-sm py-0.5 transition-all pl-4"
                      onClick={() => {
                        setPageList(false)
                      }}
                    >
                      {typeof command === 'object'
                        ? command.title.replace(/(-)/g, ' ')
                        : command.replace(/(-)/g, ' ')}
                    </span>
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
