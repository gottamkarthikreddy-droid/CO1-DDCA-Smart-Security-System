"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Video, ScanEye, Cable, CircuitBoard, Siren, ChevronRight } from "lucide-react"
import { SlideItem } from "../slide-shell"

const steps = [
  {
    icon: Video,
    label: "Video Feed",
    tag: "input",
    detail:
      "OpenCV grabs frames from a USB webcam or an RTSP/HTTP hosted stream at ~30 fps, converting each frame to grayscale and applying a Gaussian blur to suppress sensor noise.",
  },
  {
    icon: ScanEye,
    label: "OpenCV Processing",
    tag: "vision",
    detail:
      "Consecutive frames are subtracted (absdiff), thresholded, and dilated. findContours locates moving regions; a minimum area filter rejects flicker and lighting changes.",
  },
  {
    icon: Cable,
    label: "GPIO / Serial",
    tag: "bridge",
    detail:
      "When motion persists past a debounce window, Python writes a single logic-high byte over pySerial (or toggles a GPIO pin) — the handoff from software to hardware.",
  },
  {
    icon: CircuitBoard,
    label: "Digital Logic Controller",
    tag: "logisim",
    detail:
      "In Logisim, the incoming signal is synchronized to a clock, gated by an ARM/DISARM enable, and captured by an SR latch so a momentary pulse becomes a held alarm state.",
  },
  {
    icon: Siren,
    label: "Alarm Actuator",
    tag: "output",
    detail:
      "The latched output drives a buzzer/LED bank. It stays asserted until an operator presses RESET, guaranteeing no event is silently missed.",
  },
]

export function ArchitectureSlide() {
  const [active, setActive] = useState(0)
  const Detail = steps[active].icon

  return (
    <div>
      <SlideItem>
        <h2 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
          Architecture &{" "}
          <span className="text-neon-blue text-glow-blue">signal flow</span>
        </h2>
      </SlideItem>
      <SlideItem>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Select any stage to inspect what happens as data moves from photons to
          a held alarm state.
        </p>
      </SlideItem>

      <SlideItem className="mt-8">
        <div className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-center">
          {steps.map((s, i) => {
            const isActive = i === active
            return (
              <div key={s.label} className="flex items-center lg:flex-1">
                <button
                  onClick={() => setActive(i)}
                  className={`group relative flex w-full flex-col items-center gap-2 rounded-2xl px-3 py-4 text-center transition-all duration-300 ${
                    isActive
                      ? "glass glow-blue"
                      : "border border-transparent hover:bg-card/40"
                  }`}
                >
                  <span
                    className={`inline-flex rounded-xl p-2.5 transition-colors ${
                      isActive
                        ? "bg-neon-blue/15 text-neon-blue"
                        : "bg-card/60 text-muted-foreground group-hover:text-foreground"
                    }`}
                  >
                    <s.icon className="size-5" />
                  </span>
                  <span
                    className={`text-xs font-semibold leading-tight ${
                      isActive ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {s.label}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="arch-active"
                      className="absolute inset-0 -z-10 rounded-2xl"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
                {i < steps.length - 1 && (
                  <ChevronRight className="mx-1 hidden size-5 shrink-0 text-neon-blue/50 lg:block" />
                )}
              </div>
            )
          })}
        </div>
      </SlideItem>

      <SlideItem className="mt-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-start gap-4">
              <span className="inline-flex rounded-xl bg-neon-emerald/10 p-3 text-neon-emerald">
                <Detail className="size-6" />
              </span>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-semibold">{steps[active].label}</h3>
                  <span className="rounded-full border border-neon-emerald/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-neon-emerald">
                    {steps[active].tag}
                  </span>
                </div>
                <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">
                  {steps[active].detail}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </SlideItem>
    </div>
  )
}
