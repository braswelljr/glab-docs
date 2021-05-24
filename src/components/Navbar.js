import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { FaGithub, FaTwitter } from 'react-icons/fa'
import { HiSun, HiMoon } from 'react-icons/hi'
import { Switch } from '@headlessui/react'
import glab from '@/img/glab.png'
import Search from './Search'

const Navbar = ({ appName }) => {
  const ACTION_KEY_DEFAULT = ['Ctrl', 'Control', 'CONTROL']
  const ACTION_KEY_APPLE = ['⌘', 'Command']
  const [theme, setTheme] = useState(false)
  const [open, setOpen] = useState(false)
  const [actionKey, setActionKey] = useState(ACTION_KEY_DEFAULT)
  const router = useRouter()
  const searchButtonRef = useRef(null)
  const searchInputRef = useRef(null)

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      ;/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)
        ? setActionKey(ACTION_KEY_APPLE)
        : setActionKey(ACTION_KEY_DEFAULT)
    }
  }, [])

  useEffect(() => {
    function onKeyDown(e) {
      e.preventDefault()

      if (actionKey.map(k => e.key === k.toString()) && e.key === '/') {
        searchButtonRef.current.click()
        searchInputRef.current.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-10 grid grid-cols-2 gap-3 px-8 py-4 text-yellow-900 bg-white rounded-b shadow md:px-20 xl:px-40 lg:px-32 md:grid-cols-nav">
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer">
            <img src={glab} alt="glab icon" className="w-auto h-8" />
            <h1 className="text-xl font-semibold">{appName}</h1>
          </div>
        </Link>
        <div className="flex items-center justify-end space-x-3 text-yellow-500 md:col-start-3 md:row-start-1 md:col-end-4">
          <a href="https://twitter.com/glab_cli" target="_blank">
            <FaTwitter className="w-auto h-8 text-current transition-colors hover:text-yellow-300" />
          </a>
          <a href="https://github.com/profclems/glab" target="_blank">
            <FaGithub className="w-auto h-8 text-current transition-colors hover:text-yellow-300" />
          </a>

          {/* menu button */}
          <Switch
            checked={theme}
            onChange={setTheme}
            className="bg-yellow-500 relative inline-flex flex-shrink-0 h-[30px] w-[60px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={clsx(
                'pointer-events-none h-[26px] w-[26px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200 inline-flex items-center justify-center',
                { 'translate-x-7': theme }
              )}
            >
              {theme ? (
                <HiMoon className="w-auto h-4" />
              ) : (
                <HiSun className="w-auto h-4" />
              )}
            </span>
          </Switch>
        </div>
        <div className="flex flex-col space-y-5 lg:space-y-0 lg:items-center lg:flex-row-reverse col-span-full lg:col-start-2 lg:col-end-3">
          <div className="space-x-1 font-semibold lg:ml-2">
            <Link href="/docs">
              <a
                className={clsx('px-3 py-2 rounded cursor-pointer', {
                  'bg-yellow-200': router.pathname.split('/')[1] === 'docs'
                })}
              >
                Docs
              </a>
            </Link>
            <a
              href="https://opencollective.com/glab"
              target="_blank"
              className="px-3 py-2 rounded cursor-pointer"
            >
              Donate
            </a>
          </div>
          <button
            type="button"
            ref={searchButtonRef}
            className="flex w-full px-4 py-2 text-xs font-semibold bg-yellow-200 rounded md:text-base focus:outline-none"
            onClick={() => setOpen(true)}
          >
            <span>
              Search Docs (Press “
              <abbr title={actionKey[1]} className="no-underline">
                {actionKey[0]}
              </abbr>{' '}
              + /” to focus)
            </span>
          </button>
        </div>
      </nav>
      <Search open={open} setOpen={setOpen} searchInputRef={searchInputRef} />
    </>
  )
}

export default Navbar
