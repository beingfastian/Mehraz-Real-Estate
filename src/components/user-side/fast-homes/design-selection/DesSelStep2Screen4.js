"use client";
import { motion } from "framer-motion";
import {
  DesSelStep2Screen4DesignSlideMax,
  UserScreenSpinner,
} from "@/components";
import { Suspense } from "react";
import useRPS from "@/hooks/useRPS";
import {
  getBookmarkedDesigns,
  setBookmarkedDesigns,
} from "@/utilities/user-side/design-selection/localStorageBookmarks";

const design = {
  id: "hajfkajlj214141",
  area: {
    id: "4jB5BRiha5F45jcGzTEE",
    area: 10,
    category: "UPTO_18",
    unit: "MARLA",
  },
  floors: {
    id: "GywcLbBL9cjTxRq6GgX9",
    name: "FIRST",
  },
  familyUnit: {
    id: "GywcLbBL9cjTxRq6GgX9",
    name: "ONE UNIT",
  },
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  style: {
    name: "MODERN",
    budget: "LOW",
  },
  images: [
    "https://images.unsplash.com/photo-1716547286289-3e650d7bdf7a?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1705179116249-a659af885205?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1613397411189-b13e37c7b5cd?q=80&w=1974&auto=format&fit=crop",
  ],
  designCost: 10000,
  constructionCost: 200000000,
};

const DesSelStep2Screen4 = () => {
  const { router, pathname, searchParams } = useRPS();

  const checkLocalStorageBookmarked = id => {
    const local = getBookmarkedDesigns();
    return local.includes(id);
  };

  const bookmarkLocalStorageHandler = id => {
    const local = getBookmarkedDesigns();
    const updated = local.includes(id)
      ? local.filter(x => x !== id)
      : [...local, id];
    setBookmarkedDesigns(updated);
  };

  const selectDesignHandler = id => {
    const params = new URLSearchParams(searchParams);
    params.set("step", 2);
    params.set("screen", 4);
    params.set("design", id);
    router.push(`${pathname}?${params.toString()}`);
  };

  const claimHandler = () => {
    router.push("/didNotFind");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-full min-h-page-user-inner xl:min-h-page-user-inner-xl max-h-page-user-inner max-w-4xl flex flex-col gap-6 mx-auto px-4 pt-8 pb-6 xl:py-4 sm:p-2">
      <Suspense fallback={<UserScreenSpinner />}>
        <DesSelStep2Screen4DesignSlideMax
          design={design}
          isLocalStorageBookmarked={checkLocalStorageBookmarked(design.id)}
          bookmarkLocalStorageHandler={() =>
            bookmarkLocalStorageHandler(design.id)
          }
          selectDesignHandler={() => selectDesignHandler(design.id)}
        />
      </Suspense>

      <div className="w-full flex justify-center">
        <p
          onClick={claimHandler}
          className="text-[#3F3F3F] opacity-90 text-center text-sm uppercase font-bold cursor-pointer">
          didn&apos;t find what you need?
        </p>
      </div>
    </motion.div>
  );
};

export default DesSelStep2Screen4;
