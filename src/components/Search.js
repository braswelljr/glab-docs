import { useRef, useEffect } from 'react'
import clsx from 'clsx'
import { HiSearch } from 'react-icons/hi'
import useStore from '@/store/index'

const Search = ({ open, setOpen, searchInputRef }) => {
  const searchCloseRef = useRef(null)
  const theme = useStore(state => state.theme)

  useEffect(() => {
    function onKeyClose(e) {
      e.preventDefault()

      if (e.which == 27) {
        searchCloseRef.current.click()
      }
    }
    window.addEventListener('keydown', onKeyClose)
    return () => {
      window.removeEventListener('keydown', onKeyClose)
    }
  }, [])

  return (
    <div
      className={clsx(
        'inset-0 z-[11] fixed justify-center bg-opacity-80 transition-all w-full h-full',
        {
          ' hidden': !open,
          'bg-gray-400': theme,
          'bg-yellow-200': !theme
        }
      )}
    >
      <button
        type="button"
        className={clsx('absolute focus:outline-none inset-0 w-full h-full')}
        onClick={() => setOpen(false)}
      ></button>
      <section
        className={clsx(
          'w-5/6 md:w-3/4 lg:w-7/12 shadow rounded-xl transform absolute top-28 left-1/2 -translate-x-1/2 px-4 md:px-8 py-5 min-h-[20vh]',
          { 'bg-white': theme, 'bg-gray-900': !theme }
        )}
      >
        <form
          method="post"
          className={clsx('flex items-center w-full', {
            'text-yellow-900': theme,
            'text-yellow-200': !theme
          })}
        >
          <HiSearch className="relative block w-auto h-6 opacity-70 -mr-9" />
          <input
            ref={searchInputRef}
            type="text"
            name="search"
            id="search-input"
            autoComplete="off"
            placeholder="Search Docs"
            className={clsx(
              'flex-1 w-full px-12 py-2 text-base leading-6 text-current placeholder-yellow-100 border-b border-yellow-100 rounded focus:border-yellow-100 focus:outline-none',
              {
                'placeholder-yellow-400': theme,
                'placeholder-yellow-100 bg-gray-900': !theme
              }
            )}
          />
          <button
            ref={searchCloseRef}
            type="button"
            className="relative block px-1 py-0.5 rounded-lg text-yellow-900 bg-yellow-200 focus:outline-none -ml-10"
            onClick={() => setOpen(false)}
          >
            Esc
          </button>
        </form>
      </section>
    </div>
  )
}

export default Search
