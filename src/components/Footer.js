import React from 'react'
import clsx from 'clsx'
import useStore from '@/store/index'

const Footer = () => {
  const theme = useStore(state => state.theme)
  return (
    <div className="px-8 py-5 border-t border-current md:text-xl md:px-20 xl:px-40 lg:px-32">
      <div className="max-w-2xl mx-auto text-center">
        Powered by{' '}
        <a
          href="https://nextjs.org/"
          target="_blank"
          className={clsx('text-yellow-500 font-semibold', {
            'text-gray-900': theme
          })}
        >
          Next.js
        </a>
        ,{' '}
        <a
          href="https://vercel.com/"
          target="_blank"
          className={clsx('text-yellow-500 font-semibold', {
            'text-gray-900': theme
          })}
        >
          Vercel
        </a>{' '}
        and{' '}
        <a
          href="https://tailwindcss.com/"
          target="_blank"
          className={clsx('text-yellow-500 font-semibold', {
            'text-gray-900': theme
          })}
        >
          Tailwindcss
        </a>
      </div>
    </div>
  )
}

export default Footer
