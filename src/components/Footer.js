import React from 'react'

const Footer = () => {
  return (
    <div className="px-8 py-5 border-t border-current md:px-20 xl:px-40 lg:px-32">
      <div className="max-w-2xl mx-auto text-center">
        Powered by{' '}
        <a
          href="https://nextjs.org/"
          target="_blank"
          className="text-yellow-500"
        >
          Next.js
        </a>
        ,{' '}
        <a
          href="https://vercel.com/"
          target="_blank"
          className="text-yellow-500"
        >
          Vercel
        </a>{' '}
        and{' '}
        <a
          href="https://tailwindcss.com/"
          target="_blank"
          className="text-yellow-500"
        >
          Tailwindcss
        </a>
      </div>
    </div>
  )
}

export default Footer
