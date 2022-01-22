import { forwardRef } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

const NavLink = forwardRef(({ children, href, className }, linkRef) => {
  return (
    <Link href={encodeURI(href)} ref={linkRef} passHref>
      <a
        className={clsx('block', className)}
        onClick={() =>
          (document.documentElement.scrollTop = 0) &&
          (document.body.scrollTop = 0)
        }
      >
        {children}
      </a>
    </Link>
  )
})

export default NavLink
