import React from 'react'
import Typewriter from 'typewriter-effect'

const TerminalControl = () => {
  return (
    <div
      style={{ fontFamily: `Consolas, 'Courier New', monospace` }}
      className="w-full max-w-3xl mx-auto overflow-hidden text-xs bg-black rounded md:text-sm"
    >
      {/* terminal header */}
      <div className="relative px-5 py-4 bg-neutral-800">
        <span className="flex space-x-2">
          <span className="block w-3 h-3 bg-red-500 rounded-full" />
          <span className="block w-3 h-3 bg-yellow-400 rounded-full" />
          <span className="block w-3 h-3 bg-green-500 rounded-full" />
        </span>
        <span className="absolute font-semibold text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          bash ~ <span className="text-green-500">usr</span>
        </span>
      </div>

      {/* terminal body */}
      <div className="px-5 py-4 min-h-[20rem] text-white">
        <div className="grid grid-cols-[0.2fr,9.8fr] auto-rows-auto gap-x-2 md:gap-x-4 gap-y-6">
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
                  `<div class="col-start-2 col-end-3 w-full">Showing issues 1 of 1 on glab</div>`
                )
                .pasteString(
                  `<div class="col-start-2 col-end-3 w-full flex space-x-3"><span class="text-green-500">#21</span><span>Update Documentation</span><span class="text-blue-300">[enhancement]</span><span class="text-neutral-300 text-opacity-60">30 mins ago</span></div>`
                )
                .pauseFor(10000)
                .start(100)
            }}
            options={{ loop: true }}
          />
        </div>
      </div>
    </div>
  )
}

export default TerminalControl
