import { ReactNode, useRef } from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayout'
import { MDXProvider } from '@mdx-js/react'
import Prism from 'prismjs'

const DocsLayout = ({
  children,
  className
}: {
  children?: ReactNode
  className?: string
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useIsomorphicLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current?.scrollTo(0, 0)
    }
  }, [router.pathname])

  useIsomorphicLayoutEffect(() => {
    Prism.highlightAll()
  }, [])

  // scrollbars-hidden

  return (
    <section
      ref={containerRef}
      className={clsx(
        'prose max-w-none overflow-y-auto pt-8 font-semibold prose-a:text-cyan-800 prose-strong:font-black prose-strong:text-cyan-600 prose-code:font-sans prose-code:text-yellow-600 dark:text-yellow-200 dark:prose-h1:text-yellow-500 dark:prose-h2:text-yellow-400 dark:prose-h3:text-yellow-300 dark:prose-a:text-cyan-500 dark:prose-a:hover:text-cyan-600 dark:prose-a:focus:text-cyan-800 dark:prose-a:active:text-cyan-700 dark:prose-code:text-yellow-400 lg:px-5',
        className
      )}
    >
      <MDXProvider>{children}</MDXProvider>
    </section>
  )
}

export default DocsLayout
