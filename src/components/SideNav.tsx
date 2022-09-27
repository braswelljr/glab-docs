import clsx from 'clsx'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import documentation from '@/components/documentation'
import toArray from '@/utils/toArray'
import useStore from '@/store/index'
import LinkWithRef from '@/components/LinkWithRef'

const SideNav = ({
  doc,
  setDoc
}: {
  doc: boolean
  setDoc: (doc: boolean) => void
}) => {
  const router = useRouter()
  const setPageStruct = useStore(state => state.setPageStruct)

  return (
    <nav
      className={clsx(
        'fixed inset-0 z-10 h-full w-full transform overflow-y-auto border-current bg-yellow-200 pt-40 pb-5 text-yellow-900 transition-all duration-300 dark:bg-neutral-900 dark:text-yellow-200 md:px-16 lg:relative lg:translate-x-0 lg:border-r lg:bg-white lg:px-0 lg:pt-0',
        !doc && '-translate-x-full'
      )}
    >
      <div className="w-full space-y-6 py-6">
        {Object.entries(documentation).map(([category, categoryItems]) => (
          <div key={category} className="w-full px-4">
            <h3 className="pl-3 font-black uppercase text-yellow-600">
              {category.replace(/-/g, ' ')}
            </h3>
            {toArray(categoryItems)?.map(item => (
              <LinkWithRef
                href={
                  item === 'introduction'
                    ? `/docs`
                    : `/docs/${category.toLowerCase()}/${
                        Array.isArray(item) ? item[0] : item
                      }`
                }
                className={clsx('relative text-sm font-semibold')}
                key={Array.isArray(item) ? item[0] : item}
              >
                <div className="relative">
                  {(router.pathname.split('/')[3] ===
                    decodeURI(Array.isArray(item) ? item[0] : item) ||
                    (router.pathname === '/docs' &&
                      item === 'introduction')) && (
                    <motion.div
                      layoutId="highlight"
                      className={clsx(
                        'absolute inset-0 block min-h-full w-full rounded-sm bg-brown-500/30 dark:bg-yellow-200/20 lg:bg-yellow-200'
                      )}
                    />
                  )}
                  <div
                    className={clsx(
                      'relative px-3 py-1 pl-5 text-sm transition-all lg:py-0.5'
                    )}
                    onClick={() => {
                      setDoc(false)
                      setPageStruct(item)
                    }}
                  >
                    {Array.isArray(item)
                      ? item[0].replace(/(-)/g, ' ')
                      : item.replace(/(-)/g, ' ')}
                  </div>
                </div>
              </LinkWithRef>
            ))}
          </div>
        ))}
      </div>
    </nav>
  )
}

export default SideNav
