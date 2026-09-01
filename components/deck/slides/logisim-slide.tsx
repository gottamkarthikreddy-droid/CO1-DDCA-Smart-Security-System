"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Power, Activity, ShieldCheck, ShieldAlert } from "lucide-react"
import { SlideItem } from "../slide-shell"

const components = [
  {
    name: "NOT Gate",
    spec: "inverter",
    body: "Inverts the ARM switch so the disarmed state reads as a clean logic-1 disable line.",
  },
  {
    name: "AND Gate",
    spec: "motion · arm",
    body: "Asserts only when live motion AND an armed system are both true at the same instant.",
  },
  {
    name: "OR Gate",
    spec: "auto + manual",
    body: "Combines the auto motion trigger with a manual panic input into one alarm request.",
  },
  {
    name: "Output Driver",
    spec: "armed / disarmed",
    body: "Purely combinational — the output follows the inputs directly with no stored state.",
  },
]

function Node({
  label,
  sub,
  hot,
  className = "",
}: {
  label: string
  sub?: string
  hot?: boolean
  className?: string
}) {
  return (
    <div
      className={`flex min-w-[92px] flex-col items-center justify-center rounded-lg border px-3 py-2 text-center transition-all duration-300 ${
        hot
          ? "border-neon-emerald/70 bg-neon-emerald/10 glow-emerald"
          : "border-border bg-card/50"
      } ${className}`}
    >
      <span className="font-mono text-xs font-semibold text-foreground">
        {label}
      </span>
      {sub && (
        <span className="font-mono text-[10px] text-muted-foreground">{sub}</span>
      )}
    </div>
  )
}

function Wire({ hot }: { hot?: boolean }) {
  return (
    <div className="relative h-px flex-1 self-center bg-border">
      <motion.div
        className="absolute inset-0 origin-left bg-neon-emerald"
        initial={false}
        animate={{ scaleX: hot ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      />
    </div>
  )
}

function Toggle({
  on,
  onClick,
  label,
  icon,
}: {
  on: boolean
  onClick: () => void
  label: string
  icon: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
        on
          ? "border-neon-blue/50 bg-neon-blue/10 text-neon-blue"
          : "border-border bg-card/50 text-muted-foreground"
      }`}
      aria-pressed={on}
    >
      {icon}
      {label}: {on ? "1" : "0"}
    </button>
  )
}

export function LogisimSlide() {
  const [motion_, setMotion] = useState(false)
  const [armed, setArmed] = useState(true)

  // Pure combinational logic: alarm = motion AND armed
  const alarm = motion_ && armed

  return (
    <div>
      <SlideItem>
        <h2 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
          Logisim{" "}
          <span className="text-neon-blue text-glow-blue">combinational logic</span>
        </h2>
      </SlideItem>
      <SlideItem>
        <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">
          Toggle the input switches and watch the signal flow through the gates.
          The output is purely combinational: the system is armed and fires only
          when motion is present on an armed system.
        </p>
      </SlideItem>

      <SlideItem className="mt-8">
        <div className="glass rounded-2xl p-5">
          {/* schematic */}
          <div className="flex flex-wrap items-stretch gap-2 md:flex-nowrap">
            <div className="flex flex-col gap-2">
              <Node label="MOTION" sub={motion_ ? "1" : "0"} hot={motion_} />
              <Node label="ARM" sub={armed ? "1" : "0"} hot={armed} />
            </div>
            <Wire hot={motion_ && armed} />
            <Node label="AND" sub="motion·arm" hot={alarm} />
            <Wire hot={alarm} />
            <div
              className={`flex min-w-[132px] flex-col items-center justify-center rounded-lg border px-3 py-2 transition-all duration-300 ${
                alarm
                  ? "border-destructive/70 bg-destructive/15 text-destructive"
                  : armed
                    ? "border-neon-emerald/60 bg-neon-emerald/10 text-neon-emerald"
                    : "border-border bg-card/50 text-muted-foreground"
              }`}
            >
              {alarm ? (
                <ShieldAlert className="size-5 animate-pulse" />
              ) : (
                <ShieldCheck className="size-5" />
              )}
              <span className="mt-0.5 font-mono text-[10px] uppercase tracking-wider">
                {alarm ? "Alarm · Armed" : armed ? "System Armed" : "System Disarmed"}
              </span>
            </div>
          </div>

          {/* truth table */}
          <div className="mt-5 overflow-hidden rounded-lg border border-border/60">
            <table className="w-full font-mono text-xs">
              <thead>
                <tr className="border-b border-border/60 bg-card/40 text-muted-foreground">
                  <th className="px-3 py-2 text-left font-medium">MOTION</th>
                  <th className="px-3 py-2 text-left font-medium">ARM</th>
                  <th className="px-3 py-2 text-left font-medium">OUTPUT</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [0, 0],
                  [0, 1],
                  [1, 0],
                  [1, 1],
                ].map(([m, a]) => {
                  const out = m === 1 && a === 1
                  const active = (motion_ ? 1 : 0) === m && (armed ? 1 : 0) === a
                  return (
                    <tr
                      key={`${m}${a}`}
                      className={`border-b border-border/40 last:border-0 transition-colors ${
                        active ? "bg-neon-blue/10 text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      <td className="px-3 py-1.5">{m}</td>
                      <td className="px-3 py-1.5">{a}</td>
                      <td className={`px-3 py-1.5 ${out ? "text-destructive" : "text-neon-emerald"}`}>
                        {out ? "ALARM" : a === 1 ? "armed" : "disarmed"}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* controls */}
          <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-border/60 pt-4">
            <Toggle
              on={motion_}
              onClick={() => setMotion((m) => !m)}
              label="Motion"
              icon={<Activity className="size-4" />}
            />
            <Toggle
              on={armed}
              onClick={() => setArmed((a) => !a)}
              label="Arm"
              icon={<Power className="size-4" />}
            />
          </div>
        </div>
      </SlideItem>

      <SlideItem className="mt-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {components.map((c) => (
            <div
              key={c.name}
              className="rounded-xl border border-border bg-card/40 p-4 transition-colors hover:border-neon-blue/40"
            >
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-sm font-semibold text-foreground">
                  {c.name}
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-wider text-neon-blue">
                  {c.spec}
                </span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </SlideItem>
    </div>
  )
}
