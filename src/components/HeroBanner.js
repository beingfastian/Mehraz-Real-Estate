"use client";

import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";
import { ULinkButton } from "@/components";
import { safe_global } from "@/assets";

const isocpeur = localFont({
  src: [{ path: "../app/fonts/isocpeur/isocpeurRegular.ttf", weight: "400", style: "normal" }],
  display: "swap",
});

export default function HeroBanner() {
  return (
    <div className="uppercase w-full">
      {/* Top */}
      <div className="flex flex-row sm:flex-col-reverse justify-between items-center uppercase text-3xl lg:text-2xl md:text-lg sm:text-base gap-1">
        <h3 className="text-[#6C6C6C]">EXPLORE . MEET YOUR NEEDS . LIVE BETTER</h3>
      </div>

      {/* Hero Slider */}
      <div className="relative w-full h-[180px] my-6">
        {/* Slide 1 */}
        <div className="absolute inset-0 animate-landing-slide-1 landing-left-slider--container">
          <h1 className="gradient-text landing-page-title leading-tight">
            <span>Building the</span><br />
            <b>new pakistan</b>
          </h1>
          <h2 className="bg-accent-gold slogan-container mt-2"><b>save</b> time . effort . money</h2>
        </div>
        {/* Slide 2 */}
        <div className="absolute inset-0 opacity-0 animate-landing-slide-2 landing-left-slider--container">
          <h1 className="gradient-text landing-page-title leading-tight">
            <b>emerging rise</b><br /><span>for people</span>
          </h1>
          <h2 className="bg-accent-green slogan-container mt-2"><b>live healthy</b> live longer</h2>
        </div>
        {/* Slide 3 */}
        <div className="absolute inset-0 opacity-0 animate-landing-slide-3 landing-left-slider--container">
          <h1 className="gradient-text landing-page-title leading-tight">
            <span><b>united</b> we’ll</span><br /><b>grow</b>
          </h1>
          <h2 className="bg-accent-gold slogan-container mt-2"><b>economic</b> now & forever</h2>
        </div>
      </div>

      {/* Subheading & Text */}
      <h4 className={`text-[#686868]/70 text-xl tracking-ultra-wide py-3 ${isocpeur.className}`}>
        LAND . DESIGN . MATERIALS . CONSTRUCTION
      </h4>
      <h5 className="text-xs text-accent-black/60 border-y border-[rgba(0,0,0,15%)] py-2">
        for all land authorities DHA, LDA, FDA, CDA, KDA & more
      </h5>

{/* Button + Safe graphic */}
<div className="flex items-center gap-6 mt-8 mb-4"> {/* <- added mb-4 */}
  <ULinkButton href="/why-mehraz" text="why mehraz?" color="gold-gold" />
  <div className="flex items-center gap-3">
    <Image src={safe_global} alt="live safe" className="w-10 h-10" />
    <div className="text-sm text-accent-black leading-tight">
      <p>
        build <span className="text-accent-light-green font-bold">Better.</span>
      </p>
      <p>
        build <span className="text-accent-light-green font-bold">sustainable.</span>
      </p>
    </div>
  </div>
</div>
    </div>
  );
}
