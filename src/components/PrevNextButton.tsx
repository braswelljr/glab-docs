import { forwardRef, ReactNode } from 'react'
import Link, { LinkProps } from 'next/link'
import clsx from 'clsx'

// type hrefType = string | { pathname: string; query?: { slug: string } }

interface PrevNextButtonRef {
  children?: ReactNode
  href: string
  className?: string
  onClick?: () => void
}

const PrevNextButton = forwardRef<
  HTMLAnchorElement,
  PrevNextButtonRef & LinkProps
>(({ children, href, className, onClick = () => {} }, linkRef) => {
  return (
    <Link href={encodeURI(href)} ref={linkRef} passHref>
      <button
        type="button"
        tabIndex={-1}
        className={clsx(
          'absolute w-[42.5%] rounded bg-yellow-200 py-1.5 px-2 font-extrabold dark:text-neutral-800',
          className
        )}
        onClick={() => {
          ;(document.documentElement.scrollTop = 0) &&
            (document.body.scrollTop = 0)
          onClick()
        }}
      >
        {children}
      </button>
    </Link>
  )
})

export default PrevNextButton
