import React from 'react'
import clsx from 'clsx'
import useStore from '@/store/index'

const Index = () => {
  const theme = useStore(state => state.theme)

  return (
    <>
      <section
        className={clsx(
          'pt-4 overflow-auto lg:p-10 font-medium text-lg scrollbars-hidden-f scrollbars-hidden',
          { 'text-yellow-100': !theme }
        )}
      >
        <section className="space-y-4">
          <h1
            className={clsx('text-3xl font-bold', {
              'text-yellow-400': !theme
            })}
          >
            Introduction
          </h1>
          <p className="">
            GLab is an open source Gitlab Cli tool written in Go (golang) to
            help work seamlessly with Gitlab from the command line. Work with
            issues, merge requests, watch running pipelines directly from your
            CLI among other features. Inspired by{' '}
            <span className="px-1 bg-yellow-200 bg-opacity-50 rounded-md">
              gh
            </span>
            ,{' '}
            <a href="https://cli.github.com/" className="underline">
              the Official GitHub CLI tool.
            </a>
          </p>
        </section>
      </section>
    </>
  )
}

export default Index
