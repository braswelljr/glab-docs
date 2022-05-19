import { forwardRef } from 'react'
import Link from 'next/link'

const LinkWithRef = forwardRef(
  ({ children = '', className, href, onClick }, ref) => (
    <Link href={href} passHref>
      <a ref={ref} className={className} onClick={onClick}>
        {children}
      </a>
    </Link>
  )
)

export default LinkWithRef
