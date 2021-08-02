import React from 'react'
import { documentation } from './documentation'
import NavLink from './NavLink'
import clsx from 'clsx'
import { toArray } from '@/utils/toArray'
import { useRouter } from 'next/router'
import useStore from '@/store/index'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayout'

const SideNav = ({ doc, setDoc }) => {
  const router = useRouter()
  const theme = useStore(state => state.theme)
  const setPageStruct = useStore(state => state.setPageStruct)

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
  }, [router.pathname])

  return (
    <>
      <nav
        className={clsx(
          'w-full transition-all pt-40 z-10 pb-5 md:px-16 lg:px-0 lg:pt-0 fixed inset-0 duration-300 lg:translate-x-0 transform lg:relative h-full overflow-y-auto scrollbar-hidden scrollbar-hidden-f border-current lg:border-r',
          {
            '-translate-x-full': !doc,
            'text-yellow-900 bg-yellow-200 lg:bg-white': theme === 'dark',
            'bg-gray-900 text-yellow-200': theme === 'light'
          }
        )}
      >
        <div className="w-full py-6 space-y-6">
          {Object.entries(documentation).map(([category, categoryItems]) => (
            <div key={category} className="w-full px-4">
              <h3 className="pl-3 font-black text-yellow-600 uppercase">
                {category.replace(/-/g, ' ')}
              </h3>
              <div className="">
                {toArray(categoryItems).map(item => (
                  <NavLink
                    href={
                      item === 'introduction'
                        ? `/docs`
                        : `/docs/${category.toLowerCase()}/${
                            Array.isArray(item) ? item[0] : item
                          }`
                    }
                    className={clsx('font-semibold text-sm')}
                    isActive={
                      (router.pathname.split('/')[3] ===
                      decodeURI(Array.isArray(item) ? item[0] : item)
                        ? true
                        : false) ||
                      (router.pathname === '/docs' && item === 'introduction'
                        ? true
                        : false)
                    }
                    key={Array.isArray(item) ? item[0] : item}
                  >
                    <span
                      className="block w-full h-full px-3 text-sm py-0.5 transition-all pl-5"
                      onClick={() => {
                        setDoc(false)
                        setPageStruct(item)
                      }}
                    >
                      {Array.isArray(item)
                        ? item[0].replace(/(-)/g, ' ')
                        : item.replace(/(-)/g, ' ')}
                    </span>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </>
  )
}

export default SideNav
