'use client'
import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode
  showRadialGradient?: boolean
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        'pt-20 min-h-[100svh] w-full absolute inset-0 sm:dark:bg-grid-small-transparent sm:bg-grid-small-transparent',
        'sm:absolute sm:min-h-[100svh] sm:w-full sm:inset-0 sm:overflow-x-hidden',
        className
      )}
      {...props}
    >
      {/* BACKGROUND MOBILE */}
      <div className="sm:hidden absolute inset-0 dark:bg-grid-white/[0.06] bg-grid-black/[0.04] [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)] pointer-events-none select-none"></div>
      {/* BACKGROUND DESKTOP */}
      <div
        className={cn(
          'h-full absolute pointer-events-none inset-0',
          'sm:[--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]',
          'sm:[--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]',
          'sm:[--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]',
          'sm:[background-image:var(--white-gradient),var(--aurora)]',
          'sm:dark:[background-image:var(--dark-gradient),var(--aurora)]',
          'sm:[background-size:300%,_200%]',
          'sm:[background-position:50%_50%,50%_50%]',
          'sm:filter sm:blur-[10px] sm:invert sm:dark:invert-0',
          'sm:after:content-[""] sm:after:absolute sm:after:inset-0 sm:after:[background-image:var(--white-gradient),var(--aurora)]',
          'sm:after:dark:[background-image:var(--dark-gradient),var(--aurora)]',
          'sm:after:[background-size:200%,_100%]',
          'sm:after:animate-aurora sm:after:[background-attachment:fixed] sm:after:mix-blend-difference',
          'sm:pointer-events-none sm:absolute sm:-inset-[10px] sm:opacity-50 sm:will-change-transform',
          showRadialGradient &&
            'sm:[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]',
          '[mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]'
        )}
      ></div>
      {children}
    </div>
  )
}
