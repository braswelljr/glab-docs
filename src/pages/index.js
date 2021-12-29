import React from 'react'
import Terminal from '@/components/Terminal'
import Footer from '@/components/Footer'
import Link from 'next/link'
import clsx from 'clsx'
import useStore from '@/store/index'
import { terminalD, poweredBy } from 'src/context/contents'

function Index() {
  const themed = useStore(state => state.theme)

  return (
    <>
      {/* Topper */}
      <section className="px-8 py-12 space-y-12 md:px-20 xl:px-40 lg:px-32 bg-ticTacToe">
        <h3 className="mx-auto text-5xl font-black tracking-wide text-center md:text-7xl md:w-3/5">
          Take GitLab to the command line
        </h3>
        <p className="mx-auto text-2xl font-medium text-center md:w-3/5">
          GLab is an open source GitLab CLI tool bringing GitLab to your
          terminal next to where you are already working with git and your code.
        </p>
        <Link href="/docs" passHref>
          <button
            type="button"
            className={clsx(
              'block py-3 mx-auto text-xl font-semibold transition-all transform bg-yellow-900 border-0 rounded hover:-translate-y-0.5 px-7',
              { 'text-current': !themed, 'text-yellow-200': themed }
            )}
          >
            Get Started
          </button>
        </Link>
        <p className="text-lg font-medium text-center">
          <a
            href="https://github.com/profclems/glab#installation"
            className="hover:underline"
          >
            View installation instructions →
          </a>
        </p>
      </section>

      {/* Terminal section */}
      <section
        className={clsx('px-8 py-12 space-y-16 md:px-20 xl:px-40 lg:px-32', {
          'bg-yellow-50': themed === 'dark',
          'bg-neutral-900': themed === 'light'
        })}
      >
        <p className="mx-auto text-2xl font-medium text-center md:w-3/5">
          <span className="block">Good bye context switching.</span>
          <span className="block">Hello, Terminal</span>
        </p>
        <Terminal />
        <div className="grid justify-center max-w-3xl grid-cols-1 mx-auto gap-x-4 gap-y-10 md:grid-cols-2">
          {terminalD.map(feat => (
            <div key={feat.title} className="space-y-2 text-center">
              <h3 className="text-xl font-black">{feat.title}</h3>
              <p className="">{feat.workflow}.</p>
              <Link href={feat.link}>
                <a className="inline-block text-yellow-500 hover:underline">
                  {feat.name} →{' '}
                </a>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* bot */}
      <section className="px-8 py-12 space-y-16 md:px-20 xl:px-40 lg:px-32 bg-ticTacToe">
        <div className="mx-auto space-y-5 text-center">
          <h3 className="text-3xl font-bold">Try GitLab on the command line</h3>
          <p className="text-lg font-medium">
            GLab brings GitLab to your terminal. Free and open source.
          </p>
          <a
            href="https://github.com/profclems/glab#installation"
            type="button"
            className={clsx(
              'inline-block py-3 mx-auto text-xl font-semibold transition-all transform bg-yellow-900 border-0 rounded px-7 hover:-translate-y-0.5',
              {
                'text-current': themed === 'light',
                'text-yellow-200': themed === 'dark'
              }
            )}
          >
            Installation Guide
          </a>
        </div>
      </section>
      <section className="px-8 py-12 space-y-16 md:px-20 xl:px-40 lg:px-32">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-xl font-bold uppercase">Powered by</h1>
          <div className="flex flex-wrap items-center justify-around mt-8">
            {poweredBy.map(brand => (
              <a
                href={brand.link}
                target="_blank"
                key={brand.name}
                className={clsx(
                  'w-auto flex flex-col items-center text-center transition-colors',
                  {
                    'hover:text-yellow-600': themed === 'light',
                    'hover:text-yellow-500': themed === 'dark'
                  }
                )}
              >
                <div>{brand.logo}</div>
                <div className="text-sm font-extrabold">{brand.name}</div>
              </a>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Index
