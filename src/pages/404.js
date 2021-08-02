import React from 'react'
import clsx from 'clsx'
import useStore from '../store'
import Typewriter from 'typewriter-effect'

const Custom404 = () => {
  const theme = useStore(state => state.theme)

  return (
    <>
      <section
        className={clsx(
          'w-full h-screen absolute inset-0 flex items-center justify-center',
          {
            'text-gray-800': theme,
            'text-yellow-200 bg-gray-900': !theme
          }
        )}
      >
        <div className="space-y-10">
          <img
            src={require('@/img/404.png')}
            alt="404 image"
            className={clsx('h-80 w-auto')}
          />
          <section className="px-8 text-xl font-black text-center">
            <Typewriter
              options={{
                strings: [
                  'Hey hacker, Page not found😐',
                  'Tried <span class="bg-gray-700 px-1 text-yellow-200">searching 🔍</span> or <span class="bg-gray-700 px-1 text-yellow-200">hit 🖱️</span> the docs button yet?'
                ],
                autoStart: true,
                loop: true
              }}
            />
          </section>
        </div>
      </section>
    </>
  )
}

export default Custom404
