import { Suspense } from 'react'

import SongResultCard from '@/components/SongResultCard'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { AlbumCardSkeleton } from '@/components/AlbumCardSkeleton'

export default function Home() {
  return (
    <AuroraBackground className="pt-16">
      <Suspense
        fallback={
          <div className="w-screen min-h-screen flex items-center justify-center">
            <AlbumCardSkeleton />
          </div>
        }
      >
        <SongResultCard />
      </Suspense>
    </AuroraBackground>
  )
}
