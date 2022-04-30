import { documentation } from '@/components/nav/documentation'
import toArray from '@/utils/toArray'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import PrevNextButton from '@/components/PrevNextButton'
import { useRouter } from 'next/router'
import useStore from '@/store/index'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayout'
import { previousNext } from '@/utils/previousNext'

const PrevNext = () => {
  const setPageStruct = useStore(state => state.setPageStruct)
  const router = useRouter()

  // flatten page names for next/prev

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

  const { previous, next } = previousNext(router.pathname.split('/')[3])

  return (
    <div className="">
      <div className="relative mt-10">
        {previous?.page !== undefined && previous?.path !== undefined && (
          <PrevNextButton className="left-0" href={previous?.path}>
            <div className="text-right text-xs text-neutral-500">previous</div>
            <div className="flex items-center justify-between">
              <HiChevronLeft className="h-5 w-auto" />
              <span className="">{previous?.page.replace(/-/g, ' ')}</span>
            </div>
          </PrevNextButton>
        )}

        {next?.page !== undefined && next?.path !== undefined && (
          <PrevNextButton className="right-0" href={next.path}>
            <div className="text-left text-xs text-neutral-500">next</div>
            <div className="flex items-center justify-between">
              <span className="">{next?.page.replace(/-/g, ' ')}</span>
              <HiChevronRight className="h-5 w-auto" />
            </div>
          </PrevNextButton>
        )}
      </div>
      {/* bottom space*/}
      <div className="h-12 w-full" />
    </div>
  )
}

export default PrevNext
