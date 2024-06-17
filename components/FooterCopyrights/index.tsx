import Image from 'next/image'
import Link from 'next/link'

import CreatorHoverCard from '../CreatorHoverCard'

const FooterCopyrights: React.FC = () => {
  return (
    <p className="text-primary font-mono flex items-center justify-start gap-1 text-xs pb-2">
      <span>Made with ❤️ by </span>
      <Link target="_blank" href={'https://github.com/Teczer'}>
        <CreatorHoverCard />
      </Link>
      <span className="text-lg">•</span>
      <span className="mr-1">Provided by</span>
      <Link
        href="https://open.spotify.com"
        target="_blank"
        className="block transition-all hover:scale-110"
      >
        <Image
          className="w-10 border border-black border-opacity-10 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)] rounded-sm dark:border-white dark:border-opacity-10 dark:drop-shadow-[0_1px_4px_rgba(255,255,255,0.1)]"
          src="/spotify-logo.png"
          alt="Spotify Logo"
          width={512}
          height={512}
        />
      </Link>
    </p>
  )
}

export default FooterCopyrights
