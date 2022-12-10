import { useRouter } from 'next/router'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import documentation from '@/components/documentation'
import toArray from '@/utils/toArray'
import useStore from '@/store/index'
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayout'
import { previousNext } from '@/utils/previousNext'
import LinkWithRef from '@/components/LinkWithRef'

const PrevNext = () => {
  const setPageStruct = useStore(state => state.setPageStruct)
  const router = useRouter()

  // flatten page names for next/prev

  // to update structure on page route change
  useIsomorphicLayoutEffect(() => {
    Object.entries(documentation).map(([category, categoryItems]) => {
      const array = toArray(categoryItems)
      if (array) {
        array.map(item => {
          if (
            router.pathname.split('/')[2] ===
              encodeURI(category.toLowerCase()) &&
            router.pathname.split('/')[3] ===
              encodeURI(Array.isArray(item) ? item[0] : item)
          ) {
            setPageStruct(item)
          }
        })
      }
    })
  }, [router.pathname])

  const { previous, next } = previousNext(router.pathname.split('/')[3])

  return (
    <div className="">
      <div className="relative mt-10">
        {previous?.page && previous?.path && (
          <LinkWithRef
            className="absolute left-0 w-[42.5%] rounded bg-yellow-200 py-1.5 px-2 font-extrabold no-underline dark:text-neutral-800"
            href={previous?.path}
          >
            <div className="">
              <div className="text-right text-xs text-neutral-500">
                previous
              </div>
              <div className="flex items-center justify-between text-sm font-bold text-neutral-800">
                <HiChevronLeft className="h-5 w-auto" />
                <span className="">{previous?.page.replace(/-/g, ' ')}</span>
              </div>
            </div>
          </LinkWithRef>
        )}

        {next?.page && next?.path && (
          <LinkWithRef
            className="absolute right-0 w-[42.5%] rounded bg-yellow-200 py-1.5 px-2 font-extrabold no-underline dark:text-neutral-800"
            href={next.path}
          >
            <div className="">
              <div className="text-left text-xs text-neutral-500">next</div>
              <div className="flex items-center justify-between  text-sm font-bold text-neutral-800">
                <span className="">{next?.page.replace(/-/g, ' ')}</span>
                <HiChevronRight className="h-5 w-auto" />
              </div>
            </div>
          </LinkWithRef>
        )}
      </div>
      <div className=""></div>
      {/* bottom space*/}
      <div className="h-12 w-full" />
    </div>
  )
}

export default PrevNext
