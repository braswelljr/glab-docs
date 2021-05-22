import { forwardRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'

const NavLink = forwardRef(({ children, href, addClasses }, linkRef) => {
  const router = useRouter()

  return (
    <Link href={`/docs/${href}`} ref={linkRef}>
      <button
        type="button"
        className={clsx(
          'block focus:outline-none',
          router.asPath.split('/')[2] === href && 'text-yellow-400',
          addClasses
        )}
      >
        {children}
      </button>
    </Link>
  )
})

export default NavLink
