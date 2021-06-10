import React from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import useStore from '@/store/index'
import NavLink from './NavLink'

function PageMenu() {
  const router = useRouter()
  const pageStruct = useStore(state => state.pageStruct)

  return (
    <>
      <nav
        className={clsx(
          'py-6 lg:border-l hidden lg:block border-current lg:pl-6 overflow-y-auto scrollbar-hidden scrollbar-hidden-f'
        )}
      >
        {/* Header */}
        <h2 className={clsx('capitalize font-semibold text-yellow-600')}>
          {router.pathname.split('/')[3] ===
            (Array.isArray(pageStruct) ? pageStruct[0] : pageStruct) &&
            router.pathname.split('/')[3].replace(/-/g, ' ')}
        </h2>

        {/* Content */}
        {Array.isArray(pageStruct)
          ? pageStruct[1].map(item => (
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
                    'font-semibold text-sm capitalize text-yellow-400',
                    { 'disabled:block': item.title }
                  )}
                  isActive={
                    (router.pathname.split('/')[4] ===
                    decodeURI(typeof item === 'object' ? item.title : item)
                      ? true
                      : false) || (router.pathname === '/docs' ? true : false)
                  }
                >
                  <span className="block w-full h-full text-sm py-0.5 transition-all hover:pl-5">
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
                              }/${
                                typeof item === 'object' ? item.title : item
                              }/${command.title}`
                        }
                        className={clsx('font-semibold text-sm ml-2')}
                        isActive={
                          (router.pathname.split('/')[5] ===
                          decodeURI(
                            typeof item === 'object' ? command.title : command
                          )
                            ? true
                            : false) ||
                          (router.pathname === '/docs' ? true : false)
                        }
                        key={
                          typeof command === 'object' ? command.title : command
                        }
                      >
                        <span className="block w-full h-full text-sm py-0.5 transition-all hover:pl-5">
                          {typeof command === 'object'
                            ? command.title.replace(/(-)/g, ' ')
                            : command.replace(/(-)/g, ' ')}
                        </span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))
          : undefined}
      </nav>
    </>
  )
}

export default PageMenu
