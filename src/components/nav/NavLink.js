import { forwardRef } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import useStore from '@/store/index'

const NavLink = forwardRef(
  ({ children, href, className, isActive }, linkRef) => {
    const theme = useStore(state => state.theme)

    return (
      <Link href={encodeURI(href)} ref={linkRef}>
        <a
          className={clsx('block rounded', className, {
            'bg-yellow-300 lg:bg-yellow-200': isActive === true && theme,
            'bg-yellow-200 bg-opacity-20': isActive === true && !theme
          })}
          onClick={() =>
            (document.documentElement.scrollTop = 0) &&
            (document.body.scrollTop = 0)
          }
        >
          {children}
        </a>
      </Link>
    )
  }
)

export default NavLink
