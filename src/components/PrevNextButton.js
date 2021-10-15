import { forwardRef } from 'react'
import useStore from '@/store/index'
import Link from 'next/link'
import clsx from 'clsx'

const PrevNextButton = forwardRef(
  ({ children, href, className, onClick = () => {} }, linkRef) => {
    const theme = useStore(state => state.theme)

    return (
      <Link href={encodeURI(href)} ref={linkRef}>
        <button
          type="button"
          tabIndex={-1}
          className={clsx(
            'py-2 px-4 bg-yellow-200 font-extrabold rounded-lg absolute w-[45%]',
            className,
            {
              'text-gray-800': theme === 'light'
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
