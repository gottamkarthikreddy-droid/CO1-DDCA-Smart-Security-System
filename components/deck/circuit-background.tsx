"use client"

import { motion } from "framer-motion"

/**
 * One continuous "wire" that travels across the whole deck.
 * Each slide index reshapes the same path (same command structure so it
 * morphs smoothly): it starts at a switch top-left on slide 1, drifts to the
 * middle on slide 2, folds into a shape on slide 3, and so on.
 * All paths share: M + 4 cubic-bezier segments.
 */
const paths = [
  // 0 - Title: enters top-left from the switch, sweeps down to the right
  "M 60 150 C 320 140, 520 180, 760 240 C 980 296, 1080 430, 1180 560 C 1240 640, 1320 690, 1420 690",
  // 1 - Overview: settles through the middle band
  "M 40 470 C 300 460, 520 470, 760 470 C 1000 470, 1160 470, 1420 470",
  // 2 - Architecture: folds into a stepped shape
  "M 60 240 C 300 240, 360 640, 620 640 C 880 640, 940 240, 1180 240 C 1300 240, 1360 460, 1420 620",
  // 3 - Code: diagonal signal run
  "M 60 700 C 340 640, 520 460, 760 400 C 1000 340, 1160 220, 1420 160",
  // 4 - Logisim: gate-like bracket shape
  "M 40 200 C 360 200, 360 450, 700 450 C 1040 450, 1040 700, 1420 700",
  // 5 - Conclusion: gentle rising curve
  "M 60 640 C 320 600, 520 520, 760 460 C 1000 400, 1180 380, 1420 340",
  // 6 - Thank You: loops back toward the top-left switch to close the circuit
  "M 1420 200 C 1120 220, 980 420, 760 460 C 520 500, 360 360, 60 300",
]

const nodePos = [
  { x: 60, y: 150 },
  { x: 40, y: 470 },
  { x: 60, y: 240 },
  { x: 60, y: 700 },
  { x: 40, y: 200 },
  { x: 60, y: 640 },
  { x: 60, y: 300 },
]

export function CircuitBackground({ index }: { index: number }) {
  const d = paths[index] ?? paths[0]
  const node = nodePos[index] ?? nodePos[0]

  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="wire-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--neon-blue)" />
          <stop offset="100%" stopColor="var(--neon-emerald)" />
        </linearGradient>
        <filter id="wire-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* base wire (dim) */}
      <motion.path
        d={d}
        fill="none"
        stroke="url(#wire-grad)"
        strokeWidth={2}
        strokeLinecap="round"
        opacity={0.16}
        animate={{ d }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* flowing signal pulse traveling along the wire */}
      <motion.path
        d={d}
        fill="none"
        stroke="url(#wire-grad)"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeDasharray="10 380"
        filter="url(#wire-glow)"
        opacity={0.7}
        animate={{ d, strokeDashoffset: [0, -390] }}
        transition={{
          d: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
          strokeDashoffset: {
            duration: 3.4,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          },
        }}
      />

      {/* origin switch node */}
      <motion.g
        animate={{ x: node.x, y: node.y }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <circle r={9} fill="none" stroke="var(--neon-emerald)" strokeWidth={1.5} opacity={0.5} />
        <motion.circle
          r={4}
          fill="var(--neon-emerald)"
          filter="url(#wire-glow)"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </motion.g>
    </svg>
  )
}
