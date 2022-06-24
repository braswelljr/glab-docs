import { useState, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { DocSearchModal, useDocSearchKeyboardEvents } from '@docsearch/react'

const Search = ({
  open,
  setOpen,
  searchInputRef
}: {
  open: boolean
  setOpen: (open: boolean) => void
  searchInputRef: any
}) => {
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined)
  const router = useRouter()

  const onOpen = useCallback(() => {
    setOpen(true)
  }, [setOpen])

  const onClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  const onInput = useCallback(
    (e: KeyboardEvent) => {
      setOpen(true)
      setSearchQuery(e.key)
    },
    [setOpen]
  )

  useEffect(() => {
    function onKeyClose(e: KeyboardEvent) {
      if (e.which !== 27) {
        return
      }
      e.preventDefault()
      setSearchQuery(undefined)
      onClose()
    }
    window.addEventListener('keydown', onKeyClose)
    return () => {
      window.removeEventListener('keydown', onKeyClose)
    }
  }, [setSearchQuery, onClose])

  useDocSearchKeyboardEvents({
    isOpen: open,
    onOpen,
    onClose,
    onInput,
    searchButtonRef: searchInputRef
  })

  return (
    <>
      <div
        id="search-body"
        className={clsx(
          'fixed inset-0 z-[11] h-full w-full bg-neutral-500/80',
          {
            hidden: !open
          }
        )}
      >
        {open &&
          createPortal(
            <DocSearchModal
              initialQuery={searchQuery}
              initialScrollY={window.scrollY}
              onClose={onClose}
              appId="BH4D9OD16A"
              apiKey="66cb338ddd0c4cce7d12b456c59390a6"
              indexName="glab"
              navigator={{
                navigate({ itemUrl }) {
                  setOpen(false)
                  router.push(itemUrl)
                }
              }}
              hitComponent={({ hit, children }) => {
                return (
                  <Link href={hit.url}>
                    <a>{children}</a>
                  </Link>
                )
              }}
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
