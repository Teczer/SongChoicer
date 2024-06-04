import Image from "next/image";
import { FaArrowDownLong, FaArrowRightLong } from "react-icons/fa6";

const HeroSectionImage: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-5 md:px-10 md:gap-20 md:flex-row md:absolute md:bottom-16">
      {/* DARK THEME */}
      <div className="hidden items-center justify-center flex-col gap-5 md:gap-20 dark:flex md:flex-row">
        <div className="hero-video">
          <Image
            quality={100}
            className="w-[600px] rounded-lg border border-white border-opacity-10"
            width={1728}
            height={1117}
            src="/step1.png"
            alt="No albums found"
          />
        </div>
        <FaArrowRightLong className="text-primary text-3xl text-md hidden md:block" />
        <FaArrowDownLong className="text-primary text-3xl text-md block md:hidden" />
        <div className="hero-video">
          <Image
            quality={100}
            className="w-[600px] rounded-lg border border-white border-opacity-10"
            width={1728}
            height={1117}
            src="/step2.png"
            alt="No albums found"
          />
        </div>
      </div>
      {/* LIGHT THEME */}
      <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:gap-20 dark:hidden">
        <div className="hero-video-light">
          <Image
            quality={100}
            className="w-[600px] rounded-lg border border-black border-opacity-10"
            width={1728}
            height={1117}
            src="/step1-light.png"
            alt="No albums found"
          />
        </div>
        <FaArrowRightLong className="text-primary text-3xl hidden md:block" />
        <FaArrowDownLong className="text-primary text-3xl block md:hidden" />
        <div className="hero-video-light">
          <Image
            quality={100}
            className="w-[600px] rounded-lg border border-black border-opacity-10"
            width={1728}
            height={1117}
            src="/step2-light.png"
            alt="No albums found"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSectionImage;
