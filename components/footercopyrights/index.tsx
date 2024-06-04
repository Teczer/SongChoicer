import Link from "next/link";

const FooterCopyrights: React.FC = () => {
  return (
    <p className="text-primary font-mono flex gap-1 absolute text-xs bottom-4">
      Made with ❤️ by
      <Link
        href={"https://github.com/Teczer"}
        target="_blank"
        className="block font-bold transition-all tracking-wide hover:scale-110"
      >
        @Teczer_
      </Link>
    </p>
  );
};

export default FooterCopyrights;
