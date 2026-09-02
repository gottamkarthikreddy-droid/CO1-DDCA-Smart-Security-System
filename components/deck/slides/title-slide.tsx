"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Cpu, Camera } from "lucide-react"
import { SlideItem } from "../slide-shell"

const meta = [
  { label: "Course", value: "Digital Design & Computer Architecture" },
  { label: "Group - 1", value: "2620030013 2620030048 2620030056 2620030089 2620030109" },
  { label: "Instructor", value: "Dayarnab Baidya" },
  { label: "Term", value: "Y-2026 Trimester-1" },
]

export function TitleSlide() {
  return (
    <div className="flex flex-col items-start">
      <SlideItem>
        <div className="glass glow-blue mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5">
          <ShieldCheck className="size-4 text-neon-emerald" />
          <span className="font-mono text-xs uppercase tracking-[0.28em] text-foreground/80">
            Computer Vision · Digital Logic
          </span>
        </div>
      </SlideItem>

      <SlideItem>
        <h1 className="text-balance text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
          Smart Security System
          <span className="mt-2 block bg-gradient-to-r from-neon-blue via-neon-blue to-neon-emerald bg-clip-text text-transparent">
            Python CV x Logisim
          </span>
        </h1>
      </SlideItem>

      <SlideItem>
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          An Open-CV powered camera input made using combinational logic simulated in Logisim. The camera
          makes an alarm noise when armed and when motion is detected.
        </p>
      </SlideItem>

      <SlideItem className="mt-10 w-full">
        <div className="grid w-full max-w-3xl grid-cols-2 gap-3 md:grid-cols-4">
          {meta.map((m) => (
            <div
              key={m.label}
              className="glass rounded-xl px-4 py-3 transition-colors hover:border-neon-blue/50"
            >
              <div className="font-mono text-[10px] uppercase tracking-widest text-neon-blue">
                {m.label}
              </div>
              <div className="mt-1 text-sm font-medium text-foreground/90">
                {m.value}
              </div>
            </div>
          ))}
        </div>
      </SlideItem>

      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 lg:block"
      >
        <div className="relative">
          <Camera className="size-40 text-neon-blue/20" strokeWidth={0.7} />
          <Cpu
            className="absolute -bottom-6 -left-10 size-24 text-neon-emerald/25"
            strokeWidth={0.7}
          />
        </div>
      </motion.div>
    </div>
  )
}
