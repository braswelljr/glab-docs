import clsx from 'clsx'
import { useRouter } from 'next/router'
import { FaGithub } from 'react-icons/fa'

const DocsFooter = ({ className }: { className?: string }) => {
  const router = useRouter()

  return (
    <footer
      className={clsx(
        'mt-5 justify-between space-y-2 border-t border-neutral-800/50 pt-8 pb-14 text-sm dark:border-yellow-200/50 sm:flex sm:space-y-0',
        className
      )}
    >
      <div className="">
        <span>&copy; Copyright {new Date().getFullYear()}, GLab.</span>
      </div>
      <div className="">
        <a
          href={`https://github.com/braswelljr/glab-docs/edit/main/src/pages${
            router.pathname === '/docs' ? `/docs/index` : router.pathname
          }.mdx`}
          className="inline-flex space-x-1 font-semibold no-underline hover:text-neutral-900 dark:hover:text-neutral-600"
        >
          <span>Edit this page on GitHub</span>
          <FaGithub className="h-4 w-auto" />
        </a>
      </div>
    </footer>
  )
}

export default DocsFooter
