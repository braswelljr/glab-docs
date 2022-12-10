import { forwardRef, ReactNode } from 'react'
import Link, { LinkProps } from 'next/link'

interface LinkWithRefType extends LinkProps {
  children?: ReactNode
  className?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

/**
 * LinkWithRef - A wrapper around next/link that adds a ref to the anchor tag
 * @param {LinkWithRefType} props
 * @property {string} href - The href of the link
 * @property {string} as - The as of the link
 * @property {string} className - The className of the link
 * @property {function} onClick - The onClick handler of the link
 * @property {ReactNode} children - The children of the link
 *
 * @returns {JSX.Element} - A link with a ref to the anchor tag
 */
const LinkWithRef = forwardRef<HTMLAnchorElement, LinkWithRefType>(
  ({ children, className, as, href, replace, shallow, onClick }, ref) => (
    <Link
      href={href}
      ref={ref}
      className={className}
      as={as}
      passHref
      replace={replace}
      shallow={shallow}
      onClick={onClick}
    >
      {children ?? ``}
    </Link>
  )
)

export default LinkWithRef
