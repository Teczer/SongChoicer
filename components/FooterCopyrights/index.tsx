import Image from 'next/image'
import Link from 'next/link'

const FooterCopyrights: React.FC = () => {
  return (
    <p className="text-primary font-mono flex items-center justify-start gap-1 absolute text-xs bottom-4">
      <span className="mr-1">Made with ❤️ by </span>
      <Link
        href={'https://github.com/Teczer'}
        target="_blank"
        className="block font-bold transition-all tracking-wide underline hover:scale-110"
      >
        @Teczer_
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
