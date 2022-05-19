import React from 'react'
import Terminal from '@/components/Terminal'
import Footer from '@/components/Footer'
import Link from 'next/link'
import clsx from 'clsx'
import useStore from '@/store/index'
import { terminalD, poweredBy } from 'src/context/contents'
import LinkWithRef from '@/components/LinkWithRef'
import { HiPencilAlt, HiDownload } from 'react-icons/hi'

function Index() {
  const themed = useStore(state => state.theme)

  return (
    <>
      {/* Topper */}
      <section className="space-y-12 bg-ticTacToe px-8 py-12 md:px-20 lg:px-32 xl:px-40">
        <h3 className="mx-auto text-center text-5xl font-black tracking-wide md:w-3/5 md:text-7xl">
          Take GitLab to the command line
        </h3>
        <p className="mx-auto text-center text-2xl font-medium md:w-3/5">
          GLab is an open source GitLab CLI tool bringing GitLab to your
          terminal next to where you are already working with git and your code.
        </p>

        <div className="mx-6 grid items-center justify-center">
          <LinkWithRef
            href="/docs"
            className={clsx(
              'inline-block transform rounded border-0 bg-yellow-900 py-2 px-8 text-center text-xs font-semibold uppercase transition-all hover:-translate-y-0.5 md:text-lg',
              { 'text-current': !themed, 'text-yellow-200': themed }
            )}
          >
            Get Started
          </LinkWithRef>
        </div>

        <p className="space-y-4 text-center text-lg font-medium">
          <a
            href="https://github.com/profclems/glab#installation"
            className="link-underline inline-flex items-center space-x-2"
            target={'_blank'}
          >
            <HiDownload className="h-4 w-auto" />
            <span>View installation instructions</span>
          </a>
          <div className="" />
          <a
            href="https://github.com/braswelljr/glab-docs"
            className="link-underline inline-flex items-center space-x-2"
            target={'_blank'}
          >
            <HiPencilAlt className="h-4 w-auto" />
            <span>Contribute or Edit Docs</span>
          </a>
        </p>
      </section>

      {/* Terminal section */}
      <section
        className={clsx('space-y-16 px-8 py-12 md:px-20 lg:px-32 xl:px-40', {
          'bg-yellow-50': themed === 'dark',
          'bg-neutral-900': themed === 'light'
        })}
      >
        <p className="mx-auto text-center text-2xl font-medium md:w-3/5">
          <span className="block">Good bye context switching.</span>
          <span className="block">Hello, Terminal</span>
        </p>
        <Terminal />
        <div className="mx-auto grid max-w-3xl grid-cols-1 justify-center gap-x-4 gap-y-10 md:grid-cols-2">
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
      <section className="space-y-16 bg-ticTacToe px-8 py-12 md:px-20 lg:px-32 xl:px-40">
        <div className="mx-auto space-y-5 text-center">
          <h3 className="text-3xl font-bold">Try GitLab on the command line</h3>
          <p className="text-lg font-medium">
            GLab brings GitLab to your terminal. Free and open source.
          </p>
          <a
            href="https://github.com/profclems/glab#installation"
            type="button"
            className={clsx(
              'mx-auto inline-block transform rounded border-0 bg-yellow-900 py-3 px-7 text-xl font-semibold transition-all hover:-translate-y-0.5',
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
      <section className="space-y-16 px-8 py-12 md:px-20 lg:px-32 xl:px-40">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-xl font-bold uppercase">Powered by</h1>
          <div className="mt-8 flex flex-wrap items-center justify-around">
            {poweredBy.map(brand => (
              <a
                href={brand.link}
                target="_blank"
                key={brand.name}
                className={clsx(
                  'flex w-auto flex-col items-center text-center transition-colors',
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
