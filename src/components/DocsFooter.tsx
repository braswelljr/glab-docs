import clsx from 'clsx'
import { useRouter } from 'next/router'
import { FaGithub } from 'react-icons/fa'

const DocsFooter = ({ className }: { className?: string }) => {
  const router = useRouter()

  return (
    <footer
      className={clsx(
        'mt-5 justify-between space-y-4 border-t border-neutral-800/50 pt-8 pb-14 text-base dark:border-yellow-200/50 sm:flex sm:space-y-0',
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
          target="_blank"
          rel="noreferrer"
          className="inline-flex space-x-1.5 font-semibold no-underline hover:text-neutral-900 dark:hover:text-neutral-600"
        >
          <FaGithub className="h-6 w-auto" />
          <span>Edit this page on GitHub</span>
        </a>
      </div>
    </footer>
  )
}

export default DocsFooter
