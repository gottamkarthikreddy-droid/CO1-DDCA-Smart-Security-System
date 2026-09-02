"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
}

const item = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 120, damping: 18 },
  },
}

export function SlideItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  )
}

export function SlideShell({
  eyebrow,
  index,
  total,
  children,
}: {
  eyebrow: string
  index: number
  total: number
  children: ReactNode
}) {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="relative z-10 h-full w-full overflow-y-auto"
    >
      <div className="mx-auto flex min-h-full w-full max-w-6xl flex-col justify-center px-6 py-16 md:px-12">
        <SlideItem>
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-neon-blue/70" />
            <span className="font-mono text-xs uppercase tracking-[0.32em] text-neon-blue">
              {eyebrow}
            </span>
            <span className="ml-auto font-mono text-xs text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
              <span className="text-muted-foreground/40"> / {String(total).padStart(2, "0")}</span>
            </span>
          </div>
          
      <div className="mb-4 flex items-center gap-2">
  <span className="size-2 animate-pulse rounded-full bg-neon-emerald shadow-[0_0_10px_var(--neon-emerald)]" />
  <span className="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
    DDCA · PythonCV
  </span>
      </div>
        </SlideItem>
        {children}
      </div>
    </motion.section>
  )
}
