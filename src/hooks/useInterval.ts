import { useEffect, useRef } from 'react'

/**
 * useInterval hook - sets reference to the previous value and returns a given value within a particular duration.
 */
export default function useInterval(
  callback: () => void | HTMLElement | undefined | null,
  delay = 1000
) {
  const savedCallback = useRef<() => void | HTMLElement | undefined | null>()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    let id = setInterval(
      () =>
        typeof savedCallback.current === 'function' &&
        typeof savedCallback.current !== 'undefined'
          ? savedCallback.current()
          : savedCallback.current,
      delay
    )
    return () => clearInterval(id)
  }, [delay])
}
