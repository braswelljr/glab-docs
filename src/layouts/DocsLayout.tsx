import { useRef } from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayout'

const DocsLayout = ({
  children
}: {
  children: JSX.Element | JSX.Element[]
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useIsomorphicLayoutEffect(() => {
    containerRef.current?.scrollTo(0, 0)
  }, [router.pathname])

  return (
    <section
      ref={containerRef}
      className={clsx(
        'scrollbars-hidden prose overflow-y-auto py-8 font-semibold dark:text-yellow-200 dark:prose-h1:text-yellow-500 dark:prose-h2:text-yellow-400 dark:prose-h3:text-yellow-300 lg:px-5'
      )}
    >
      {children}
    </section>
  )
}

export default DocsLayout
