import { useEffect, useLayoutEffect } from 'react'

/**
 *  useIsomorphicLayoutEffect hook - checks for a defined window to return useEffect after the DOM is painted or returns useLayoutEffect for an undefined hook.
 */
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default useIsomorphicLayoutEffect
