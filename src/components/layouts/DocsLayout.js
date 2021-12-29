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
        'py-8 lg:px-5 overflow-y-auto scrollbar-hidden scrollbar-hidden-f prose font-semibold',
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
