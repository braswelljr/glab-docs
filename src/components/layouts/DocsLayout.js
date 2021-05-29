import React from 'react'
import clsx from 'clsx'
import useStore from '@/store/index'

const DocsLayout = ({ children }) => {
  const theme = useStore(state => state.theme)

  return (
    <section
      className={clsx(
        'py-8 lg:px-5 overflow-y-auto col-start-1 col-end-3 lg:col-start-2 scrollbar-hidden scrollbar-hidden-f'
      )}
    >
      <section
        className={clsx('prose mx-auto font-semibold', {
          'text-gray-900': theme
        })}
      >
        {children}
      </section>
    </section>
  )
}

export default DocsLayout
