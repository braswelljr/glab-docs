import React from 'react'
import clsx from 'clsx'

const Footer = () => {
  return (
    <footer className="border-t border-current px-8 py-5 md:px-20 md:text-xl lg:px-32 xl:px-40">
      <div className={clsx('mx-auto max-w-2xl text-center text-sm')}>
        © Copyright {new Date().getFullYear()},{' '}
        <a
          href="https://github.com/profclems"
          target="_blank"
          rel="noreferrer"
          className={clsx('text-blue-500 hover:underline')}
        >
          Clement Sam
        </a>{' '}
        and docs by{' '}
        <a
          href="https://github.com/braswelljr"
          target="_blank"
          rel="noreferrer"
          className={clsx('text-blue-500 hover:underline')}
        >
          Braswell Kenneth Azu Junior
        </a>
      </div>
    </footer>
  )
}

export default Footer

export const DocsFooter = () => {
  return <footer className={clsx()}>Docs Footer</footer>
}
