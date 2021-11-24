import flattenArray from '@/utils/flattenArray'
import toArray from '@/utils/toArray'
import { documentation } from '@/components/nav/documentation'

export const previousNext = pageRoute => {
  const pages = flattenArray(
    Object.values(documentation).map(categoryItems =>
      toArray(categoryItems).map(item => (Array.isArray(item) ? item[0] : item))
    )
  )

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

  let pageIndex = pages.findIndex(page => page === pageRoute)

  return {
    previous: {
      page: pageIndex <= 0 ? undefined : pages[pageIndex - 1],
      path: pageIndex <= 0 ? undefined : paths[pageIndex - 1]
    },
    next: {
      page: pageIndex >= pages?.length ? undefined : pages[pageIndex + 1],
      path: pageIndex >= paths?.length ? undefined : paths[pageIndex + 1]
    }
  }
}
