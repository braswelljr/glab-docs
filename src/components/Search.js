import { useState, useRef, useEffect } from 'react'
import { HiSearch } from 'react-icons/hi'
import useStore from '@/store/index'
import clsx from 'clsx'
import { documentation } from './nav/documentation'

const Search = ({ open, setOpen, searchInputRef }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const searchCloseRef = useRef()
  const theme = useStore(state => state.theme)
  const search = useStore(state => state.search)

  useEffect(() => {
    function onKeyClose(e) {
      if (e.which !== 27) {
        return
      }
      e.preventDefault()
      setSearchQuery('')
      searchCloseRef.current.click()
    }
    window.addEventListener('keydown', onKeyClose)
    return () => {
      window.removeEventListener('keydown', onKeyClose)
    }
  }, [])

  useEffect(() => {
    const handler = window.setTimeout(() => {
      search(documentation, searchQuery)
    }, 100)

    return () => {
      window.clearTimeout(handler)
    }
  }, [])

  return (
    <div
      className={clsx('inset-0 z-[11] fixed bg-opacity-50 w-full h-full', {
        hidden: !open,
        'bg-gray-400': theme,
        'bg-yellow-200': !theme
      })}
    >
      <button
        type="button"
        className={'absolute focus:outline-none inset-0 w-full h-full'}
        onClick={() => {
          setSearchQuery('')
          setOpen(false)
        }}
      ></button>
      <section
        className={clsx(
          `w-[90%] top-[15%] md:w-3/4 lg:w-7/12 relative rounded-xl px-4 md:px-8 py-5 min-h-[15vh] left-1/2 transform -translate-x-1/2
          ${theme ? 'bg-white' : 'bg-gray-800'}
        `
        )}
      >
        <form
          method="POST"
          className={`flex items-center relative w-full mx-auto ${
            theme ? 'text-yellow-900' : 'text-yellow-200'
          }`}
        >
          <label
            htmlFor="search-input"
            className="flex items-center flex-none p-1"
          >
            <span className="sr-only">Search Docs</span>
            <HiSearch className="relative block w-auto h-6 opacity-70 -mr-9" />
          </label>
          <div className="flex w-full mx-auto">
            <input
              type="text"
              id="search-input"
              autoComplete="off"
              ref={searchInputRef}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search Docs"
              className={`flex-auto w-full px-7 py-2 text-base leading-6 text-current border-b border-yellow-100 focus:border-yellow-100 focus:outline-none ${
                theme
                  ? 'placeholder-yellow-900'
                  : 'placeholder-yellow-200 bg-gray-800'
              }
              `}
            />
            <button
              ref={searchCloseRef}
              type="button"
              className="relative p-1 -ml-6 text-xs font-black text-yellow-900 bg-yellow-200 rounded focus:outline-none"
              onClick={() => {
                setSearchQuery('')
                setOpen(false)
              }}
            >
              Esc
            </button>
          </div>
        </form>
        <div className="break-words">{searchQuery}</div>
      </section>
    </div>
  )
}

export default Search
