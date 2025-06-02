import Link from 'next/link';

import CreatorHoverCard from '../CreatorHoverCard';

const FooterCopyrights: React.FC = () => {
  return (
    <p className="text-primary font-mono flex items-center justify-start gap-1 text-xs pb-2">
      <span>Made with ❤️ by </span>
      <Link target="_blank" href={'https://github.com/Teczer'}>
        <CreatorHoverCard />
      </Link>
    </p>
  );
};

export default FooterCopyrights;
