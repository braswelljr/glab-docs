import React from 'react'
import clsx from 'clsx'
import { usePrevNext } from '@/hooks/usePrevNext'
import { documentation } from '@/components/nav/documentation'
import { toArray } from '@/utils/toArray'
import Link from 'next/link'
import { flattenArray } from '@/utils/flattenArray'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import useStore from '@/store/index'
import { useRouter } from 'next/router'

const PrevNext = () => {
  const setPageStruct = useStore(state => state.setPageStruct)
  const router = useRouter()
  const theme = useStore(state => state.theme)

  function PageLayoutLoader() {
    Object.entries(documentation).map(([category, categoryItems]) => {
      toArray(categoryItems).map(item => {
        if (
          router.pathname.split('/')[2] === category.toLowerCase() &&
          router.pathname.split('/')[3] ===
            (Array.isArray(item) ? item[0] : item)
        ) {
          setPageStruct(item)
        }
      })
    })
  }

  const pages = flattenArray(
    Object.values(documentation).map(categoryItems =>
      toArray(categoryItems).map(item => (Array.isArray(item) ? item[0] : item))
    )
  )

  const paths = flattenArray(
    Object.entries(documentation).map(([category, categoryItems]) =>
      toArray(categoryItems).map(
        item =>
          `/docs/${category.toLowerCase()}/${
            Array.isArray(item) ? item[0] : item
          }`
      )
    )
  )

  let l = pages.length

  return (
    <div className="relative mt-10 mb-28">
      {typeof usePrevNext().prev === 'undefined' || usePrevNext().prev < 0 ? (
        <></>
      ) : (
        <Link
          href={
            pages[usePrevNext().prev] === 'introduction'
              ? '/docs'
              : paths[usePrevNext().prev]
          }
        >
          <button
            type="button"
            tabIndex={-1}
            className={clsx(
              'py-2 px-4 bg-yellow-200 font-extrabold rounded-lg absolute left-0 w-[45%]',
              {
                'text-gray-800': theme === 'light'
              }
            )}
            onClick={() => PageLayoutLoader()}
          >
            <div className="text-xs text-right text-gray-500">previous</div>
            <div className="flex items-center justify-between uppercase">
              <HiChevronLeft className="w-auto h-5" />
              <span className="">{pages[usePrevNext().prev]}</span>
            </div>
          </button>
        </Link>
      )}

      {typeof usePrevNext().next === 'undefined' || usePrevNext().next >= l ? (
        <></>
      ) : (
        <Link
          href={
            pages[usePrevNext().next] === 'introduction'
              ? '/docs'
              : paths[usePrevNext().next]
          }
        >
          <button
            type="button"
            tabIndex={-1}
            className={clsx(
              'py-2 px-4 bg-yellow-200 font-extrabold rounded-lg absolute right-0 w-[45%]',
              {
                'text-gray-800': theme === 'light'
              }
            )}
            onClick={() => PageLayoutLoader()}
          >
            <div className="text-xs text-left text-gray-500">next</div>
            <div className="flex items-center justify-between uppercase">
              <span className="">{pages[usePrevNext().next]}</span>
              <HiChevronRight className="w-auto h-5" />
            </div>
          </button>
        </Link>
      )}
    </div>
  )
}

export default PrevNext
