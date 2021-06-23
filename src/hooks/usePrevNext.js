import { toArray } from '@/utils/toArray'
import { documentation } from '@/components/nav/documentation'
import { useRouter } from 'next/router'
import { flattenArray } from '@/utils/flattenArray'

export function usePrevNext() {
  const router = useRouter()

  const pages = flattenArray(
    Object.values(documentation).map(categoryItems =>
      toArray(categoryItems).map(item => (Array.isArray(item) ? item[0] : item))
    )
  )
  let pageIndex = pages.findIndex(
    page => page === router.pathname.split('/')[3]
  )

  return {
    prev: pageIndex > -1 ? pageIndex - 1 : undefined,
    next: pageIndex > -1 ? pageIndex + 1 : undefined
  }
}
