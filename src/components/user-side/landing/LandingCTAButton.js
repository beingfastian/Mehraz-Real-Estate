import Image from "next/image";
import Link from "next/link";

const LandingCTAButton = ({
  text,
  icon,
  tagline1,
  tagline2,
  className = "",
  imgesClassesHolder,
      href,
  textClassName = "",
}) => {

  
  const bgTransitionStyles =
    "relative z-[1] before:bg-gradient-to-r before:from-accent-dark-blue before:via-accent-dark-blue before:to-accent-sea-green before:opacity-0 before:z-[-1] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:rounded-sm hover:before:opacity-100 before:transition-opacity before:duration-300";
  

  return (
    <>
      <Link
        href={href}
        className={`f-col items-start justify-center  px-11 lg:px-8 sm:px-4 shadow-btn border-2 border-white text-white uppercase bg-no-repeat bg-center bg-cover ${bgTransitionStyles} ${className}`}>
        <div className="flex items-center justify-start gap-3">
          <div className="!w-16 md:!w-14 !h-16 md:!h-14 sm:!w-12 sm:!h-12 relative">
            <div className={imgesClassesHolder.containerClassName}>
              <Image
                src={icon}
                alt="text"
                
                fill
                className={imgesClassesHolder.imgClassName}
              />
            </div>
          </div>
          <div className={`extra-large ${textClassName}`}>{text}</div>
        </div>
        <div className="w-full text-xs tracking-widest md:text-xxs pt-2 md:pt-0  flex items-center  gap-4 md:gap-2">
          <span className="font-light text-nowrap ">{tagline1}</span>
          <span className="bold text-nowrap ">{tagline2}</span>
        </div>
      </Link>
    </>
  );
};

export default LandingCTAButton;

// <div className="absolute bottom-[20%]  left-0">

// <Image
//     src={icon}
//     alt="text"
//     width={91}
//     height={95}
//     className="min-w-[91px] min-h-[95px]"
//   />
// </div>
