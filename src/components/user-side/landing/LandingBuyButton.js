import Image from "next/image";
import Link from "next/link";

const LandingBuyButton = ({
  text,
  href,
  lightIcon,
  darkIcon,
  tagline,
  taglineMobile,
  imgClass
}) => {
  const bgTransitionStyles =
    "relative z-[1] before:bg-white before:rounded-full before:opacity-0 before:z-[-1] before:absolute before:top-0.5 before:left-0.5 before:right-0.5 before:bottom-0.5 hover:text-accent-dark-blue hover:before:opacity-100 before:transition-opacity before:duration-300 duration-300";

  return (
    <>
      <div className="uppercase text-center w-full">
        <Link
          href={href}
          className={`flex items-center justify-center gap-2 sm:gap-1 text-white bg-gradient-to-r from-accent-dark-blue via-accent-dark-blue to-accent-sea-green rounded-full normal-text-3   text-nowrap group ${bgTransitionStyles}`}>
          <div className="relative">
            <Image
              src={lightIcon}
              alt={text}
              width={32}
              height={32}
              className={`${imgClass} hover-opacity-0`}
            />
            <Image
              src={darkIcon}
              alt={text}
              width={32}
              height={32}
              className={`${imgClass} absolute left-0 top-0 hover-opacity-100`}
            />
          </div>
          <span>{text}</span>
        </Link>
        <Link
          href={href}
          className="block text-nowrap xl:text-balance  lg:hidden mt-1 text-base xl:text-sm sm:text-xs text-[#2F2F2F]">
          {tagline}
        </Link>
        <Link
          href={href}
            className="hidden text-nowrap   lg:block mt-1 text-base xl:text-sm sm:text-xs  tracking-tight  text-[#2F2F2F]">
          {taglineMobile}
        </Link>
      </div>
    </>
  );
};

export default LandingBuyButton;
