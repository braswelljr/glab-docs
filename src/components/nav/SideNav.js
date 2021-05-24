import React from 'react'
import documentation from './documentation'
import NavLink from './NavLink'
import clsx from 'clsx'

const SideNav = ({ doc }) => {
  return (
    <>
      <nav
        className={clsx(
          'w-full transition-all pt-40 pb-5 text-yellow-900 md:px-16 lg:px-0 lg:pt-0 absolute inset-0 duration-300 lg:translate-x-0 transform lg:relative h-full overflow-y-auto border-b bg-yellow-100 scrollbar-hidden scrollbar-hidden-f lg:bg-white border-gray-200 lg:border-b-0 lg:border-r',
          { '-translate-x-full': !doc }
        )}
      >
        <div className="w-full py-2 space-y-2.5">
          {Object.entries(documentation).map(([category, categoryItems]) => (
            <div key={category} className="w-full px-4">
              <h3 className="pl-3 font-black uppercase">{category}</h3>
              <div className="">
                {Array.isArray(categoryItems)
                  ? categoryItems.map(item => (
                      <NavLink
                        href={item}
                        className="font-medium hover:pl-8 transition-all px-3 py-0.5"
                        key={item}
                      >
                        {item.replace(/(-)/g, ' ')}
                      </NavLink>
                    ))
                  : typeof categoryItems === 'object'
                  ? Object.entries(categoryItems).map(([k, e]) => (
                      <NavLink
                        href={k}
                        className="font-medium hover:pl-8 transition-all px-3 py-0.5"
                        key={k}
                      >
                        {k.replace(/(-)/g, ' ')}
                      </NavLink>
                    ))
                  : undefined}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </>
  )
}

export default SideNav
