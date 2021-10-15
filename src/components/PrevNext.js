import { Fragment } from 'react'
import { usePrevNext } from '@/hooks/usePrevNext'
import { documentation } from '@/components/nav/documentation'
import toArray from '@/utils/toArray'
import flattenArray from '@/utils/flattenArray'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import PrevNextButton from '@/components/PrevNextButton'
import { useRouter } from 'next/router'
import useStore from '@/store/index'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayout'

const PrevNext = () => {
  const setPageStruct = useStore(state => state.setPageStruct)
  const router = useRouter()

  // flatten page names for next/prev
  const pages = flattenArray(
    Object.values(documentation).map(categoryItems =>
      toArray(categoryItems).map(item => (Array.isArray(item) ? item[0] : item))
    )
  )
  let l = pages.length

  // flatten path conversions for next prev
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

  // to update structure on page route change
  useIsomorphicLayoutEffect(() => {
    Object.entries(documentation).map(([category, categoryItems]) => {
      toArray(categoryItems).map(item => {
        if (
          router.pathname.split('/')[2] === encodeURI(category.toLowerCase()) &&
          router.pathname.split('/')[3] ===
            encodeURI(Array.isArray(item) ? item[0] : item)
        ) {
          setPageStruct(item)
        }
      })
    })
  }, [router.pathname])

  return (
    <Fragment>
      <div className="relative mt-10">
        {usePrevNext().prev === undefined || usePrevNext().prev < 0 ? (
          <></>
        ) : (
          <PrevNextButton
            className="left-0"
            href={
              pages[usePrevNext().prev] === 'introduction'
                ? '/docs'
                : paths[usePrevNext().prev]
            }
          >
            <div className="text-xs text-right text-gray-500">previous</div>
            <div className="flex items-center justify-between">
              <HiChevronLeft className="w-auto h-5" />
              <span className="">
                {pages[usePrevNext().prev].replace(/-/g, ' ')}
              </span>
            </div>
          </PrevNextButton>
        )}

        {usePrevNext().next === undefined || usePrevNext().next >= l ? (
          <></>
        ) : (
          <PrevNextButton
            className="right-0"
            href={
              pages[usePrevNext().next] === 'introduction'
                ? '/docs'
                : paths[usePrevNext().next]
            }
          >
            <div className="text-xs text-left text-gray-500">next</div>
            <div className="flex items-center justify-between">
              <span className="">
                {pages[usePrevNext().next].replace(/-/g, ' ')}
              </span>
              <HiChevronRight className="w-auto h-5" />
            </div>
          </PrevNextButton>
        )}
      </div>
      {/* bottom space */}
      <div className="w-full h-12" />
    </Fragment>
  )
}

export default PrevNext
