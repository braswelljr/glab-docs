import { forwardRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'

const NavLink = forwardRef(({ children, href, className }, linkRef) => {
  const router = useRouter()

  return (
    <Link href={`${encodeURI(`/docs/${href}`)}`} ref={linkRef}>
      <a
        className={clsx('block rounded', className, {
          'bg-yellow-200 text-yellow-800': router.asPath.split('/')[2] === href
        })}
      >
        {children}
      </a>
    </Link>
  )
})

export default NavLink
