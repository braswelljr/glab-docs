import React from 'react'
import clsx from 'clsx'
import useStore from '../store'
import fof from '../assets/404.png'
import Typewriter from 'typewriter-effect'

const Custom404 = () => {
  const theme = useStore(state => state.theme)

  return (
    <>
      <section
        className={clsx(
          'w-full min-h-[71.4vh] flex items-center justify-center lg:min-h-[81.5vh]',
          {
            'text-gray-800': theme,
            'text-yellow-200 bg-gray-900': !theme
          }
        )}
      >
        <div className="space-y-10">
          <img src={fof} alt="404 image" className={clsx('h-80 w-auto')} />
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
