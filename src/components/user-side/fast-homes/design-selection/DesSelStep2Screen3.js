"use client";
import { motion } from "framer-motion";
import {
  DesSelStep2Screen3Header,
  DesSelStep2Screen3DesignSlideMax,
  DesSelStep2Screen3DesignSlideMin,
  DesSelStep2Screen3DesignSlideMinMobile,
  UserScreenSpinner,
} from "@/components";
import { useEffect, useState, Suspense } from "react";
import useRPS from "@/hooks/useRPS";
import {
  getBookmarkedDesigns,
  setBookmarkedDesigns,
} from "@/utilities/user-side/design-selection/localStorageBookmarks";

import DesSelStep1Screen2ProjectsCarouselMax from "./DesSelStep1Screen2ProjectsCarouselMax";
import DesSelStep1Screen2ProjectsCarouselMin from "./DesSelStep1Screen2ProjectsCarouselMin";
import DesSelStep1Screen2ProjectsCarouselMinMobile from "./DesSelStep1Screen2ProjectsCarouselMinMobile";

import getStep2Screen3Designs from "@/Firebase/user-side/design-selection/step-2/getStep2Screen3Designs";

const DesSelStep2Screen3 = ({ areas, floors, familyUnits }) => {
  const { router, pathname, searchParams } = useRPS();
  const areaParam = searchParams.get("area");
  const floorParam = searchParams.get("floor");
  const familyUnitParam = searchParams.get("familyUnit");
  const requirementsParam = searchParams.get("requirements");

  const [allDesigns, setAllDesigns] = useState(null);
  const [designsToShow, setDesignsToShow] = useState([]);
  const [designGroups, setDesignGroups] = useState([]);

  const designView = searchParams.get("designView") || "max";
  const [maxViewCurrSlide, setMaxViewCurrSlide] = useState(1);

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        // Get additional search params
        const categoryParam = searchParams.get("category");
        const cityParam = searchParams.get("city");
        const styleParam = searchParams.get("style");
        const styleCostParam = searchParams.get("styleCost");
        const budgetParam = searchParams.get("budget"); // Add budget param

        const designsFromDb = await getStep2Screen3Designs(
          areaParam,
          floorParam,
          familyUnitParam,
          requirementsParam,
          // Additional sorting params
          categoryParam,
          cityParam,
          styleParam,
          styleCostParam,
          budgetParam,
        );
        setAllDesigns(designsFromDb);
      } catch (error) {
        console.error("Error getting design data:", error);
      }
    };
    fetchDesigns();
  }, [
    areaParam,
    floorParam,
    familyUnitParam,
    requirementsParam,
    // Add dependencies for new params
    searchParams.get("category"),
    searchParams.get("city"),
    searchParams.get("style"),
    searchParams.get("styleCost"),
    searchParams.get("budget"),
  ]);

  useEffect(() => {
    if (!designView) {
      changeView("max");
    }
  }, []);

  useEffect(() => {
    if (allDesigns) {
      setDesignsToShow(allDesigns);
      const groups = [];
      for (let i = 0; i < allDesigns.length; i += 4) {
        groups.push(allDesigns.slice(i, i + 4));
      }
      setDesignGroups(groups);
    }
  }, [allDesigns]);

  const changeView = newView => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("designView", newView);
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  useEffect(() => {
    if (allDesigns) {
      setDesignsToShow(allDesigns);

      const groups = [];
      for (let i = 0; i < designsToShow.length; i += 4) {
        groups.push(designsToShow.slice(i, i + 4));
      }
      setDesignGroups(groups);
    }
  }, [allDesigns]);

  const checkLocalStorageBookmarked = id => {
    return getBookmarkedDesigns().includes(id);
  };

  const bookmarkLocalStorageHandler = id => {
    const localStorageBookmarkedDesigns = getBookmarkedDesigns();
    const newBookmarkedDesigns = localStorageBookmarkedDesigns.includes(id)
      ? localStorageBookmarkedDesigns.filter(
          bookmarkedId => bookmarkedId !== id,
        )
      : [...localStorageBookmarkedDesigns, id];
    setBookmarkedDesigns(newBookmarkedDesigns);
  };

  const selectDesignHandler = id => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("step", 2);
    newParams.set("screen", 4);
    newParams.set("design", id);
    newParams.delete("designView");
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const selectSkipDesignHandler = id => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("step", 2);
    newParams.set("screen", 5);
    newParams.set("design", id);
    newParams.delete("designView");
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const claimHandler = () => {
    router.push("/didNotFind");
  };

  return (
    <>
      {!allDesigns ? (
        <UserScreenSpinner />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-full min-h-page-user-inner xl:min-h-page-user-inner-xl max-h-page-user-inner max-w-8xl flex flex-col gap-2 lg:gap-1 lg:max-w-xl mx-auto px-4 pt-8 pb-6 xl:py-4 sm:p-2">
          <DesSelStep2Screen3Header
            designView={designView}
            changeView={changeView}
            areas={areas}
            floors={floors}
            familyUnits={familyUnits}
          />
          {designsToShow.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-lg text-gray-500">No designs found</p>
            </div>
          ) : designView === "max" ? (
            <Suspense fallback={<UserScreenSpinner />}>
              <DesSelStep1Screen2ProjectsCarouselMax
                currentIndex={maxViewCurrSlide}
                setCurrentIndex={setMaxViewCurrSlide}>
                {designsToShow.map(design => (
                  <DesSelStep2Screen3DesignSlideMax
                    key={design.id}
                    selectDesignHandler={() => selectDesignHandler(design.id)}
                    selectSkipDesignHandler={() =>
                      selectSkipDesignHandler(design.id)
                    }
                    design={design}
                    isLocalStorageBookmarked={checkLocalStorageBookmarked(
                      design.id,
                    )}
                    bookmarkLocalStorageHandler={() =>
                      bookmarkLocalStorageHandler(design.id)
                    }
                  />
                ))}
              </DesSelStep1Screen2ProjectsCarouselMax>
            </Suspense>
          ) : (
            designView === "min" && (
              <>
                <Suspense fallback={<UserScreenSpinner />}>
                  <DesSelStep1Screen2ProjectsCarouselMin>
                    {designsToShow.map((design, index) => (
                      <DesSelStep2Screen3DesignSlideMin
                        key={design.id}
                        design={design}
                        selectDesignHandler={() =>
                          selectDesignHandler(design.id)
                        }
                        seeMoreHandler={() => {
                          setMaxViewCurrSlide(index + 1);
                          changeView("max");
                        }}
                        isLocalStorageBookmarked={checkLocalStorageBookmarked(
                          design.id,
                        )}
                        bookmarkLocalStorageHandler={() =>
                          bookmarkLocalStorageHandler(design.id)
                        }
                      />
                    ))}
                  </DesSelStep1Screen2ProjectsCarouselMin>
                </Suspense>
                <Suspense fallback={<UserScreenSpinner />}>
                  <DesSelStep1Screen2ProjectsCarouselMinMobile>
                    {designGroups.map((group, groupIndex) => (
                      <div key={groupIndex}>
                        <div className="px-1 grid grid-cols-2 gap-2 mb-2">
                          {group.map((design, designIndex) => (
                            <DesSelStep2Screen3DesignSlideMinMobile
                              key={design.id}
                              design={design}
                              seeMoreHandler={() => {
                                setMaxViewCurrSlide(
                                  groupIndex * 4 + designIndex + 1,
                                );
                                changeView("max");
                              }}
                              isLocalStorageBookmarked={checkLocalStorageBookmarked(
                                design.id,
                              )}
                              bookmarkLocalStorageHandler={() =>
                                bookmarkLocalStorageHandler(design.id)
                              }
                              selectDesignHandler={() =>
                                selectDesignHandler(design.id)
                              }
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </DesSelStep1Screen2ProjectsCarouselMinMobile>
                </Suspense>
              </>
            )
          )}
          <div className="w-full flex justify-center">
            <div className="flex flex-col items-center gap-2">
              <p
                onClick={claimHandler}
                className="text-[#3F3F3F] w-full opacity-90 text-center ase-text-0 uppercase font-bold cursor-pointer">
                didn&apos;t find what you need?
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default DesSelStep2Screen3;
