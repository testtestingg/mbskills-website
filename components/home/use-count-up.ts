"use client"

import { useEffect, useRef, useState } from "react"

/**
 * useCountUp
 * Counts a value from 0 → `target` over `duration` ms using requestAnimationFrame.
 * The animation only starts once `start` becomes true (so callers can trigger it
 * when the section scrolls into view). GPU-friendly: only updates a number, the
 * DOM text node changes — no layout thrash.
 */
export function useCountUp(target: number, start: boolean, duration = 1600) {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number | null>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!start || startedRef.current) return
    startedRef.current = true

    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // easeOutCubic for a natural deceleration
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [start, target, duration])

  return value
}

/** Formats a number with thousands separators (e.g. 40000 -> "40,000"). */
export function formatNumber(n: number) {
  return n.toLocaleString("en-US")
}
