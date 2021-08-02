import React from 'react'
import clsx from 'clsx'

const Footer = () => {
  return (
    <div className="absolute inset-x-0 bottom-0 px-8 py-5 border-t border-current md:text-xl md:px-20 xl:px-40 lg:px-32">
      <div className={clsx('max-w-2xl mx-auto text-center text-sm')}>
        © Copyright 2020,{' '}
        <a
          href="https://github.com/profclems"
          target="_blank"
          className={clsx('text-blue-500 hover:underline')}
        >
          Clement Sam
        </a>{' '}
        and docs by{' '}
        <a
          href="https://github.com/braswelljr"
          target="_blank"
          className={clsx('text-blue-500 hover:underline')}
        >
          Braswell Kenneth Azu Junior
        </a>
      </div>
    </div>
  )
}

export default Footer
