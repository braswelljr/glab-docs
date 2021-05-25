import React from 'react'
import clsx from 'clsx'
import useStore from '@/store/index'

const Index = () => {
  const theme = useStore(state => state.theme)

  return (
    <>
      <section
        className={clsx(
          'pt-4 overflow-auto lg:pl-6 scrollbars-hidden-f scrollbars-hidden',
          { 'text-yellow-200': !theme }
        )}
      >
        <section className="">
          <h1 className="font-bold">Introduction</h1>
        </section>
      </section>
    </>
  )
}

export default Index
