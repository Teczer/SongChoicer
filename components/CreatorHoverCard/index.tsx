import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'

import { FaGithub } from 'react-icons/fa6'

function CreatorHoverCard() {
  return (
    <HoverCard openDelay={150}>
      <HoverCardTrigger asChild>
        <Button
          className="underline px-1 transition-all hover:scale-105"
          variant="link"
        >
          @Teczer
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 font-sans">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="/Mehdoche.jpg" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@Teczer</h4>
            <p className="text-sm">Software Architect - FullStack - DevOps</p>
            <div className="flex items-center pt-2">
              <Link
                target="_blank"
                href={'https://github.com/Teczer'}
                className="text-xs text-muted-foreground mr-2 underline transition-all hover:scale-105"
              >
                Click for go to Github{' '}
              </Link>
              <FaGithub className="h-4 w-4" />
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export default CreatorHoverCard
