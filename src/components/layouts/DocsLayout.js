import React from 'react'
import clsx from 'clsx'

const DocsLayout = ({ children }) => {
  return (
    <section
      className={clsx(
        'py-8 px-5 overflow-y-auto scrollbar-hidden scrollbar-hidden-f'
      )}
    >
      <section className={clsx('prose mx-auto prose-blue')}>{children}</section>
    </section>
  )
}

export default DocsLayout
