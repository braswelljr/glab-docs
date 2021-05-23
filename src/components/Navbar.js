import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { FaGithub, FaTwitter, FaMoon, FaSun } from 'react-icons/fa'
import { Switch } from '@headlessui/react'
import glab from '@/img/glab.png'

const Navbar = ({ appName }) => {
  const [open, setOpen] = useState(false)
  const searchInputRef = useRef()
  const router = useRouter()

  useEffect(() => {
    function onKeyDown(e) {
      if (
        e.key !== '/' ||
        e.target.tagName === 'INPUT' ||
        e.target.tagName === 'SELECT' ||
        e.target.tagName === 'TEXTAREA' ||
        e.target.isContentEditable
      ) {
        return
      }
      e.preventDefault()
      searchInputRef.current.focus()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return (
    <nav className="fixed inset-x-0 top-0 z-10 grid grid-cols-2 gap-3 px-8 py-4 bg-white rounded-b shadow md:px-20 xl:px-40 lg:px-32 md:grid-cols-nav">
      <Link href="/">
        <div className="flex items-center space-x-2 cursor-pointer">
          <img src={glab} alt="glab icon" className="w-auto h-8" />
          <h1 className="text-xl font-semibold">{appName}</h1>
        </div>
      </Link>
      <div className="flex items-center justify-end space-x-3 md:col-start-3 md:row-start-1 md:col-end-4">
        <a href="https://twitter.com/glab_cli" target="_blank">
          <FaTwitter className="w-auto h-8 text-current hover:text-yellow-600" />
        </a>
        <a href="https://github.com/profclems/glab" target="_blank">
          <FaGithub className="w-auto h-8 text-current hover:text-yellow-600" />
        </a>

        {/* menu button */}
        <Switch
          checked={open}
          onChange={setOpen}
          className="bg-current relative inline-flex flex-shrink-0 h-[30px] w-[60px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${open ? 'translate-x-7' : 'translate-x-0'}
            pointer-events-none h-[26px] w-[26px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200 inline-flex items-center justify-center`}
          >
            {open ? (
              <FaMoon className="w-auto h-4" />
            ) : (
              <FaSun className="w-auto h-4" />
            )}
          </span>
        </Switch>
      </div>
      <div className="flex flex-col space-y-3 md:space-y-0 md:items-center md:flex-row-reverse col-span-full md:col-start-2 md:col-end-3">
        <div className="space-x-1 font-semibold md:ml-2">
          <Link href="/docs">
            <a
              className={clsx(
                'p-3 rounded cursor-pointer hover:bg-gray-200',
                router.asPath.split('/')[1] === 'docs' && 'text-yellow-400'
              )}
            >
              Docs
            </a>
          </Link>
          <a
            href="https://opencollective.com/glab"
            target="_blank"
            className="p-3 rounded cursor-pointer hover:bg-gray-200"
          >
            Donate
          </a>
        </div>
        <form method="post" className="w-full">
          <input
            ref={searchInputRef}
            type="text"
            name="search"
            id="search-input"
            autoComplete="off"
            placeholder="Search Docs (Press “/” to focus)"
            className="w-full px-3 py-2 text-base leading-6 text-current placeholder-gray-500 border rounded-md md:col-start-1 md:col-end-4 focus:ring focus:ring-opacity-30 focus:outline-none focus:placeholder-gray-400 focus:ring-gray-300"
          />
        </form>
      </div>
    </nav>
  )
}

export default Navbar
