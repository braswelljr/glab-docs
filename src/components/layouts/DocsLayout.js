import React from 'react'
import clsx from 'clsx'
import useStore from '@/store/index'

const DocsLayout = ({ children }) => {
  const theme = useStore(state => state.theme)

  return (
    <section
      className={clsx(
        'py-8 lg:px-5 overflow-y-auto scrollbar-hidden scrollbar-hidden-f prose font-semibold',
        {
          'text-gray-900': theme
        }
      )}
    >
      {children}
    </section>
  )
}

export default DocsLayout
