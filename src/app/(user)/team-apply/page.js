"use client";
import { DesignCarouselMain, UserScreenSpinner } from "@/components";
import React, { Suspense, useState } from "react";
import { motion } from "framer-motion";
import { teamLeadData } from "@/components/user-side/team-lead/data/data";
import TeamLeadCard from "@/components/user-side/team-lead/team-lead-card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, ArrowLeft } from "lucide-react";

const TeamApply = () => {
  const router = useRouter();
  const [activeView, setActiveView] = useState(null); // Can be "supplier", "architect", or null

  // 🔹 Group teamLeadData into chunks of 3 (so {1,2,3} per slide)
  const chunkedData = [];
  for (let i = 0; i < teamLeadData.length; i += 3) {
    chunkedData.push(teamLeadData.slice(i, i + 3));
  }

  // Supplier Content
  const SupplierContent = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="text-white max-w-4xl mx-auto"
    >
      <div className="mb-8">
        <button
          onClick={() => setActiveView(null)}
          className="flex items-center gap-2 text-white hover:text-gray-300 mb-6"
        >
          <ArrowLeft size={24} />
          Back to Main
        </button>
        
        <h1 className="text-4xl lg:text-3xl md:text-2xl font-bold mb-6">Become a Verified Mehraz Supplier</h1>
        <p className="text-lg mb-8">
          List your products on Mehraz, get rated for quality and sustainability, and reach serious buyers across Pakistan — we market, you supply.
        </p>

        <h2 className="text-2xl lg:text-xl font-semibold mb-4">What To Send Us</h2>
        <ul className="list-disc pl-5 mb-8 space-y-2">
          <li>Product name, specs, composition, relevant info</li>
          <li>Price (and whether it's per piece, set, or by measurement)</li>
          <li>Areas you can supply to, delivery days, timing, details</li>
          <li>Product images, additional material data (certifications etc.)</li>
        </ul>

        <div className="border-t border-white/30 my-8"></div>

        <h3 className="text-xl font-semibold mb-4">How It Works</h3>
        <ul className="list-disc pl-5 mb-8 space-y-2">
          <li>We list your products in the Mehraz Material Section.</li>
          <li>We market and bring clients directly to you.</li>
          <li>When an order is placed, Mehraz charges a small commission (10%) from the full payment — the rest is sent to you.</li>
          <li>Clients may pay Mehraz in full or partially; any remaining amount is paid to you upon delivery.</li>
        </ul>

        <p className="mb-4 text-lg">
          Products must be emailed to <span className="font-semibold">admin@mehraz.pk</span> with Contact Info.
        </p>
        <p className="font-bold text-xl">
          Build with Mehraz. Grow your sales.
        </p>
      </div>
    </motion.div>
  );

  // Architect Content
  const ArchitectContent = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="text-white max-w-4xl mx-auto"
    >
      <div className="mb-8">
        <button
          onClick={() => setActiveView(null)}
          className="flex items-center gap-2 text-white hover:text-gray-300 mb-6"
        >
          <ArrowLeft size={24} />
          Back to Main
        </button>
        
        <h1 className="text-4xl lg:text-3xl md:text-2xl font-bold mb-6">Turn Your Designs Into Ongoing Income — Mehraz Partner Program</h1>
        <p className="text-lg mb-8">
          Partner with Mehraz to turn your home projects into recurring income. Instead of working for one client at a time, we market and sell your designs to many — and you get 50% of every sale.
        </p>

        <h2 className="text-2xl lg:text-xl font-semibold mb-4">Home Design Submission</h2>
        <p className="mb-6">
          Plan, Model source files e.g., RVT, DWG, SKP, High-Quality Rendered Images(4:3), Trailer Video (15 sec max, 4:3), One Full Video (10 min max, 16:9), a project description, location, area, with techniques used, the Full Technical MEP Drawing Set, relevant docs.
        </p>

        <div className="space-y-4 mb-8">
          <div>
            <p className="font-bold text-lg mb-2">Review</p>
            <p>Unusable or incomplete projects will be dismissed.</p>
          </div>

          <div>
            <p className="font-bold text-lg mb-2">If Accepted</p>
            <p>We issue a 50/50 partnership contract; you earn 50% every time your design is purchased on Mehraz.</p>
          </div>

          <div>
            <p className="font-bold text-lg mb-2">Changes</p>
            <p>You must be available without delay for any client-requested modifications; these are paid separately.</p>
          </div>

          <div>
            <p className="font-bold text-lg mb-2">Conduct</p>
            <p>Any issue in dealing with the architect (delays, non-response, misrepresentation, etc.) may result in immediate contract termination.</p>
          </div>
        </div>

        <p className="mb-4 text-lg">
          All submissions must be emailed to <span className="font-semibold">admin@mehraz.pk</span>
        </p>
        <p className="font-bold text-xl">
          Stop chasing single commissions — let your designs keep earning.
        </p>
      </div>
    </motion.div>
  );

  // Main Content
  const MainContent = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative container w-auto px-8 sm:px-4 h-full flex flex-col gap-10 py-10"
    >
      {/* === TOP HEADING WITH CROSS === */}
      <div className="relative flex justify-center items-center">
        <h2 className="text-[40px] lg:text-[36px] md:text-[32px] sm:text-[28px] text-center text-white font-normal">
          WORK WITH <span className="font-bold">MEHRAZ</span>
        </h2>
        <button
          onClick={() => router.back()}
          className="absolute right-0 top-1 text-white hover:text-gray-300">
          <X size={36} />
        </button>
      </div>

      {/* === 3 APPLY BUTTONS === */}
      <div className="flex flex-wrap justify-center items-center gap-6">
        <div className="flex flex-col">
          <div className="text-center">
            Become Our <b>Partner Architect</b>
          </div>
          <div className="rounded-xl py-3 px-6 mt-2 border-white border-[2px]">
            <button
              onClick={() => setActiveView("architect")}
              className="w-[18rem] sm:w-[15rem] h-[3.5rem] flex justify-center items-center rounded-full border-2 border-white bg-white hover:bg-transparent text-black hover:text-white transition">
              <span className="font-bold uppercase tracking-wide">
                Be <b>Partner Architect</b>
              </span>
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-center">
            Supply <b>Materials, & Products</b>
          </div>
          <div className="rounded-xl py-3 px-6 mt-2 border-white border-[2px]">
            <button
              onClick={() => setActiveView("supplier")}
              className="w-[18rem] sm:w-[15rem] h-[3.5rem] flex justify-center items-center rounded-full border-2 border-white bg-white hover:bg-transparent text-black hover:text-white transition">
              <span className="font-bold uppercase tracking-wide">
                Be <b>Material Supplier</b>
              </span>
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-center">
            Apply As <b>Labour/Contractor/Other</b>
          </div>
          <div className="rounded-xl py-3 px-6 mt-2 border-white border-[2px]">
            <Link
              href="/apply-at-mehraz"
              className="w-[18rem] sm:w-[15rem] h-[3.5rem] flex justify-center items-center rounded-full border-2 border-white bg-white hover:bg-transparent text-black hover:text-white transition">
              <span className="font-bold uppercase tracking-wide">
                <b>Apply</b> at Mehraz
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* === TEAM HEADING === */}
      <div className="flex justify-center">
        <h2 className="text-[32px] md:text-[28px] sm:text-[24px] font-bold border-b-2 border-white pb-2">
          MEHRAZ TEAM
        </h2>
      </div>

      {/* === TEAM CARDS CAROUSEL === */}
      <DesignCarouselMain slidesCount={chunkedData.length}>
        {chunkedData.map((group, idx) => (
          <div
            key={idx}
            className="!grid !grid-cols-3 gap-6 px-4 place-items-stretch">
            {group.map((value, i) => (
              <div key={i} className="w-full">
                <TeamLeadCard item={value} />
              </div>
            ))}
          </div>
        ))}
      </DesignCarouselMain>
    </motion.div>
  );

  return (
    <Suspense fallback={UserScreenSpinner}>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative min-h-[calc(100vh-84px)] bg-no-repeat bg-center bg-cover bg-team transparent-bg-layer z-[1] text-white">
        
        {/* Conditional rendering based on active view */}
        {activeView === null && <MainContent />}
        {activeView === "supplier" && (
          <div className="relative container w-auto px-8 sm:px-4 h-full flex flex-col justify-center py-10">
            <SupplierContent />
          </div>
        )}
        {activeView === "architect" && (
          <div className="relative container w-auto px-8 sm:px-4 h-full flex flex-col justify-center py-10">
            <ArchitectContent />
          </div>
        )}
      </motion.section>
    </Suspense>
  );
};

export default TeamApply;