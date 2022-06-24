import { useState, useEffect } from 'react'
import { HiClipboard, HiClipboardCheck } from 'react-icons/hi'
import clsx from 'clsx'
import { MDXProvider } from '@mdx-js/react'

interface CopyCommandRef {
  children?: JSX.Element[] | JSX.Element | string
}

const CopyCommand = ({ children }: CopyCommandRef) => {
  const [copied, setCopied] = useState<string | undefined>(undefined)

  async function copy(command: any) {
    // strip string from component
    typeof command === 'object' ? (command = command.props.children) : command
    return await navigator.clipboard
      .writeText(command)
      .catch(error => console.log(error))
  }

  useEffect(() => {
    window.setTimeout(() => setCopied(undefined), 2000)
  }, [copied])

  return (
    <MDXProvider>
      <pre
        className={clsx('group flex items-center justify-between space-x-2')}
      >
        <div className="overflow-hidden">
          <span className="overflow-x-auto px-0.5">{children}</span>
        </div>
        <button
          type="button"
          className={clsx(
            'rounded border border-current p-0.5 opacity-0 transition-all focus:outline-none active:outline-none group-hover:opacity-100',
            copied && 'text-green-400'
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
}

export default CopyCommand
