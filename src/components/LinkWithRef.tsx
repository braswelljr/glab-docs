import { forwardRef, ReactNode } from 'react'
import Link, { LinkProps } from 'next/link'

type hrefType = string | { pathname: string; query?: { slug: string } }

interface LinkWithRefType {
  children?: ReactNode
  className?: string
  href?: hrefType
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

/**
 * LinkWithRef - A wrapper around next/link that adds a ref to the anchor tag
 * @param {LinkWithRefType} props
 * @returns {JSX.Element}
 */
const LinkWithRef = forwardRef<HTMLAnchorElement, LinkWithRefType & LinkProps>(
  ({ children, className, href, onClick }, ref) => (
    <Link href={href} passHref>
      <a
        ref={ref}
        className={className}
        onClick={() => {
          onClick &&
            (document.documentElement.scrollTop = 0) &&
            (document.body.scrollTop = 0)
        }}
      >
        {children ?? ``}
      </a>
    </Link>
  )
)

export default LinkWithRef
