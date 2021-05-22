import React from 'react'
import documentation from './documentation'
import NavLink from './NavLink'

function SideNav() {
  return (
    <>
      <nav className="w-full border-gray-200 lg:border-r">
        <div className="w-full py-4">
          {Object.entries(documentation).map(([category, categoryItems]) => (
            <div key={category} className="w-full px-4 py-2">
              <h3 className="font-bold uppercase">{category}</h3>
              <div className="">
                {Array.isArray(categoryItems)
                  ? categoryItems.map(item => (
                    <NavLink href={item} addClasses="font-medium" key={item}>
                      {item.replace(/(-)/g, ' ')}
                    </NavLink>
                  ))
                  : typeof categoryItems === 'object'
                    ? Object.keys(categoryItems).map(item => (
                      <div className="font-medium" key={item}>
                        {item.replace(/(-)/g, ' ')}
                      </div>
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
