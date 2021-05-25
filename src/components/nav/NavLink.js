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
            'bg-yellow-200': isActive === true,
            'text-yellow-900': isActive === true && !theme
          })}
        >
          {children}
        </a>
      </Link>
    )
  }
)

export default NavLink
