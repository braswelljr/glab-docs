import { useRef } from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import useStore from '@/store/index'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayout'

const DocsLayout = ({ children }) => {
  const theme = useStore(state => state.theme)
  const containerRef = useRef(null)
  const router = useRouter()

  useIsomorphicLayoutEffect(() => {
    containerRef.current.scrollTo(0, 0)
  }, [router.pathname])

  return (
    <section
      ref={containerRef}
      className={clsx(
        'scrollbars-hidden prose overflow-y-auto py-8 font-semibold lg:px-5',
        {
          'text-neutral-900': theme === 'dark'
        }
      )}
    >
      {children}
    </section>
  )
}

export default DocsLayout
