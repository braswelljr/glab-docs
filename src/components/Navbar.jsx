import { useState, useRef, useEffect, useMemo } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { FaGithub, FaTwitter } from 'react-icons/fa'
import { HiSun, HiMoon } from 'react-icons/hi'
import { Switch } from '@headlessui/react'
import Search from './Search'
import useStore from '@/store/index'

const Navbar = ({ appName, appId }) => {
  const ACTION_KEY_DEFAULT = useMemo(
    () => ['Ctrl', 'Control', 'CONTROL'].map(key => key),
    []
  )
  const ACTION_KEY_APPLE = useMemo(() => ['⌘', 'Command'].map(key => key), [])
  const [open, setOpen] = useState(false)
  const [actionKey, setActionKey] = useState(ACTION_KEY_DEFAULT)
  const router = useRouter()
  const searchButtonRef = useRef()
  const searchInputRef = useRef()
  const theme = useStore(state => state.theme)
  const setDark = useStore(state => state.themeDark)
  const setLight = useStore(state => state.themeLight)
  const [enabled, setEnabled] = useState(false)

  // checking for platform
  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      ;/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)
        ? setActionKey(ACTION_KEY_APPLE)
        : setActionKey(ACTION_KEY_DEFAULT)
    }
  }, [ACTION_KEY_APPLE, ACTION_KEY_DEFAULT])

  // setting check action
  useEffect(() => {
    function onKeyDown(e) {
      if (actionKey.map(k => e.key === k.toString()) && e.key === '/') {
        e.preventDefault()
        searchButtonRef.current.click()
      }
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
          'fixed inset-x-0 top-0 z-10 grid grid-cols-[auto,auto] gap-3 px-8 py-4 shadow md:grid-cols-nav md:px-16 lg:px-28 xl:px-36',
          {
            'bg-white text-yellow-900': theme,
            'border-b-[0.5px] border-current bg-neutral-900 text-yellow-200':
              theme === 'light'
          }
        )}
      >
        <div className="">
          <Link href="/">
            <a className="space-x- inline-flex w-auto items-center">
              <img
                src={require('@/img/glab.png')}
                alt="glab icon"
                className="inline h-8 w-auto"
              />
              <h1 className="inline w-auto text-xl font-semibold">{appName}</h1>
            </a>
          </Link>
        </div>
        <div
          className={clsx(
            'flex items-center justify-end space-x-3 md:col-start-3 md:col-end-4 md:row-start-1',
            {
              'text-yellow-900': theme === 'dark',
              'text-yellow-200': theme === 'light'
            }
          )}
        >
          <a href="https://twitter.com/glab_cli" target="_blank">
            <FaTwitter className="h-8 w-auto text-current transition-colors" />
          </a>
          <a href="https://github.com/profclems/glab" target="_blank">
            <FaGithub className="h-8 w-auto text-current transition-colors" />
          </a>

          {/* menu button */}
          <Switch
            checked={enabled}
            onChange={() => {
              setEnabled(!enabled)
              if (theme !== 'light') {
                setLight()
                localStorage.setItem(appId, 'light')
              } else {
                setDark()
                localStorage.setItem(appId, 'dark')
              }
            }}
            className={clsx(
              'relative inline-flex h-[30px] w-[60px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75',
              {
                'bg-yellow-900': theme === 'dark',
                'bg-yellow-200': theme === 'light'
              }
            )}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={clsx(
                'pointer-events-none inline-flex h-[26px] w-[26px] transform items-center justify-center rounded-full shadow-lg ring-0 transition duration-200 ease-in-out',
                {
                  'translate-x-7 bg-neutral-900': theme === 'light',
                  'bg-white': theme === 'dark'
                }
              )}
            >
              {theme === 'light' ? (
                <HiMoon className="h-4 w-auto" />
              ) : (
                <HiSun className="h-4 w-auto" />
              )}
            </span>
          </Switch>
        </div>
        <div className="col-span-full flex flex-col space-y-5 lg:col-start-2 lg:col-end-3 lg:flex-row-reverse lg:items-center lg:space-y-0">
          <div className="space-x-1 font-semibold lg:ml-2">
            <Link href="/docs">
              <a
                className={clsx('cursor-pointer rounded px-3 py-2', {
                  'bg-yellow-200': router.pathname.split('/')[1] === 'docs',
                  'text-yellow-900':
                    theme === 'light' &&
                    router.pathname.split('/')[1] === 'docs'
                })}
              >
                Docs
              </a>
            </Link>
            <a
              href="https://opencollective.com/glab"
              target="_blank"
              className="cursor-pointer rounded px-3 py-2"
            >
              Donate
            </a>
          </div>
          <button
            type="button"
            ref={searchButtonRef}
            className={clsx(
              'block w-full rounded bg-yellow-200 px-4 py-2 text-xs font-semibold focus:outline-none sm:text-sm md:text-base',
              {
                'text-yellow-900': theme === 'light'
              }
            )}
            onClick={() => setOpen(true)}
          >
            Search Docs (Press “
            <abbr title={actionKey[1]} className="no-underline">
              {actionKey[0]}
            </abbr>{' '}
            + /” to focus)
          </button>
        </div>
      </nav>
      <Search open={open} setOpen={setOpen} searchInputRef={searchInputRef} />
    </>
  )
}

export default Navbar
