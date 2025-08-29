import React, { Suspense, useEffect, useState } from "react";
import UserScreenSpinner from "../UserScreenSpinner";
import { motion } from "framer-motion";
import {
  blackCouch,
  blackFinish,
  blackLeaf,
  blackwall,
  boyIcon,
  buyMaterialDarkIcon,
} from "@/assets";
import Backbutton from "@/components/Backbutton";
import Image from "next/image";
import { searchIcon, messageIcon, tickIcon, rightArrowIcon, chevronRightIcon } from "@/assets";
import UButton from "../UButton";
import DesignCarouselMain from "../designs/DesignCarouselMain";
import BlackButton from "../BlackButton";
import DesSelSelect from "../fast-homes/design-selection/DesSelSelect";
import OrderListCardPr from "./OrderListCardPr";
import { 
  getMaterialCategories, 
  getMaterialsByCategory, 
  getAllMaterials, 
  getFilteredMaterials,
  searchMaterials 
} from "@/utilities/user-side/materials/materialUtils";

const MaterialSelectionPage = ({ setStep, selectedMaterials, setSelectedMaterials }) => {
  const borderColor = "#00000033";
  
  // State management
  const [design, setDesign] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [materialCategories, setMaterialCategories] = useState([]);
  const [hoveredMaterial, setHoveredMaterial] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [popupMaterial, setPopupMaterial] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [showFilter, setShowFilter] = useState(false);
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    city: "Faisalabad",
    cost: "LOW TO HIGH",
    quality: null,
  });

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        // Fetch material categories
        const categoriesResult = await getMaterialCategories();
        if (categoriesResult.type === "SUCCESS") {
          setMaterialCategories(categoriesResult.data);
        }

        // Fetch all materials initially
        const materialsResult = await getAllMaterials();
        if (materialsResult.type === "SUCCESS") {
          setMaterials(materialsResult.data);
        }
      } catch (error) {
        console.error("Error loading initial data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Handle category selection
  useEffect(() => {
    const fetchMaterialsByCategory = async () => {
      if (selectedCategory === "ALL") {
        const result = await getAllMaterials();
        if (result.type === "SUCCESS") {
          setMaterials(result.data);
        }
      } else {
        // Find the category ID based on the selected category name
        const category = materialCategories.find(cat => 
          cat.name?.toUpperCase() === selectedCategory
        );
        
        if (category) {
          const result = await getMaterialsByCategory(category.id);
          if (result.type === "SUCCESS") {
            setMaterials(result.data);
          }
        }
      }
    };

    if (materialCategories.length > 0) {
      fetchMaterialsByCategory();
    }
  }, [selectedCategory, materialCategories]);

  // Handle search
  const handleSearch = async (term) => {
    setSearchTerm(term);
    if (term.trim() === "") {
      // If search is cleared, reload materials based on current category
      if (selectedCategory === "ALL") {
        const result = await getAllMaterials();
        if (result.type === "SUCCESS") {
          setMaterials(result.data);
        }
      } else {
        const category = materialCategories.find(cat => 
          cat.name?.toUpperCase() === selectedCategory
        );
        if (category) {
          const result = await getMaterialsByCategory(category.id);
          if (result.type === "SUCCESS") {
            setMaterials(result.data);
          }
        }
      }
    } else {
      const result = await searchMaterials(term);
      if (result.type === "SUCCESS") {
        setMaterials(result.data);
      }
    }
  };

  // Apply filters
  const applyFilters = async () => {
    setLoading(true);
    try {
      const filterParams = {
        category: selectedCategory === "ALL" ? null : selectedCategory,
        city: filters.city,
        quality: filters.quality,
        sortBy: filters.cost
      };

      const result = await getFilteredMaterials(filterParams);
      if (result.type === "SUCCESS") {
        setMaterials(result.data);
      }
    } catch (error) {
      console.error("Error applying filters:", error);
    } finally {
      setLoading(false);
      setShowFilter(false);
    }
  };

  // Group materials into chunks of 18 for carousel slides
  const groupedMaterials = [];
  if (materials?.length > 0) {
    for (let i = 0; i < materials.length; i += 18) {
      groupedMaterials.push(materials.slice(i, i + 18));
    }
  }

  // Static category icons mapping
  const categoryIcons = [
    {
      icon: blackwall,
      alt: "black wall icon",
      heading: "ALL",
      content: "Categories",
    },
    {
      icon: blackwall,
      alt: "building icon",
      heading: "BUILDING",
      content: "Materials",
    },
    {
      icon: blackFinish,
      alt: "Finish icon",
      heading: "FINISH",
      content: "Interior",
    },
    {
      icon: blackCouch,
      alt: "Couch icon",
      heading: "FURNITURE",
      content: "& Decor",
    },
    {
      icon: blackLeaf,
      alt: "Leaf icon",
      heading: "LANDSCAPE",
      content: "& Garden",
    },
  ];

  const headers = [
    {
      heading: "DURABLE",
      subheading: "LOW-MAINTENANCE",
    },
    {
      heading: "ECO-FRIENDLY",
      subheading: "HEALTHY LIFE",
    },
    {
      heading: "ECONOMIC",
      subheading: "PRICES YOU'LL LOVE",
    },
  ];

  const cities = [
    { id: 1, name: "Karachi" },
    { id: 2, name: "Lahore" },
    { id: 3, name: "Islamabad" },
    { id: 4, name: "Rawalpindi" },
    { id: 5, name: "Faisalabad" },
    { id: 6, name: "Peshawar" },
    { id: 7, name: "Quetta" },
    { id: 8, name: "Multan" },
    { id: 9, name: "Sialkot" },
    { id: 10, name: "Gujranwala" },
    { id: 11, name: "Hyderabad" },
    { id: 12, name: "Sukkur" },
    { id: 13, name: "Bahawalpur" },
    { id: 14, name: "Mardan" },
    { id: 15, name: "Sargodha" },
    { id: 16, name: "Abbottabad" },
    { id: 17, name: "Mingora" },
    { id: 18, name: "Gujrat" },
    { id: 19, name: "Rahim Yar Khan" },
    { id: 20, name: "Muzaffarabad" },
    { id: 21, name: "Jhelum" },
    { id: 22, name: "Sahiwal" },
    { id: 23, name: "Dera Ghazi Khan" },
    { id: 24, name: "Nawabshah" },
    { id: 25, name: "Mirpur Khas" },
  ];

  const budget = [
    { id: 1, name: "High to Low" },
    { id: 2, name: "Low to High" },
  ];

  const handleMaterialHover = (material, event) => {
    setHoveredMaterial(material);
    setPreviewPosition({
      x: event.clientX,
      y: event.clientY
    });
  };

  const handleMaterialLeave = () => {
    setHoveredMaterial(null);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  // Get material count for each category
  const getMaterialCount = (categoryName) => {
    if (categoryName === "ALL") {
      return materials.length;
    }
    return materials.filter(material => {
      const category = materialCategories.find(cat => cat.id === material.category);
      return category?.name?.toUpperCase() === categoryName;
    }).length;
  };

  // Show loading state
  if (loading) {
    return <UserScreenSpinner />;
  }

  return (
    <Suspense fallback={<UserScreenSpinner />}>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="px-8 h-[calc(100vh-6rem)] lg:h-[calc(100vh-4rem)] sm:p-0"
      >
        <div className="max-w-8xl w-auto min-h-[500px] max-h-page-user-inner mx-auto px-4 pt-8 h-[80vh] flex flex-col">
          {/* Top bar */}
          <div className="top-bar flex">
            <div className="left-side">
              <span onClick={() => setStep(prev => prev - 1)}>
                <Backbutton />
              </span>
            </div>
            <div className="right-side">
              <div className="upper-bar flex justify-center items-center">
                <span>
                  <Image
                    src={buyMaterialDarkIcon}
                    priority={true}
                    height={70}
                    width={70}
                    alt="building"
                  />
                </span>
                <div className="flex items-center flex-wrap gap-2">
                  {headers.map((value, index) => (
                    <React.Fragment key={index}>
                      <span className="flex flex-col justify-center items-center">
                        <p className="text-[25px] xl:text-[25px] lg:text-[25px] md:text-[20px] sm:text-[20px] text-light-text">
                          {value.heading}
                        </p>
                        <span className="text-light-text text-[15px] xl:text-[25px] lg:text-[25px] md:text-[20px] sm:text-[20px]">
                          {value.subheading}
                        </span>
                      </span>
                      {index < headers.length - 1 && <span className="mx-1">•</span>}
                    </React.Fragment>
                  ))}
                  
                  {/* Updated search input */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search materials..."
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="text-[20px] w-[285px] h-[45px] rounded-[50px] p-2 ml-[35px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-black border border-1 border-black"
                    />
                    <Image
                      src={searchIcon}
                      alt="Search Icon"
                      className="w-[34px] h-[34px] opacity-60 absolute top-1/2 left-[90%] transform -translate-x-1/2 -translate-y-1/2"
                    />
                  </div>
                  
                  <div className="flex justify-center items-center gap-2">
                    {/* Filter Button */}
                    <div className="relative">
                      <button
                        className="flex items-center gap-2 px-4 py-2 border border-black rounded-md hover:bg-gray-100 transition"
                        onClick={() => setShowFilter(prev => !prev)}
                      >
                        <Image src={boyIcon} alt="Filter" width={20} height={20} />
                        FILTER
                      </button>

                      {/* Filter Popup */}
                      {showFilter && (
                        <div className="absolute top-14 right-0 bg-white border border-gray-300 rounded-lg shadow-lg w-[560px] z-50 p-6">
                          {/* Filter content - same as before */}
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center justify-center gap-2 flex-1">
                              <Image
                                src={boyIcon}
                                alt="Filter Icon"
                                width={40}
                                height={40}
                                className="opacity-50"
                              />
                              <p className="text-[20px] uppercase font-[400] font-[FONTSPRING DEMO - Proxima Nova] text-black/80">
                                Filter
                              </p>
                            </div>
                            <button
                              onClick={() => setShowFilter(false)}
                              className="text-[#2f2f2f] hover:text-black text-[24px] leading-none"
                            >
                              ×
                            </button>
                          </div>

                          <div className="border-b border-black opacity-30 mb-4"></div>

                          {/* City & Cost Dropdowns */}
                          <div className="flex gap-4 mb-6">
                            <div className="flex flex-col w-1/2 items-center mx-[35px]">
                              <label className="text-black/90 mb-3 uppercase font-[FONTSPRING DEMO - Proxima Nova] font-semibold text-[18px]">
                                CITY
                              </label>
                              <DesSelSelect
                                options={[
                                  { label: "SELECT CITY", value: "" },
                                  ...cities.map((city) => ({ label: city.name, value: city.name })),
                                ]}
                                selectedOption={filters.city}
                                selectHandler={(value) => handleFilterChange("city", value)}
                                customStyle={{
                                  container: { height: "44px", border: "1px solid rgba(40,40,40,0.6)" },
                                  text: { fontSize: "14px", fontWeight: 400 },
                                  chevronContainer: { width: "50px", height: "44px" },
                                  chevronIcon: { fontSize: "16px" },
                                }}
                              />
                            </div>

                            <div className="flex flex-col w-1/2 items-center mx-[35px]">
                              <label className="text-black/90 mb-3 uppercase font-[FONTSPRING DEMO - Proxima Nova] font-semibold text-[18px]">
                                COST
                              </label>
                              <DesSelSelect
                                options={budget.map((b) => ({ label: b.name, value: b.name }))}
                                selectedOption={filters.cost}
                                selectHandler={(value) => handleFilterChange("cost", value)}
                                customStyle={{
                                  container: { height: "44px", border: "1px solid rgba(40,40,40,0.6)" },
                                  text: { fontSize: "14px", fontWeight: 400 },
                                  chevronContainer: { width: "50px", height: "44px" },
                                  chevronIcon: { fontSize: "16px" },
                                }}
                              />
                            </div>
                          </div>

                          <div className="border-b border-black opacity-30 mb-4"></div>

                          {/* Quality Rating Tags */}
                          <div className="flex justify-between items-start mb-4 px-2">
                            <div className="flex flex-col text-center">
                              <span className="font-[FONTSPRING DEMO - Proxima Nova] font-normal text-[18px] text-[rgba(47,47,47,0.7)] uppercase">
                                SPECIFIC QUALITY
                              </span>
                              <span className="font-[FONTSPRING DEMO - Proxima Nova] font-bold text-[18px] text-[rgba(47,47,47,0.7)] uppercase">
                                RATINGS
                              </span>
                            </div>

                            <div className="flex gap-3">
                              {[
                                { label: "0–5", color: "#F8D570" },
                                { label: "6–7", color: "#00B9FF" },
                                { label: "8–10", color: "#00FF80" },
                              ].map(({ label, color }) => (
                                <button
                                  key={label}
                                  className={`flex items-center justify-between w-[80px] h-[32px] px-3 py-1 rounded-[6px] border border-[#C0C0C0] transition-all duration-200 ${
                                    filters.quality === label
                                      ? "bg-white font-bold shadow-sm"
                                      : "bg-white hover:bg-gray-100"
                                  }`}
                                  onClick={() =>
                                    handleFilterChange("quality", filters.quality === label ? null : label)
                                  }
                                >
                                  {label}
                                  <span
                                    className="w-[14px] h-[14px] rounded-full ml-2"
                                    style={{ backgroundColor: color }}
                                  ></span>
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="border-b border-black opacity-30 mb-4"></div>

                          {/* Apply Button */}
                          <div className="flex justify-center mt-4">
                            <button
                              onClick={applyFilters}
                              className="w-[220px] h-[48px] bg-[#323232] text-white text-[13px] font-semibold uppercase rounded-[4px] shadow-md hover:bg-[#1f1f1f] transition"
                            >
                              APPLY CHANGES
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <UButton
                      text={
                        <span className="flex justify-around items-center">
                          <Image
                            src={messageIcon}
                            className="mr-[10px]"
                            alt="message icon here"
                          />
                          <span>GET</span>
                          <span className="font-bold ml-[2px]">ASSIST</span>
                        </span>
                      }
                      className="px-[17px] py-[11px] hover:text-black"
                    />
                  </div>
                </div>
              </div>
              <hr />
            </div>
          </div>

          <div className="Material-container relative flex-1">
            {/* Updated Category Navigation */}
            <aside className="flex gap-3 px-4 overflow-x-hidden -ml-[-250px]">
              {["ALL", "BUILDING", "FINISH", "FURNITURE", "LANDSCAPE"].map((category, i) => {
                const count = getMaterialCount(category);
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedCategory(category)}
                    className={`whitespace-nowrap px-[50px] py-2 rounded-full border font-medium
                      ${
                        selectedCategory === category
                          ? "bg-gray-800 text-white border-black font-semibold"
                          : "bg-white text-black border-black hover:bg-gray-800 hover:text-white"
                      }`}
                  >
                    {category} ({count})
                  </button>
                );
              })}
            </aside>

            {/* Left sidebar with category icons */}
            <div className={`left-side absolute h-[80%] top-[263px] transform -translate-y-1/2 rounded-full flex justify-around items-center flex-col w-[58px] hover:min-w-[200px] hover:w-auto hover:rounded-lg border border-1 border-[${borderColor}] bg-[#ffffff] z-10`}>
              {categoryIcons?.map((value, index) => {
                const categoryName = value.heading;
                return (
                  <React.Fragment key={index}>
                    {index !== 0 && <div className="w-[70%] h-[1px] bg-gray-300 mx-auto" />}
                    
                    <div
                      className={`rounded-full bg-bg-dull w-full overflow-hidden flex cursor-pointer
                        ${selectedCategory === categoryName 
                          ? 'bg-[#fce7cc] border border-[#e6a87f]' 
                          : 'bg-gray-100 hover:bg-gray-200 border border-transparent'}
                      `}
                      onClick={() => setSelectedCategory(categoryName)}
                    >
                      <Image
                        src={value.icon}
                        alt={value.alt}
                        height={100}
                        width={100}
                        className="h-[55px] w-[55px] p-1"
                      />
                      <div className="flex flex-col justify-center items-center">
                        <p className="text-sm font-medium">{value?.heading}</p>
                        <span className="text-xxs">{value?.content}</span>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>

            {/* Material Grid with Carousel */}
            <div className="right-carousel sm:w-full w-[90%] ml-auto relative">
              <div className="h-full w-full">
                {materials.length === 0 ? (
                  <div className="flex items-center justify-center h-[50vh]">
                    <div className="text-center">
                      <p className="text-xl text-gray-600 mb-4">No materials found</p>
                      <p className="text-gray-500">Try adjusting your filters or search terms</p>
                    </div>
                  </div>
                ) : (
                  <DesignCarouselMain slidesCount={groupedMaterials.length}>
                    {groupedMaterials.map((materialGroup, slideIndex) => (
                      <div 
                        key={slideIndex}
                        className="h-[58vh] min-h-[460px] lg:h-[48vh] sm:h-[36vh] xs:h-[30vh] rounded-xl overflow-hidden !grid grid-cols-6 grid-rows-3 gap-x-2 gap-y-4 p-2"
                      >
                        {materialGroup.map((material, index) => {
                          const isSelected = selectedMaterials.some(selected => selected.id === material.id);
                          return (
                            <div
                              key={material.id}
                              className={`w-[145px] h-[150px] rounded-[10px] relative border border-gray-200 shadow-md hover:shadow-lg transition-all flex flex-col ${
                                isSelected ? 'bg-[#21254A]' : 'bg-white'
                              }`}
                              onMouseEnter={(e) => handleMaterialHover(material, e)}
                              onMouseLeave={handleMaterialLeave}
                              onClick={(e) => {
                                if (isSelected) {
                                  setSelectedMaterials(prev => 
                                    prev.filter(selected => selected.id !== material.id)
                                  );
                                  setPopupMaterial(null);
                                } else {
                                  setSelectedMaterials(prev => [...prev, material]);
                                  setPopupMaterial({
                                    ...material,
                                    rowIndex: Math.floor(index / 6)
                                  });
                                }
                              }}
                            >
                              {/* Material Image */}
                              <div className="w-full h-[85px] rounded-[5px] overflow-hidden relative">
                                {material.image ? (
                                  <Image
                                    src={material.image}
                                    layout="fill"
                                    objectFit="cover"
                                    alt={`Material ${material.name}`}
                                    className="w-full h-full"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-500 text-xs">No Image</span>
                                  </div>
                                )}
                                
                                {/* Tick icon - shown only when selected */}
                                {isSelected && (
                                  <Image
                                    src={tickIcon}
                                    width={28}
                                    height={28}
                                    alt="Tick"
                                    className="absolute top-[4px] right-[4px] opacity-100 transition-opacity duration-200"
                                  />
                                )}
                              </div>

                              {/* Material Info */}
                              <div className="mt-1 flex-grow flex flex-col px-1">
                                <h4 className={`font-bold text-[15px] uppercase truncate font-[FONTSPRING DEMO - Proxima Nova] ${
                                  isSelected ? 'text-white' : 'text-[#1f1f1f]'
                                }`}>
                                  {material.name}
                                </h4>
                                <p className={`text-[14px] truncate font-[FONTSPRING DEMO - Proxima Nova] ${
                                  isSelected ? 'text-white opacity-80' : 'text-[#2f2f2f]'
                                }`}>
                                  {material.vendor}
                                </p>
                                <p className={`text-[14px] mt-auto rounded-full px-2 py-0.5 truncate font-[Milliard] ${
                                  isSelected 
                                    ? 'bg-white/20 text-white border-white' 
                                    : 'bg-gray-100 border border-black opacity-80'
                                }`}>
                                  {material.rate} PKR/{material.orderedAs}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </DesignCarouselMain>
                )}
              </div>

              {/* Popup Card */}
              {popupMaterial && (
                <div 
                  className="absolute z-50" 
                  style={{
                    left: `-150px`,
                    top: `${popupMaterial.rowIndex === 0 ? '335px' : '0px'}`
                  }}
                >
                  <OrderListCardPr 
                    selectedMaterials={selectedMaterials}
                    material={popupMaterial}
                    onClose={() => setPopupMaterial(null)}
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-end items-center mt-1">
            <BlackButton onclickfunction={() => setStep(prev => prev + 1)} />
          </div>
        </div>
      </motion.section>
    </Suspense>
  );
};

export default MaterialSelectionPage;