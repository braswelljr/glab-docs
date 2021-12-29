import React from 'react'
import clsx from 'clsx'
import useStore from '@/store/index'
import Typewriter from 'typewriter-effect'
import Image from 'next/image'

const Custom404 = () => {
  const theme = useStore(state => state.theme)

  return (
    <section
      className={clsx(
        'w-full min-h-screen absolute inset-0 grid place-items-center',
        {
          'text-neutral-800': theme === 'dark',
          'text-yellow-200 bg-neutral-900': theme === 'light'
        }
      )}
    >
      <div className="pt-12 space-y-10 md:pt-24">
        <Image
          src={require('@/img/404.png')}
          alt="404 image"
          height={320}
          width={500}
          className={clsx('h-80 w-auto')}
        />
        <section className="px-8 text-xl font-black text-center">
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
