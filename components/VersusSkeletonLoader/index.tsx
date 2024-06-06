import { Skeleton } from '@/components/ui/skeleton'
import { AuroraBackground } from '../ui/aurora-background'

export function VersusSkeletonLoader() {
  return (
    <AuroraBackground className="flex flex-col items-center justify-start pt-10 gap-8 sm:gap-20 sm:justify-center">
      <Skeleton className="h-4 w-1/4" />
      <ul className="flex flex-col gap-6 items-center justify-center sm:gap-40 sm:flex-row">
        {Array.from({ length: 2 }).map((_, index) => (
          <li
            key={index}
            className="w-[250px] h-[250px] border border-white/[0.1] flex flex-col space-y-3 rounded-xl p-4 sm:h-[400px] sm:w-[400px]"
          >
            <Skeleton className="h-full w-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px] sm:w-[250px]" />
              <Skeleton className="h-4 w-[150px] sm:w-[200px]" />
            </div>
          </li>
        ))}
      </ul>
    </AuroraBackground>
  )
}
