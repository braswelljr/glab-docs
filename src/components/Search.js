import { useState, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import useStore from '@/store/index'
import Link from 'next/link'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { DocSearchModal, useDocSearchKeyboardEvents } from '@docsearch/react'

function Hit({ hit, children }) {
  return (
    <Link href={hit.url}>
      <a>{children}</a>
    </Link>
  )
}

const Search = ({ open, setOpen, searchInputRef }) => {
  const [searchQuery, setSearchQuery] = useState(null)
  const theme = useStore(state => state.theme)
  const router = useRouter()

  const onOpen = useCallback(() => {
    setOpen(true)
  }, [setOpen])

  const onClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  const onInput = useCallback(
    e => {
      setOpen(true)
      setSearchQuery(e.key)
    },
    [setOpen, searchQuery]
  )

  useEffect(() => {
    function onKeyClose(e) {
      if (e.which !== 27) {
        return
      }
      e.preventDefault()
      setSearchQuery(null)
      onClose()
    }
    window.addEventListener('keydown', onKeyClose)
    return () => {
      window.removeEventListener('keydown', onKeyClose)
    }
  }, [])

  useDocSearchKeyboardEvents({
    open,
    onOpen,
    onClose,
    onInput,
    searchInputRef
  })

  return (
    <>
      <div
        id="search-body"
        className={clsx('inset-0 z-[11] fixed bg-opacity-50 w-full h-full', {
          hidden: !open,
          'bg-gray-400': theme,
          'bg-yellow-200': !theme
        })}
      >
        {open &&
          createPortal(
            <DocSearchModal
              initialQuery={searchQuery}
              initialScrollY={window.scrollY}
              onClose={onClose}
              apiKey="25626fae796133dc1e734c6bcaaeac3c"
              indexName="docsearch"
              navigator={{
                navigate({ suggestionUrl }) {
                  setOpen(false)
                  router.push(suggestionUrl)
                }
              }}
              hitComponent={Hit}
              transformItems={items => {
                return items.map(item => {
                  // We transform the absolute URL into a relative URL to
                  // leverage Next's preloading.
                  const a = document.createElement('a')
                  a.href = item.url

                  const hash = a.hash === '#content-wrapper' ? '' : a.hash

                  return {
                    ...item,
                    url: `${a.pathname}${hash}`
                  }
                })
              }}
            />,
            document.body
          )}
      </div>
    </>
  )
}

export default Search
