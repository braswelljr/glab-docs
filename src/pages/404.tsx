import React from 'react'
import clsx from 'clsx'
import Typewriter from 'typewriter-effect'

const Custom404 = () => {
  return (
    <section
      className={clsx(
        'absolute inset-0 grid min-h-screen w-full place-items-center bg-neutral-900 text-yellow-200 dark:text-neutral-800'
      )}
    >
      <div className="space-y-10 pt-12 md:pt-24">
        <img
          src={require('@/img/404.png')}
          alt="404 image"
          className={clsx('h-80 w-auto')}
        />
        <section className="px-8 text-center text-xl font-black">
          <Typewriter
            options={{
              strings: [
                'Hey hacker, Page not found😐',
                'Tried <span class="bg-neutral-700 px-1 text-yellow-200">searching 🔍</span> or <span class="bg-neutral-700 px-1 text-yellow-200">hit 🖱️</span> the docs button yet?'
              ],
              autoStart: true,
              loop: true
            }}
          />
        </section>
      </div>
    </section>
  )
}

export default Custom404
