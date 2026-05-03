"use client"

import { GlobePolaroids } from "@/components/ui/cobe-globe-polaroids"

export default function GlobePolaoridsDemo() {
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-black p-8 overflow-hidden">
      <div className="w-full max-w-lg">
        <GlobePolaroids />
      </div>
    </div>
  )
}
