import React from 'react'
import { ticTacToe } from '@/backgrounds/background'
import Terminal from '@/components/Terminal'

const Index = () => {
  const terminalContext = [
    {
      title: `Your entire GitLab workflow`,
      workflow: `Work with issues, merge requests, GitLab CI pipelines and jobs, releases and more`,
      name: `View all glab commands`,
      link: ``
    },
    {
      title: `Script and customize`,
      workflow: `Call the GitLab API to script almost any action, and set a custom alias for any command`,
      name: `Learn about aliases and API`,
      link: ``
    },
    {
      title: `Supports all GitLab instances`,
      workflow: `Available for repositories hosted on GitLab.com and self-hosted GitLab Instances`,
      name: `Learn how to authenticate`,
      link: ``
    },
    {
      title: `We <3 Community`,
      workflow: `GLab is open source, Licensed under MIT and ready for your contributions`,
      name: `Contribute to glab`,
      link: `https://github.com/profclems/glab`
    }
  ]
  return (
    <>
      {/* Topper */}
      <section
        style={{ backgroundImage: ticTacToe }}
        className="px-8 py-12 space-y-12 md:px-20 xl:px-40 lg:px-32"
      >
        <h3 className="mx-auto text-5xl font-black tracking-wide text-center md:text-7xl md:w-3/5">
          Take GitLab to the command line
        </h3>
        <p className="mx-auto text-2xl font-medium text-center md:w-3/5">
          GLab is an open source GitLab CLI tool bringing GitLab to your
          terminal next to where you are already working with git and your code.
        </p>
        <button
          type="button"
          className="block py-3 mx-auto text-xl font-semibold text-white bg-black border border-current rounded px-7"
        >
          Get Started
        </button>
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
      <section className="px-8 py-12 space-y-16 bg-yellow-50 md:px-20 xl:px-40 lg:px-32">
        <p className="mx-auto text-2xl font-medium text-center md:w-3/5">
          <span className="block">Good bye context switching.</span>
          <span className="block">Hello, Terminal</span>
        </p>
        <Terminal />
        <div className="grid justify-center max-w-3xl grid-cols-1 mx-auto gap-x-4 gap-y-10 md:grid-cols-2">
          {terminalContext.map(feat => (
            <div key={feat.title} className="space-y-2 text-center">
              <h3 className="text-xl font-black">{feat.title}</h3>
              <p className="">{feat.workflow}.</p>
              <a href={feat.link} className="text-yellow-500 hover:underline">
                {feat.name} →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* bot */}
      <section className="px-8 py-12 space-y-16 md:px-20 xl:px-40 lg:px-32">
        <div className="mx-auto space-y-5 text-center">
          <h3 className="text-3xl font-bold">Try GitLab on the command line</h3>
          <p className="text-lg font-medium">
            GLab brings GitLab to your terminal. Free and open source.
          </p>
          <a
            href="https://github.com/profclems/glab#installation"
            type="button"
            className="py-3 mx-auto text-xl font-semibold text-white bg-black border border-current rounded px-7"
          >
            Installation Guide
          </a>
        </div>
      </section>
    </>
  )
}

export default Index
