import React from "react";
import Typewriter from "typewriter-effect";

const TerminalControl = () => {
  return (
    <div className="w-full max-w-3xl mx-auto overflow-hidden bg-gray-800 rounded">
      {/* terminal header */}
      <div className="relative px-5 py-4 bg-gray-900">
        <span className="flex space-x-2">
          <span className="block w-3 h-3 bg-green-500 rounded-full" />
          <span className="block w-3 h-3 bg-yellow-400 rounded-full" />
          <span className="block w-3 h-3 bg-red-500 rounded-full" />
        </span>
        <span className="absolute font-semibold text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          bash ~ <span className="text-green-500">braswelljr</span>
        </span>
      </div>

      {/* terminal body */}
      <div className="px-5 py-4 min-h-[22.5rem] text-white">
        <div className="flex space-x-3 ">
          <span className="text-green-500">$</span>
          <Typewriter
            options={{
              strings: ["glab issue list"],
              autoStart: true,
              loop: true,
              pauseFor: 10000
            }}
          />
        </div>
        <div className="ml-5">No issues found</div>
      </div>
    </div>
  );
};

export default TerminalControl;
