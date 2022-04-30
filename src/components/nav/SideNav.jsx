import { documentation } from './documentation'
import NavLink from './NavLink'
import clsx from 'clsx'
import toArray from '@/utils/toArray'
import { useRouter } from 'next/router'
import useStore from '@/store/index'
import { motion } from 'framer-motion'

const SideNav = ({ doc, setDoc }) => {
  const router = useRouter()
  const theme = useStore(state => state.theme)
  const setPageStruct = useStore(state => state.setPageStruct)

  return (
    <nav
      className={clsx(
        'scrollbar-hidden scrollbar-hidden-f fixed inset-0 z-10 h-full w-full transform overflow-y-auto border-current pt-40 pb-5 transition-all duration-300 md:px-16 lg:relative lg:translate-x-0 lg:border-r lg:px-0 lg:pt-0',
        {
          '-translate-x-full': !doc,
          'bg-yellow-200 text-yellow-900 lg:bg-white': theme === 'dark',
          'bg-neutral-900 text-yellow-200': theme === 'light'
        }
      )}
    >
      <div className="w-full space-y-6 py-6">
        {Object.entries(documentation).map(([category, categoryItems]) => (
          <div key={category} className="w-full px-4">
            <h3 className="pl-3 font-black uppercase text-yellow-600">
              {category.replace(/-/g, ' ')}
            </h3>
            {toArray(categoryItems).map(item => (
              <NavLink
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
                {(router.pathname.split('/')[3] ===
                  decodeURI(Array.isArray(item) ? item[0] : item) ||
                  (router.pathname === '/docs' && item === 'introduction')) && (
                  <motion.div
                    layoutId="highlight"
                    className={clsx('absolute inset-0 rounded-sm', {
                      'bg-yellow-300 lg:bg-yellow-200': theme === 'dark',
                      'bg-yellow-200/20': theme === 'light'
                    })}
                  />
                )}
                <span
                  className="relative z-[1] block h-full w-full px-3 py-0.5 pl-5 text-sm transition-all"
                  onClick={() => {
                    setDoc(false)
                    setPageStruct(item)
                  }}
                >
                  {Array.isArray(item)
                    ? item[0].replace(/(-)/g, ' ')
                    : item.replace(/(-)/g, ' ')}
                </span>
              </NavLink>
            ))}
          </div>
        ))}
      </div>
    </nav>
  )
}

export default SideNav
