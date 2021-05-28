import { useState, useRef, useEffect } from 'react'
import { HiSearch } from 'react-icons/hi'
import useStore from '@/store/index'

const Search = ({ open, setOpen, searchInputRef }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const searchCloseRef = useRef()
  const theme = useStore(state => state.theme)
  const query = useStore(state => state.query)

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

  return (
    <div
      className={`inset-0 z-[11] fixed justify-center bg-opacity-50 transition-all w-full h-full ${
        theme ? 'bg-gray-400' : 'bg-yellow-200'
      } ${!open ? 'hidden' : ''}
      `}
    >
      <button
        type="button"
        className={'absolute focus:outline-none inset-0 w-full h-full'}
        onClick={() => setOpen(false)}
      ></button>
      <section
        className={`w-[90%] md:w-3/4 lg:w-7/12 shadow rounded-xl transform absolute top-28 left-1/2 -translate-x-1/2 px-4 md:px-8 py-5 min-h-[20vh]
          ${theme ? 'bg-white' : 'bg-gray-800'}
        `}
      >
        <div
          className={`flex items-center w-full mx-auto ${
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
              className={`flex-auto w-full px-7 py-2 text-base leading-6 text-current placeholder-yellow-100 border-b border-yellow-100 focus:border-yellow-100 focus:outline-none ${
                theme
                  ? 'placeholder-yellow-400'
                  : 'placeholder-yellow-10 bg-gray-800'
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
        </div>
      </section>
    </div>
  )
}

export default Search
