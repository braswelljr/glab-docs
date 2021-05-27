import React from 'react'
import clsx from 'clsx'

const DocsLayout = ({ children }) => {
  return (
    <section className={clsx('pt-5 px-5')}>
      <section className={clsx('')}>{children}</section>
    </section>
  )
}

export default DocsLayout
