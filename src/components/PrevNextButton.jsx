import { forwardRef } from 'react'
import useStore from '@/store/index'
import Link from 'next/link'
import clsx from 'clsx'

const PrevNextButton = forwardRef(
  ({ children, href, className, onClick = () => {} }, linkRef) => {
    const theme = useStore(state => state.theme)

    return (
      <Link href={encodeURI(href)} ref={linkRef} passHref>
        <button
          type="button"
          tabIndex={-1}
          className={clsx(
            'absolute w-[45%] rounded-lg bg-yellow-200 py-2 px-4 font-extrabold',
            className,
            {
              'text-neutral-800': theme === 'light'
            }
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
  }
)

export default PrevNextButton
