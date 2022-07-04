import flattenArray from '@/utils/flattenArray'
import toArray from '@/utils/toArray'
import documentation from '@/components/documentation'

export const previousNext = (pageRoute: string) => {
  const pages = flattenArray(
    Object.values(documentation).map(categoryItems =>
      toArray(categoryItems)?.map(item =>
        Array.isArray(item) ? item[0] : item
      )
    )
  )

  // flatten path conversions for next prev
  let paths = flattenArray(
    Object.entries(documentation).map(([category, categoryItems]) =>
      toArray(categoryItems)?.map(
        item =>
          `/docs/${category.toLowerCase()}/${
            Array.isArray(item) ? item[0] : item
          }`
      )
    )
  )
  // replace the first path with the page route
  paths[0] = '/docs'

  let pageIndex = pages.findIndex((page: string) => page === pageRoute)

  return {
    previous: {
      page: pageIndex <= 0 ? undefined : pages[pageIndex - 1],
      path: pageIndex <= 0 ? undefined : paths[pageIndex - 1]
    },
    next: {
      page:
        pageIndex >= pages?.length
          ? undefined
          : pages[pageIndex === -1 ? 1 : pageIndex + 1],
      path:
        pageIndex >= paths?.length
          ? undefined
          : paths[pageIndex === -1 ? 1 : pageIndex + 1]
    }
  }
}
