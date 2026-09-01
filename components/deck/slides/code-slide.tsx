"use client"

import { useState } from "react"
import { Copy, Check, Terminal } from "lucide-react"
import { SlideItem } from "../slide-shell"

const CODE = `import cv2

cap = cv2.VideoCapture(0)          # webcam or hosted stream URL
_, prev = cap.read()
prev = cv2.GaussianBlur(cv2.cvtColor(prev, cv2.COLOR_BGR2GRAY), (21, 21), 0)

while True:
    ok, frame = cap.read()
    if not ok:
        break

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    gray = cv2.GaussianBlur(gray, (21, 21), 0)

    delta = cv2.absdiff(prev, gray)                # frame differencing
    thresh = cv2.threshold(delta, 25, 255, cv2.THRESH_BINARY)[1]
    thresh = cv2.dilate(thresh, None, iterations=2)

    contours, _ = cv2.findContours(
        thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    motion = any(cv2.contourArea(c) > 900 for c in contours)
    trigger_alarm(motion)          # -> Serial/GPIO logic-high pulse

    prev = gray`

function highlight(line: string) {
  if (line.trimStart().startsWith("#")) {
    return <span className="text-muted-foreground/70 italic">{line}</span>
  }
  const parts = line.split(/(#.*$)/)
  const code = parts[0]
  const comment = parts[1]

  const tokens = code.split(
    /(\bimport\b|\bwhile\b|\bif\b|\bnot\b|\bfor\b|\bin\b|\bany\b|\bbreak\b|\bTrue\b|\bcv2\b|"[^"]*"|\b\d+\b)/g,
  )

  return (
    <>
      {tokens.map((t, i) => {
        if (/^(import|while|if|not|for|in|break|any)$/.test(t))
          return (
            <span key={i} className="font-medium text-neon-blue">
              {t}
            </span>
          )
        if (t === "True")
          return (
            <span key={i} className="text-neon-emerald">
              {t}
            </span>
          )
        if (t === "cv2")
          return (
            <span key={i} className="text-neon-emerald">
              {t}
            </span>
          )
        if (/^"[^"]*"$/.test(t))
          return (
            <span key={i} className="text-amber-300/90">
              {t}
            </span>
          )
        if (/^\d+$/.test(t))
          return (
            <span key={i} className="text-orange-300/90">
              {t}
            </span>
          )
        return <span key={i}>{t}</span>
      })}
      {comment && <span className="text-muted-foreground/70 italic">{comment}</span>}
    </>
  )
}

export function CodeSlide() {
  const [copied, setCopied] = useState(false)
  const lines = CODE.split("\n")

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CODE)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div>
      <SlideItem>
        <h2 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
          The{" "}
          <span className="text-neon-emerald text-glow-emerald">detection loop</span>
        </h2>
      </SlideItem>
      <SlideItem>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Frame differencing keeps the core lightweight enough for real-time use
          on modest hardware, while contour area gates out false positives.
        </p>
      </SlideItem>

      <SlideItem className="mt-6">
        <div className="glass overflow-hidden rounded-2xl">
          <div className="flex items-center gap-2 border-b border-border/60 bg-card/40 px-4 py-3">
            <span className="size-3 rounded-full bg-destructive/70" />
            <span className="size-3 rounded-full bg-amber-400/70" />
            <span className="size-3 rounded-full bg-neon-emerald/70" />
            <div className="ml-3 flex items-center gap-2 text-muted-foreground">
              <Terminal className="size-4" />
              <span className="font-mono text-xs">motion_detect.py</span>
            </div>
            <button
              onClick={copy}
              className="ml-auto inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-xs text-muted-foreground transition-colors hover:bg-neon-blue/10 hover:text-neon-blue"
            >
              {copied ? (
                <>
                  <Check className="size-3.5" /> copied
                </>
              ) : (
                <>
                  <Copy className="size-3.5" /> copy
                </>
              )}
            </button>
          </div>
          <div className="max-h-[46vh] overflow-auto p-4">
            <pre className="font-mono text-[13px] leading-relaxed">
              <code>
                {lines.map((line, i) => (
                  <div key={i} className="grid grid-cols-[2rem_1fr] gap-3">
                    <span className="select-none text-right text-muted-foreground/40">
                      {i + 1}
                    </span>
                    <span className="whitespace-pre-wrap text-foreground/90">
                      {highlight(line) || " "}
                    </span>
                  </div>
                ))}
              </code>
            </pre>
          </div>
        </div>
      </SlideItem>
    </div>
  )
}
