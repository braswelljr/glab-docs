import React from 'react'
import documentation from './documentation'
import NavLink from './NavLink'
import clsx from 'clsx'
import { toArray } from '@/utils/toArray'
import { useRouter } from 'next/router'
import useStore from '@/store/index'

const SideNav = ({ doc }) => {
  const router = useRouter()
  const theme = useStore(state => state.theme)

  return (
    <>
      <nav
        className={clsx(
          'w-full transition-all pt-40 pb-5 md:px-16 lg:px-0 lg:pt-0 absolute inset-0 duration-300 lg:translate-x-0 transform lg:relative h-full overflow-y-auto scrollbar-hidden scrollbar-hidden-f border-current lg:border-r',
          {
            '-translate-x-full': !doc,
            'text-yellow-900 bg-yellow-200 lg:bg-white': theme,
            'bg-black text-yellow-200': !theme
          }
        )}
      >
        <div className="w-full py-5 space-y-2.5">
          {Object.entries(documentation).map(([category, categoryItems]) => (
            <div key={category} className="w-full px-4">
              <h3 className="pl-3 font-black uppercase">{category}</h3>
              <div className="">
                {toArray(categoryItems).map(item => (
                  <NavLink
                    href={`/docs/${item}`}
                    className={clsx(
                      'font-medium hover:pl-8 transition-all px-3 py-0.5'
                    )}
                    isActive={
                      router.pathname.split('/')[1] === 'docs' &&
                      item === 'introduction'
                        ? true
                        : router.pathname.split('/')[2] === decodeURI(item)
                        ? true
                        : false
                    }
                    key={item}
                  >
                    {item.replace(/(-)/g, ' ')}
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
