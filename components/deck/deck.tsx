"use client"

import { useCallback, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { TitleSlide } from "./slides/title-slide"
import { OverviewSlide } from "./slides/overview-slide"
import { ArchitectureSlide } from "./slides/architecture-slide"
import { CodeSlide } from "./slides/code-slide"
import { LogisimSlide } from "./slides/logisim-slide"
import { ConclusionSlide } from "./slides/conclusion-slide"
import { ThankYouSlide } from "./slides/thankyou-slide"
import { SlideShell } from "./slide-shell"
import { CircuitBackground } from "./circuit-background"

const slides = [
  { eyebrow: "Title", node: TitleSlide },
  { eyebrow: "Executive Summary", node: OverviewSlide },
  { eyebrow: "System Architecture", node: ArchitectureSlide },
  { eyebrow: "Python CV Implementation", node: CodeSlide },
  { eyebrow: "Logisim Circuit Logic", node: LogisimSlide },
  { eyebrow: "Conclusion", node: ConclusionSlide },
  { eyebrow: "Thank You", node: ThankYouSlide },
]

const labels = [
  "Title",
  "Overview",
  "Architecture",
  "Python CV",
  "Logisim",
  "Conclusion",
  "Thank You",
]

export function Deck() {
  const [[index, dir], setState] = useState<[number, number]>([0, 0])
  const total = slides.length

  const go = useCallback(
    (next: number, direction: number) => {
      if (next < 0 || next >= total) return
      setState([next, direction])
    },
    [total],
  )

  const paginate = useCallback(
    (d: number) => setState(([i]) => {
      const next = i + d
      if (next < 0 || next >= total) return [i, 0]
      return [next, d]
    }),
    [total],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault()
        paginate(1)
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault()
        paginate(-1)
      } else if (e.key === "Home") {
        go(0, -1)
      } else if (e.key === "End") {
        go(total - 1, 1)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [paginate, go, total])

  const Active = slides[index].node
  const progress = ((index + 1) / total) * 100

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-background">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
      <div className="pointer-events-none absolute -left-32 top-0 size-[38rem] rounded-full bg-neon-blue/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 size-[38rem] rounded-full bg-neon-emerald/10 blur-[120px]" />
      <CircuitBackground index={index} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background/80" />

      {/* slide viewport */}
      <div className="relative h-full w-full">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={index}
            custom={dir}
            initial={{ opacity: 0, x: dir >= 0 ? 60 : -60, filter: "blur(8px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: dir >= 0 ? -60 : 60, filter: "blur(8px)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <SlideShell eyebrow={slides[index].eyebrow} index={index} total={total}>
              <Active />
            </SlideShell>
          </motion.div>
        </AnimatePresence>
      </div>

      

      {/* controls */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 md:right-12">
        <button
          onClick={() => paginate(-1)}
          disabled={index === 0}
          aria-label="Previous slide"
          className="glass inline-flex size-11 items-center justify-center rounded-full text-foreground transition-all hover:glow-blue disabled:opacity-30 disabled:hover:shadow-none"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          onClick={() => paginate(1)}
          disabled={index === total - 1}
          aria-label="Next slide"
          className="glass inline-flex size-11 items-center justify-center rounded-full text-foreground transition-all hover:glow-blue disabled:opacity-30 disabled:hover:shadow-none"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      {/* dot nav */}
      <nav
        aria-label="Slide navigation"
        className="absolute bottom-7 left-6 z-20 hidden items-center gap-3 md:left-12 md:flex"
      >
        {labels.map((label, i) => (
          <button
            key={label}
            onClick={() => go(i, i > index ? 1 : -1)}
            className="group flex items-center gap-2"
            aria-label={`Go to ${label}`}
            aria-current={i === index}
          >
            <span
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-8 bg-neon-blue shadow-[0_0_10px_var(--neon-blue)]"
                  : "w-1.5 bg-muted-foreground/40 group-hover:bg-muted-foreground"
              }`}
            />
          </button>
        ))}
      </nav>

      {/* progress bar */}
      <div className="absolute inset-x-0 bottom-0 z-20 h-1 bg-border/40">
        <motion.div
          className="h-full bg-gradient-to-r from-neon-blue to-neon-emerald"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
          style={{ boxShadow: "0 0 12px var(--neon-blue)" }}
        />
      </div>
    </main>
  )
}
