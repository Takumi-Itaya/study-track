"use client"

import type React from "react"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

type AnimationType =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "fade"
  | "scale"
  | "slide-up"

interface AnimateOnScrollProps {
  children: React.ReactNode
  animation?: AnimationType
  delay?: number
  duration?: number
  className?: string
  threshold?: number
}

const animationClasses: Record<AnimationType, { initial: string; animate: string }> = {
  "fade-up": {
    initial: "opacity-0 translate-y-8",
    animate: "opacity-100 translate-y-0",
  },
  "fade-down": {
    initial: "opacity-0 -translate-y-8",
    animate: "opacity-100 translate-y-0",
  },
  "fade-left": {
    initial: "opacity-0 translate-x-8",
    animate: "opacity-100 translate-x-0",
  },
  "fade-right": {
    initial: "opacity-0 -translate-x-8",
    animate: "opacity-100 translate-x-0",
  },
  fade: {
    initial: "opacity-0",
    animate: "opacity-100",
  },
  scale: {
    initial: "opacity-0 scale-95",
    animate: "opacity-100 scale-100",
  },
  "slide-up": {
    initial: "opacity-0 translate-y-12",
    animate: "opacity-100 translate-y-0",
  },
}

export function AnimateOnScroll({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 700,
  className,
  threshold = 0.1,
}: AnimateOnScrollProps) {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold })

  const { initial, animate } = animationClasses[animation]

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all ease-out",
        isInView ? animate : initial,
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// Staggered animation container
interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  animation?: AnimationType
  baseDelay?: number
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 100,
  animation = "fade-up",
  baseDelay = 0,
}: StaggerContainerProps) {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 })
  const { initial, animate } = animationClasses[animation]

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <div
              key={index}
              className={cn(
                "transition-all duration-700 ease-out",
                isInView ? animate : initial
              )}
              style={{
                transitionDelay: `${baseDelay + index * staggerDelay}ms`,
              }}
            >
              {child}
            </div>
          ))
        : children}
    </div>
  )
}
