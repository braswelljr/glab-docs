import { useState, useEffect } from 'react'

/**
 * useWindowSize hook - is used to determine the with and height of a browser window.
 * @returns { width: number; height: number}
 */
export default function useWindowSize(): { width?: number; height?: number } {
  const isClient = typeof window === 'object'
  const [windowSize, setWindowSize] = useState({
    width: isClient ? window.innerWidth : undefined,
    height: isClient ? window.innerHeight : undefined
  })

  useEffect(() => {
    if (!isClient) {
      return
    }

    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isClient])

  return windowSize
}
