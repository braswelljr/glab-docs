import { useState, useRef, useEffect, useMemo } from 'react'
import LinkWithRef from '@/components/LinkWithRef'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { FaGithub, FaTwitter } from 'react-icons/fa'
import { HiSun, HiMoon, HiDesktopComputer, HiMenu, HiX } from 'react-icons/hi'
import { motion } from 'framer-motion'
import Search from '@/components/Search'
import useTheme from '@/hooks/useTheme'

const Navbar = ({
  doc,
  setDoc,
  setPageList
}: {
  doc: boolean
  setDoc: (doc: boolean) => void
  setPageList: (pageList: boolean) => void
}) => {
  const ACTION_KEY_DEFAULT = useMemo(
    () => ['Ctrl', 'Control', 'CONTROL'].map(key => key),
    []
  )
  const ACTION_KEY_APPLE = useMemo(
    () => ['⌘', 'Command', 'COMMAND'].map(key => key),
    []
  )
  const [open, setOpen] = useState(false)
  const [actionKey, setActionKey] = useState(ACTION_KEY_DEFAULT)
  const router = useRouter()
  const searchButtonRef = useRef<HTMLButtonElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [theme, setTheme] = useTheme()

  // checking for platform
  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform))
        setActionKey(ACTION_KEY_APPLE)
      else setActionKey(ACTION_KEY_DEFAULT)
    }
  }, [ACTION_KEY_APPLE, ACTION_KEY_DEFAULT])

  // setting check action
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (
        actionKey.map(k => e.key === k.toString()) &&
        (e.key !== '/' ||
          (e.target as HTMLElement).tagName === 'INPUT' ||
          (e.target as HTMLElement).tagName === 'SELECT' ||
          (e.target as HTMLElement).tagName === 'TEXTAREA' ||
          (e.target as HTMLElement).isContentEditable)
      ) {
        return
      }
      e.preventDefault()
      searchInputRef.current?.focus()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [actionKey])

  return (
    <>
      <nav
        className={clsx(
          'fixed inset-x-0 top-0 z-10 grid grid-cols-[auto,auto] gap-3 border-b-[0.5px] border-current bg-white px-4 py-4 text-yellow-800 shadow dark:bg-neutral-900 dark:text-yellow-200 md:grid-cols-nav md:px-10 lg:px-16 xl:px-28'
        )}
      >
        <div className="flex items-center">
          <LinkWithRef href="/">
            <span className="inline-flex w-auto items-center">
              <img
                src={require('@/img/glab.png')}
                alt="glab icon"
                className="inline h-8 w-auto"
              />
              <h1 className="inline w-auto text-xl font-black">GLab</h1>
            </span>
          </LinkWithRef>
        </div>
        <div
          className={clsx(
            'flex items-center justify-end space-x-4 text-yellow-200 dark:text-yellow-800 md:col-start-3 md:col-end-4 md:row-start-1'
          )}
        >
          {/* menu button */}
          <motion.ul className={clsx('flex items-center')}>
            {Object.entries({
              system: (
                <HiDesktopComputer className={clsx('h-5 w-auto sm:h-6')} />
              ),
              dark: <HiMoon className={clsx('h-5 w-auto sm:h-6')} />,
              light: <HiSun className={clsx('h-5 w-auto sm:h-6')} />
            }).map(([key, value], i, self) => {
              return (
                <motion.li
                  key={key}
                  className={clsx(
                    'relative block cursor-pointer p-1.5 text-brown-800 dark:text-yellow-200'
                  )}
                  onClick={() => setTheme(key)}
                >
                  {key === theme && (
                    <motion.div
                      layoutId="themeLayoutId"
                      className={clsx(
                        'absolute inset-0 bg-brown-800/30 dark:bg-yellow-200/30',
                        i === 0 && 'rounded-l-md',
                        i === self.length - 1 && 'rounded-r-md'
                      )}
                    />
                  )}
                  <span className={clsx('relative z-[1] block h-full w-full')}>
                    {value}
                  </span>
                </motion.li>
              )
            })}
          </motion.ul>
        </div>
        <div className="col-span-full flex flex-col justify-between space-y-3 lg:col-start-2 lg:col-end-3 lg:flex-row-reverse lg:items-center lg:space-y-0">
          <div className="flex items-center justify-between">
            <div className="space-x-1 font-semibold lg:ml-2">
              <LinkWithRef
                href="/docs"
                className={clsx(
                  'cursor-pointer rounded px-3 py-2 text-sm hover:bg-yellow-200/20',
                  {
                    'bg-yellow-200 dark:text-yellow-800':
                      router.pathname.split('/')[1] === 'docs'
                  }
                )}
              >
                Docs
              </LinkWithRef>
              <a
                href="https://opencollective.com/glab"
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer rounded px-3 py-2 text-sm hover:bg-yellow-200/20"
              >
                Donate
              </a>
            </div>
            {/* menu button */}
            {router.pathname !== '/' && (
              <button
                type="button"
                tabIndex={-1}
                className={clsx(
                  'relative h-8 w-8 overflow-hidden rounded-md border-0 p-2 focus:outline-none lg:hidden'
                )}
                onClick={() => {
                  setDoc(!doc)
                  setPageList(false)
                }}
              >
                <HiMenu
                  className={clsx(
                    'absolute top-1/2 right-1/2 h-auto w-6 -translate-y-1/2 transform text-brown-800 transition-all dark:text-yellow-200',
                    doc ? '-translate-x-1/2 scale-50' : 'translate-x-1/2'
                  )}
                />
                <HiX
                  className={clsx(
                    'absolute top-1/2 left-1/2 h-auto w-6 -translate-y-1/2 transform text-brown-800 transition-all dark:text-yellow-200',
                    doc ? '-translate-x-1/2' : 'translate-x-1/2 scale-50'
                  )}
                />
              </button>
            )}
          </div>
          <div className={'flex items-center space-x-3 lg:min-w-[70%]'}>
            {/* Search */}
            <button
              type="button"
              ref={searchButtonRef}
              className={clsx(
                'block w-full rounded bg-yellow-200 px-4 py-2 text-xs font-semibold focus:outline-none dark:text-brown-900 md:py-3 xl:text-sm [@media_(max-width:393px)]:[font-size:0.65rem]'
              )}
              onClick={() => setOpen(true)}
            >
              Search Docs{' '}
              <span className={'[@media_(max-width:348px)]:hidden'}>
                (Press “
                <abbr title={actionKey[1]} className="no-underline">
                  {actionKey[0]}
                </abbr>{' '}
                + /” to focus)
              </span>
            </button>
            {/* Github and Twitter */}
            <div className=" flex items-center hover:text-yellow-200/20 sm:space-x-2">
              <a
                href="https://twitter.com/glab_cli"
                target="_blank"
                rel="noreferrer"
                className={'hidden sm:inline'}
              >
                <FaTwitter className="h-6 w-auto text-brown-800 transition-colors dark:text-yellow-200 sm:h-7" />
              </a>
              <a
                href="https://github.com/profclems/glab"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub className="h-6 w-auto text-brown-800 transition-colors dark:text-yellow-200 sm:h-7" />
              </a>
            </div>
          </div>
        </div>
      </nav>
      <Search open={open} setOpen={setOpen} searchInputRef={searchInputRef} />
    </>
  )
}

export default Navbar
