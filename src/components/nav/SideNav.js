import React from 'react'
import documentation from './documentation'
import NavLink from './NavLink'

const SideNav = ({ doc }) => {
  return (
    <>
      <nav
        className={`w-full absolute transition-all lg:translate-x-0 transform lg:relative h-(calc(100vh-10rem)) scrollbar-hidden scrollbars-hidden-f overflow-y-auto border-b bg-yellow-50 lg:bg-white border-gray-200 top-[calc(10rem-0.25rem)] lg:top-0 md:top-[calc(5rem-0.25rem)] lg:border-b-0 lg:border-r ${
          doc ? `translate-x-0` : `-translate-x-full`
        }`}
      >
        <div className="w-full py-2 space-y-2.5 scrollbars-hidden scrollbars-hidden-f">
          {Object.entries(documentation).map(([category, categoryItems]) => (
            <div key={category} className="w-full px-4">
              <h3 className="pl-3 font-extrabold uppercase">{category}</h3>
              <div className="">
                {Array.isArray(categoryItems)
                  ? categoryItems.map(item => (
                    <NavLink
                      href={item}
                      className="font-medium px-3 py-0.5"
                      key={item}
                    >
                      {item.replace(/(-)/g, ' ')}
                    </NavLink>
                  ))
                  : typeof categoryItems === 'object'
                    ? Object.entries(categoryItems).map(([k, e]) => (
                      <NavLink
                        href={k}
                        className="font-medium px-3 py-0.5"
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
