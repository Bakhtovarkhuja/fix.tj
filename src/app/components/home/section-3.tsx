'use client'

import React, { forwardRef, useRef } from 'react'

import { AnimatedBeam } from '@/components/magicui/animated-beam'
import { cn } from '@/lib/utils'
import { BrickWall, ClockArrowUp, Earth, Laptop, Shield, Star } from 'lucide-react'

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode; label?: string }
>(({ className, children, label }, ref) => {
  return (
    <div className="flex flex-col items-center gap-2 relative z-20">
      <div
        ref={ref}
        className={cn(
          'flex h-16 w-16 items-center justify-center rounded-full border-2 bg-white p-3 shadow-md transition-transform hover:scale-105',
          className
        )}
      >
        {children}
      </div>
      {label && (
        <span className="max-w-[100px] text-center text-sm font-medium text-gray-800 select-none">
          {label}
        </span>
      )}
    </div>
  )
})

Circle.displayName = 'Circle'

export function Section3() {
  const containerRef = useRef<HTMLDivElement>(null)
  const div1Ref = useRef<HTMLDivElement>(null)
  const div2Ref = useRef<HTMLDivElement>(null)
  const div3Ref = useRef<HTMLDivElement>(null)
  const div4Ref = useRef<HTMLDivElement>(null)
  const div5Ref = useRef<HTMLDivElement>(null)
  const div6Ref = useRef<HTMLDivElement>(null)
  const div7Ref = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className="relative mx-auto mt-[-60px] flex h-[600px] w-full max-w-[1200px] items-center justify-center overflow-visible rounded-xl p-6"
    >
      <div className="absolute inset-0 z-10 pointer-events-none">
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div1Ref}
          toRef={div4Ref}
          curvature={-105}
          endYOffset={-10}
        />
        <AnimatedBeam containerRef={containerRef} fromRef={div2Ref} toRef={div4Ref} />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div3Ref}
          toRef={div4Ref}
          curvature={105}
          endYOffset={10}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div5Ref}
          toRef={div4Ref}
          curvature={-105}
          endYOffset={-10}
          reverse
        />
        <AnimatedBeam containerRef={containerRef} fromRef={div6Ref} toRef={div4Ref} reverse />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div7Ref}
          toRef={div4Ref}
          curvature={105}
          endYOffset={10}
          reverse
        />
      </div>
      <div className="flex flex-col gap-20 w-full max-w-4xl relative z-20">
        <div className="flex justify-between px-10">
          <Circle ref={div1Ref} label="Бозхурдҳо">
            <Icons.googleDrive />
          </Circle>
          <Circle ref={div5Ref} label="Вақти кӯтоҳ">
            <Icons.googleDocs />
          </Circle>
        </div>
        <div className="flex justify-between px-10 mt-[-55px]">
          <Circle ref={div2Ref} label="Бехатар">
            <Icons.notion />
          </Circle>
          <Circle ref={div4Ref} className="h-20 w-20">
            <Icons.openai />
          </Circle>
          <Circle ref={div6Ref} label="Беҳтарин устоҳо">
            <Icons.zapier />
          </Circle>
        </div>
        <div className="flex justify-between px-10 mt-[-25px]">
          <Circle ref={div3Ref} label="Муосир">
            <Icons.whatsapp />
          </Circle>
          <Circle ref={div7Ref} label="Глобалӣ">
            <Icons.messenger />
          </Circle>
        </div>
      </div>
    </div>
  )
}

const iconSizeClass = 'w-6 h-6'

const Icons = {
  notion: () => <Shield className={`text-blue-600 ${iconSizeClass}`} />,
  openai: () => (
    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500">
      <span className="text-white font-bold text-base">F</span>
    </div>
  ),
  googleDrive: () => <Star className={`text-yellow-400 ${iconSizeClass}`} />,
  whatsapp: () => <Laptop className={`text-green-400 ${iconSizeClass}`} />,
  googleDocs: () => <ClockArrowUp className={`text-green-400 ${iconSizeClass}`} />,
  zapier: () => <BrickWall className={`text-yellow-400 ${iconSizeClass}`} />,
  messenger: () => <Earth className={`text-blue-600 ${iconSizeClass}`} />,
}
