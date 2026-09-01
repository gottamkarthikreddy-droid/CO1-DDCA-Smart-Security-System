"use client"

import { Video, ScanEye, Binary, Siren } from "lucide-react"
import { SlideItem } from "../slide-shell"

const stats = [
  { value: "~30", unit: "fps", label: "Feed processed" },
  { value: "<80", unit: "ms", label: "Detect → trigger" },
  { value: "1-bit", unit: "", label: "Digital signal out" },
]

const pillars = [
  {
    icon: Video,
    title: "Capture",
    body: "A webcam or hosted video stream is decoded frame-by-frame with OpenCV VideoCapture.",
    accent: "blue" as const,
  },
  {
    icon: ScanEye,
    title: "Detect",
    body: "Frame differencing and contour thresholds isolate meaningful motion from noise.",
    accent: "blue" as const,
  },
  {
    icon: Binary,
    title: "Signal",
    body: "A debounced boolean is emitted over Serial/GPIO as a clean logic-level pulse.",
    accent: "emerald" as const,
  },
  {
    icon: Siren,
    title: "Actuate",
    body: "The Logisim latch holds the alarm state until an operator issues a reset.",
    accent: "emerald" as const,
  },
]

export function OverviewSlide() {
  return (
    <div>
      <SlideItem>
        <h2 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
          Software eyes,{" "}
          <span className="text-neon-blue text-glow-blue">hardware reflexes</span>
        </h2>
      </SlideItem>
      <SlideItem>
        <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          The system splits responsibility cleanly: Python handles the messy,
          probabilistic world of computer vision, then reduces it to a single
          deterministic bit that discrete digital logic can trust and latch.
        </p>
      </SlideItem>

      <SlideItem className="mt-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="group glass relative overflow-hidden rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1"
            >
              <div
                className={`mb-4 inline-flex rounded-xl p-2.5 ${
                  p.accent === "blue"
                    ? "bg-neon-blue/10 text-neon-blue"
                    : "bg-neon-emerald/10 text-neon-emerald"
                }`}
              >
                <p.icon className="size-5" />
              </div>
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>
              <div
                className={`absolute inset-x-0 bottom-0 h-px scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${
                  p.accent === "blue" ? "bg-neon-blue" : "bg-neon-emerald"
                }`}
              />
            </div>
          ))}
        </div>
      </SlideItem>

      <SlideItem className="mt-6">
        <div className="glass flex flex-wrap items-center gap-8 rounded-2xl px-6 py-4">
          {stats.map((s) => (
            <div key={s.label} className="flex items-baseline gap-1.5">
              <span className="font-mono text-2xl font-bold text-neon-emerald text-glow-emerald">
                {s.value}
              </span>
              <span className="font-mono text-sm text-muted-foreground">
                {s.unit}
              </span>
              <span className="ml-2 text-sm text-muted-foreground">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </SlideItem>
    </div>
  )
}
