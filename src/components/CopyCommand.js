import { useState, useEffect, forwardRef } from 'react'
import { HiClipboard, HiClipboardCheck } from 'react-icons/hi'
import clsx from 'clsx'
import { MDXProvider } from '@mdx-js/react'

const CopyCommand = forwardRef(({ children }, commandRef) => {
  const [copied, setCopied] = useState(undefined)

  function copy(command) {
    return navigator.clipboard.writeText(`${command}`)
  }

  useEffect(() => {
    window.setTimeout(() => setCopied(undefined), 2000)
  }, [copied])

  return (
    <MDXProvider ref={commandRef}>
      <pre
        className={clsx('flex group justify-between space-x-2 items-center')}
      >
        <div className="overflow-hidden">
          <span className="px-0.5 overflow-x-auto scrollbar-hidden scrolbarhidden-f">
            {children}
          </span>
        </div>
        <button
          type="button"
          className={clsx(
            'focus:outline-none p-0.5 transition-all opacity-0 group-hover:opacity-100 border border-current rounded active:outline-none',
            {
              'text-green-400': copied
            }
          )}
          onClick={() => {
            setCopied('copied')
            copy(children)
          }}
        >
          <HiClipboard className={clsx('h-4 w-auto', { hidden: copied })} />
          <HiClipboardCheck
            className={clsx('h-4 w-auto', { hidden: !copied })}
          />
        </button>
      </pre>
    </MDXProvider>
  )
})

export default CopyCommand
