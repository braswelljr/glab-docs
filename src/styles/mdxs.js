import clsx from 'clsx'
import useStore from '@/store/index'

export function mdxStyle() {
  const theme = useStore(state => state.theme)
  return {
    h1: props => (
      <h1
        {...props}
        className={clsx('text-3xl antialiased font-bold cursor-text')}
      />
    ),
    h2: props => (
      <h2
        {...props}
        className={clsx('text-2xl antialiased font-bold cursor-text')}
      />
    ),
    h3: props => (
      <h3
        {...props}
        className={clsx('text-xl antialiased font-bold cursor-text')}
      />
    ),
    h4: props => (
      <h4
        {...props}
        className={clsx('text-lg antialiased font-bold cursor-text')}
      />
    ),
    h5: props => (
      <h5
        {...props}
        className={clsx('text-base antialiased font-bold cursor-text')}
      />
    ),
    h6: props => (
      <h6
        {...props}
        className={clsx('text-sm antialiased font-bold cursor-text')}
      />
    ),
    p: props => <p {...props} className={clsx('text-lg')} />,
    a: props => (
      <a {...props} className={clsx('hover:underline text-blue-500')} />
    ),
    inlineCode: props => (
      <inlinecode
        {...props}
        className={clsx('inline px-1 text-base font-medium rounded-sm', {
          'bg-gray-200 text-gray-900': theme,
          'bg-gray-800': !theme
        })}
      />
    ),
    code: props => (
      <code
        {...props}
        className={clsx(
          'block px-4 py-3 my-4 text-base font-medium rounded-lg',
          {
            'bg-gray-100 text-gray-900': theme,
            'bg-gray-800': !theme
          }
        )}
      />
    ),
    kbd: props => (
      <>
        <kbd
          {...props}
          className={clsx('inline-block text-base font-medium')}
        />
      </>
    ),
    blockquote: props => (
      <blockquote
        {...props}
        className={clsx('text-base font-medium border-l-4 pl-2', {
          'border-gray-300': theme,
          'text-gray-800': !theme
        })}
      />
    ),
    pre: props => <pre {...props} className={clsx('text-base font-medium')} />,
    hr: props => <hr {...props} className={clsx('h-0 overflow-visible')} />,
    input: props => (
      <input {...props} className={clsx('m-0 overflow-visible')} />
    ),
    table: props => <table {...props} className={clsx('table m-0 p-0')} />,
    tr: props => (
      <>
        <tr
          {...props}
          className={clsx('block m-0 px-3 py-1.5 font-semibold', {
            'even:bg-gray-200': theme,
            'even:bg-gray-800': !theme
          })}
        />
      </>
    ),
    td: props => (
      <td
        {...props}
        className={clsx('inline-block m-0 px-3 border py-1.5 font-semibold')}
      />
    ),
    th: props => (
      <th
        {...props}
        className={clsx('inline-block m-0 px-3 border py-1.5 font-bold')}
      />
    ),
    thead: props => (
      <thead
        {...props}
        className={clsx('inline-block m-0 px-3 border py-1.5 font-bold')}
      />
    )
  }
}
