"use client"

import { SlideItem } from "../slide-shell"

// Replace these with the team's real roll numbers.
const team = [
  { roll: "2620030013", name: "Rithvika Nagasri" },
  { roll: "2620030048", name: "Lokesh Kumar" },
  { roll: "2620030056", name: "Karthik Reddy" },
  { roll: "2620030089", name: "Manideep " },
  { roll: "2620030109", name: "Jalla Sai Bhargav" },
]

export function ThankYouSlide() {
  return (
    <div>
      <SlideItem>
        <h2 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
         <span className="text-neon-emerald text-glow-emerald">Thank You </span>
        </h2>
      </SlideItem>
      <SlideItem>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Presented by our team for the DDCA project.
        </p>
      </SlideItem>

      <SlideItem className="mt-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <div
              key={member.roll}
              className="glass flex flex-col gap-1 rounded-xl border border-border px-5 py-4 transition-all duration-300 hover:border-neon-emerald/50 hover:glow-emerald"
            >
              <span className="font-mono text-lg font-semibold text-foreground">
                {member.roll}
              </span>
              <span className="text-sm text-muted-foreground">
                {member.name}
              </span>
            </div>
          ))}
        </div>
      </SlideItem>

      <SlideItem className="mt-10">
        <p className="text-center font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
          Digital Design &amp; Computer Architecture · PythonCV
        </p>
      </SlideItem>
    </div>
  )
}
