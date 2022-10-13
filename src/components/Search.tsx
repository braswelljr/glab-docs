import { useState, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { DocSearchModal, useDocSearchKeyboardEvents } from '@docsearch/react'
import LinkWithRef from '@/components/LinkWithRef'

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
              appId="R7G66ZFNS9"
              apiKey="eaa491a915e73056851c21e8cead8d59"
              indexName="glab"
              navigator={{
                navigate({ itemUrl }) {
                  setOpen(false)
                  router.push(itemUrl)
                }
              }}
              transformItems={items => {
                return items.map((item, index) => {
                  // We transform the absolute URL into a relative URL to
                  // leverage Next's preloading.
                  const a = document.createElement('a')
                  a.href = item.url

                  const hash = a.hash === '#content-wrapper' ? '' : a.hash

                  if (item.hierarchy?.lvl0) {
                    item.hierarchy.lvl0 = item.hierarchy.lvl0.replace(
                      /&amp;/g,
                      '&'
                    )
                  }

                  if (item._highlightResult?.hierarchy?.lvl0?.value) {
                    item._highlightResult.hierarchy.lvl0.value =
                      item._highlightResult.hierarchy.lvl0.value.replace(
                        /&amp;/g,
                        '&'
                      )
                  }

                  return {
                    ...item,
                    url: `${a.pathname}${hash}`,
                    __is_result: () => true,
                    __is_parent: () =>
                      item.type === 'lvl1' && items.length > 1 && index === 0,
                    __is_child: () =>
                      item.type !== 'lvl1' &&
                      items.length > 1 &&
                      items[0].type === 'lvl1' &&
                      index !== 0,
                    __is_first: () => index === 1,
                    __is_last: () => index === items.length - 1 && index !== 0
                  }
                })
              }}
              hitComponent={({ hit, children }) => {
                return (
                  <LinkWithRef href={hit.url} className={clsx({})}>
                    {children}
                  </LinkWithRef>
                )
              }}
            />,
            document.body
          )}
      </div>
    </>
  )
}

export default Search
