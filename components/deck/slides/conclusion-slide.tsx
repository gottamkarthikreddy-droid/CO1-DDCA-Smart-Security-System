"use client"

import { Check, ArrowUpRight, MessageCircleQuestion } from "lucide-react"
import { SlideItem } from "../slide-shell"

const achievements = [
  "Real-time motion detection running on a commodity webcam feed",
  "Clean software-to-hardware handoff via a single debounced logic bit",
  "Deterministic alarm latching that never drops a detected event",
  "Fully simulated and verified digital controller in Logisim",
]

const future = [
  "Swap frame differencing for a lightweight ML detector to classify people vs. pets",
  "Add a UART keypad for multi-zone ARM/DISARM codes",
  "Fabricate the Logisim design onto an FPGA for true hardware deployment",
  "Stream event logs to a cloud dashboard with timestamps and snapshots",
]

export function ConclusionSlide() {
  return (
    <div>
      <SlideItem>
        <h2 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
          Conclusion &{" "}
          <span className="text-neon-emerald text-glow-emerald">future scope</span>
        </h2>
      </SlideItem>

      <SlideItem className="mt-8">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="glass glow-blue rounded-2xl p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <span className="inline-flex rounded-lg bg-neon-blue/15 p-1.5 text-neon-blue">
                <Check className="size-4" />
              </span>
              What we delivered
            </h3>
            <ul className="space-y-3">
              {achievements.map((a) => (
                <li key={a} className="flex gap-3 text-sm leading-relaxed">
                  <Check className="mt-0.5 size-4 shrink-0 text-neon-blue" />
                  <span className="text-foreground/85">{a}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass rounded-2xl p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <span className="inline-flex rounded-lg bg-neon-emerald/15 p-1.5 text-neon-emerald">
                <ArrowUpRight className="size-4" />
              </span>
              Where it goes next
            </h3>
            <ul className="space-y-3">
              {future.map((f) => (
                <li key={f} className="flex gap-3 text-sm leading-relaxed">
                  <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-neon-emerald" />
                  <span className="text-foreground/85">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SlideItem>

      <SlideItem className="mt-6">
        <div className="glass flex flex-col items-center gap-2 rounded-2xl px-6 py-8 text-center">
          <MessageCircleQuestion className="size-8 text-neon-blue" />
          <h3 className="text-2xl font-bold tracking-tight">Questions & Answers</h3>
          <p className="max-w-md text-pretty text-sm text-muted-foreground">
            Thank you for your attention. The floor is open — happy to discuss
            the vision pipeline, the logic design, or anything in between.
          </p>
        </div>
      </SlideItem>
    </div>
  )
}
