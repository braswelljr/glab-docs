import React from 'react'
import Typewriter from 'typewriter-effect'

const TerminalControl = () => {
  return (
    <div
      style={{ fontFamily: `Consolas, 'Courier New', monospace` }}
      className="mx-auto w-full max-w-3xl overflow-hidden rounded bg-black text-xs md:text-sm"
    >
      {/* terminal header */}
      <div className="relative bg-neutral-800 px-5 py-4">
        <span className="flex space-x-2">
          <span className="block h-3 w-3 rounded-full bg-red-500" />
          <span className="block h-3 w-3 rounded-full bg-yellow-400" />
          <span className="block h-3 w-3 rounded-full bg-green-500" />
        </span>
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform font-semibold text-white">
          bash ~ <span className="text-green-500">usr</span>
        </span>
      </div>

      {/* terminal body */}
      <div className="min-h-[20rem] px-5 py-4 text-white">
        <div className="grid auto-rows-auto grid-cols-[0.2fr,9.8fr] gap-x-2 gap-y-6 md:gap-x-4">
          <span className="col-start-1 col-end-2 row-start-1 row-end-2 text-green-500">
            $
          </span>
          <Typewriter
            onInit={typewriter => {
              typewriter
                .typeString(
                  `<span class="col-start-2 col-end-3 w-full">glab issue list</span>`
                )
                .pasteString(
                  `<div class="col-start-2 col-end-3 w-full">Showing issues 1 of 1 on glab</div>
                  <div class="col-start-2 col-end-3 w-full flex space-x-3"><span class="text-green-500">#21</span><span>Update Documentation</span><span class="text-blue-300">[enhancement]</span><span class="text-neutral-300 text-opacity-60">30 mins ago</span></div>`,
                  null
                )
                .pauseFor(10000)
                .start()
            }}
            options={{ loop: true }}
          />
        </div>
      </div>
    </div>
  )
}

export default TerminalControl
