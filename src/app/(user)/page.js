import getBannerImage from "@/Firebase/user-side/getBannerImage";
import { LandingBuyButton, LandingCTAButton, ULinkButton } from "@/components";
import localFont from "next/font/local";
import {
  buyMaterialDarkIcon,
  buyMaterialLightIcon,
  buyPropertyDarkIcon,
  buyPropertyLightIcon,
  fastHomeIcon,
  high_CustomIcon,
  defaultLandingImage,
  fastHomesIcon,
  highCustomLightIcon,
  landingImage,
} from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { safe_global } from "../../assets";
import Line from "@/components/common/Line/Line";

const isocpeur = localFont({
  src: [
    {
      path: "../fonts/isocpeur/isocpeurRegular.ttf",
      style: "normal",
      weight: "400",
    },
  ],
  display: "swap",
});

export const metadata = {
  title: "Mehraz | Home",
  description: "Mehraz - Building the new Pakistan",
  openGraph: {
    title: "Mehraz | Home",
    description: "Mehraz - Building the new Pakistan",
    url: "localhost:3000/",
  },
};

export default async function UserPage() {
  const landingImage = await getBannerImage("landing-image.png");

  return (
    <div className="relative w-full container py-14 lg:py-10 md:py-6 sm:py-4 f-col">
      {/* top section start */}
      <div className="flex flex-row sm:flex-col-reverse justify-between md:items-start sm:justify-start items-center text-3xl lg:text-2xl md:text-lg sm:text-base uppercase w-full gap-0 md:gap-1">
        <h3 className=" text-[#6C6C6C] w-fit">
          EXPLORE . MEET YOUR NEEDS . LIVE BETTER
        </h3>
        <Link href="/" className="text-accent-black text-end w-fit sm:w-full">
          already a client?
        </Link>
      </div>
      {/* top section end */}

      {/* middle section start */}
      <div className="flex  w-full flex-row lg:flex-col  justify-between items-start lg:items-center h-full slogan-container-pad gap-2">
        {/* left side  start */}
        <div className="uppercase w-full ">
          <div className="h-full relative w-full">
            <div className="animate-landing-slide-1 landing-left-slider--container">
              <h1 className="gradient-text landing-page-title">
                <span className="text-nowrap">Building the</span>
                <br />
                <b className="text-nowrap">new pakistan</b>
              </h1>
              <h2 className=" bg-accent-gold slogan-container">
                <b>save</b> time . effort . money
              </h2>
            </div>
            <div className="absolute top-0 left-0 animate-landing-slide-2 opacity-0 landing-left-slider--container">
              <h1 className="gradient-text landing-page-title">
                <b className="text-nowrap">emerging rise</b>
                <br /> <span className="text-nowrap">for people</span>
              </h1>
              <h2 className="bg-accent-green slogan-container">
                <b>live healthy</b> live longer
              </h2>
            </div>
            <div className="absolute top-0 left-0 animate-landing-slide-3 opacity-0 landing-left-slider--container">
              <h1 className="landing-page-title  gradient-text">
                <span className="text-nowrap">
                  {" "}
                  <b>united</b> we&apos;ll{" "}
                </span>
                <br /> <b className="text-nowrap">grow</b>
              </h1>
              <h2 className="bg-accent-gold slogan-container ">
                <b>economic</b> now & forever
              </h2>
            </div>
          </div>
          <h4
            className={`text-[#686868]/70 text-xl md:text-lg sm:text-base tracking-ultra-wide sm:tracking-widest  py-3.5 lg:py-2.5 md:py-2 sm:py-1 ${isocpeur.className} word-spacing`}>
            LAND . DESIGN . MATERIALS . CONSTRUCTION
          </h4>
          <h5 className="max-w-[650px] w-full text-xs md:text-xxs text-accent-black/60 border-t border-b border-[rgba(0,0,0,15%)] py-1.5 md:py-1 sm:py-0.5 tracking-[0.08em] md:tracking-[0.04em] sm:tracking-normal">
            for all land authorities DHA, LDA, FDA, CDA, KDA & more
          </h5>
          <div className="flex slogan-container-pad items-center gap-[26px] lg:gap-[16px] md:gap-[12px] sm:gap-[8px]">
            <ULinkButton
              href="/why-mehraz"
              text="why mehraz?"
              color="gold-gold"
              className="normal-text-2 "
            />
            <div className="flex item-center gap-3.5 lg:gap-3 md:gap-2 sm:gap-1">
              <Image
                src={safe_global}
                alt="live safe"
                className="w-11 md:w-10  h-10 md:h-9 sm:w-8 sm:h-8"
              />
              <div className="f-col justify-center text-base md:text-sm  sm:text-xs text-accent-black leading-none">
                <p>
                  <span>build</span>
                  <span className="text-accent-light-green bold">
                    {" "}
                    Better .
                  </span>
                </p>
                <p>
                  <span>build</span>
                  <span className="text-accent-light-green bold">
                    {" "}
                    sustainable .
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* left side end */}

        {/* right side start */}
        <div className="pt-3 lg:mt-5 bg-dull/0 max-w-[511px] relative w-full rounded-2xl shadow-btn-shadow-2  border-2 border-accent-1-extra-light">
          <div className="w-full h-full flex flex-col items-start px-1 pt-6 lg:pt-5 md:pt-4 sm:pt-2  rounded-[20px] lg:rounded-[16px] md:rounded-[12px] sm:rounded-[8px] ">
            <Link
              href="/"
              className="text-large text-accent-black uppercase self-center">
              design & build <b>dreams</b>
            </Link>
            <div className="f-col py-[30px] lg:py-[28px] md:py-[16px] sm:py-[8px] !pb-16 sm:!pb-10 w-full gap-2">
              <LandingCTAButton
                text={
                  <span>
                    <b>fast</b> homes
                  </span>
                }
                textClassName="pt-2"
                href={"/fast-homes"}
                icon={fastHomeIcon}
                className="w-[103%] h-[135px] lg:h-[125px] md:h-[112px] sm:h-[88px] bg-landing-cta-1 rounded-l-lg rounded-r-full sm:w-[101%] before:rounded-l-lg before:rounded-r-full"
                imgesClassesHolder={{
                  containerClassName: "relative",
                  imgClassName:
                    "!w-16 md:!w-14  !h-16 md:!h-14  sm:!w-12 sm:!h-12F object-cover !relative",
                }}
                tagline1={"explore all types of homes"}
                tagline2={"10x+ cheaper than custom"}
              />
              <div className="flex-center mx-auto w-[80%] relative h-[18px] md:h-[14px] sm:h-[10px] ">
                <Line className="w-full h-[1px] bg-accent-black/30" />
                <span className="text-base md:text-sm text-accent-black/60 bg-white uppercase absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 px-[17px] md:px-[12px] sm:px-[8px] ">
                  or
                </span>
              </div>
              <LandingCTAButton
                text={
                  <>
                    high <b>custom</b>
                  </>
                }
                textClassName="pt-2.5"
                href={"/high-custom"}
                icon={high_CustomIcon}
                imgesClassesHolder={{
                  containerClassName:
                    "absolute  bottom-0 md:bottom-[10%] xs:bottom-0 left-0",
                  imgClassName:
                    "min-w-[91px] lg:min-w-[80px] md:min-w-[70px] sm:min-w-[60px] min-h-[95px] lg:min-h-[85px] md:min-h-[75px] sm:min-h-[65px] !relative",
                }}
                className="w-full h-[115px] lg:h-[105px] md:h-[90px] sm:h-[75px] bg-landing-cta-2 rounded-lg before:rounded-lg"
                tagline1={"all types of projects"}
                tagline2={"most customized service"}
              />
            </div>
          </div>
          <p className="bg-accent-dark-blue absolute bottom-0 left-0 right-0 text-center text-white font-bold flex-center gap-1 uppercase rounded-b-2xl text-base py-0.5 h-[21px]">
            <span className="text-accent-gold-light">90 % OFF</span> launch
            month
          </p>
        </div>

        {/* right side end */}
      </div>
      {/* middle section end */}

      {/* bottom section start */}
      <div className="flex flex-row gap-2 pt-4 md:flex-col justify-between items-end">


        <div className="max-w-[650px] w-full h-[140px] block sm:hidden">
          <Image
            src={landingImage}
            alt="landing image"
            className="w-full h-full"
            width={650}
            height={140}
          />
        </div>

         
        <div className="f-col items-end  sm:items-start w-full ">
          <div className="bg-accent-gold-light h-2 sm:h-1.5 w-[72%]  md:w-10/12 mt-8 lg:mt-6 md:mt-2  "></div>
          <div className="max-w-[712px] w-full  md:w-full flex gap-4 items-stretch justify-end sm:justify-start  mt-8 lg:mt-6 md:mt-4  xs:gap-0.5 flex-1">
            <LandingBuyButton
              text={
                <>
                  buy <b>property</b>
                </>
              }
              href={"/buy-property"}
              darkIcon={buyPropertyDarkIcon}
              lightIcon={buyPropertyLightIcon}
              tagline={"BUY only land, BUILDING OR APARTMENT?"}
              taglineMobile={"land . building . apartment"}
              imgClass={"w-10 h-auto xl:w-8 sm:w-7"}
            />
            <LandingBuyButton
              text={
                <>
                  buy <b>materials</b>
                </>
              }
              href={"buy-materials"}
              darkIcon={buyMaterialDarkIcon}
              lightIcon={buyMaterialLightIcon}
              tagline={"GREY STRUCTURE . FINISHING . LANDSCAPING"}
              taglineMobile={"GREY . FINISH . LANDSCAPE"}
              imgClass={"w-[50px] h-[40px] xl:h-auto xl:w-8 sm:w-7"}
              textClass={"text-xl"}
            />
          </div>
        </div>
      </div>
      {/* bottom section end */}
      {/* <!-- Add this somewhere in your HTML, e.g., in your main component or page --> */}
      <div id="recaptcha-container"></div>
    </div>
  );
}
