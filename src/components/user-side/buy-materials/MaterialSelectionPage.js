import React, { Suspense, useState } from "react";
import UserScreenSpinner from "../UserScreenSpinner";
import { motion } from "framer-motion";
import {
  blackCouch,
  blackFinish,
  blackLeaf,
  blackwall,
  boyIcon,
  buyMaterialDarkIcon,
  residentialImage,
} from "@/assets";
import Backbutton from "@/components/Backbutton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { searchIcon, messageIcon, tickIcon } from "@/assets";
import UButton from "../UButton";
import BlackButton from "../BlackButton";
import { FaExpandAlt } from "react-icons/fa"; // Add this at the top


const MaterialSelectionPage = ({ setStep }) => {
const [selectedMaterialId, setSelectedMaterialId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [previewMaterial, setPreviewMaterial] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [showZoom, setShowZoom] = useState(false);
  const router = useRouter();
  const [filters, setFilters] = useState({
    city: "Faisalabad",
    cost: "LOW TO HIGH",
    quality: null,
  });

  const materials = [
    {
      icon: blackwall,
      alt: "black wall icon",
      heading: "BUILDING",
      content: "Grey Structure",
      description: "High-quality construction materials for building structures",
      materials: [
        { name: "Concrete", vendor: "BuildRight Inc", price: "$50/sqft", image: residentialImage, rating: 8 },
        { name: "Bricks", vendor: "ClayMasters", price: "$0.75/unit", image: residentialImage, rating: 7 },
        { name: "Steel", vendor: "MetalWorks", price: "$2.50/kg", image: residentialImage, rating: 9 },
        { name: "Cement", vendor: "CementCo", price: "$8/bag", image: residentialImage, rating: 6 },
        { name: "Rebar", vendor: "SteelMasters", price: "$1.20/ft", image: residentialImage, rating: 7 },
        { name: "Lumber", vendor: "TimberTech", price: "$3.50/board-ft", image: residentialImage, rating: 5 },
      ]
    },
    {
      icon: blackFinish,
      alt: "Finish icon",
      heading: "FINISH",
      content: "Interior",
      description: "Premium finishing materials for interior spaces",
      materials: [
        { name: "Paint", vendor: "ColorCoat", price: "$30/gallon", image: residentialImage, rating: 8 },
        { name: "Tiles", vendor: "FloorMasters", price: "$4/sqft", image: residentialImage, rating: 7 },
        { name: "Wallpaper", vendor: "WallDecor", price: "$25/roll", image: residentialImage, rating: 6 },
        { name: "Flooring", vendor: "WoodStyle", price: "$7/sqft", image: residentialImage, rating: 9 },
        { name: "Lighting", vendor: "LumaTech", price: "$120/fixture", image: residentialImage, rating: 8 },
        { name: "Hardware", vendor: "FinishRight", price: "$3-15/piece", image: residentialImage, rating: 7 }
      ]
    },
    {
      icon: blackCouch,
      alt: "Couch icon",
      heading: "FURNITURE",
      content: "& Decor",
      description: "Stylish furniture and decor items",
      materials: [
        { name: "Sofa", vendor: "ComfyLiving", price: "$1200", image: residentialImage, rating: 7 },
        { name: "Dining Table", vendor: "WoodCraft", price: "$800", image: residentialImage, rating: 8 },
        { name: "Bed", vendor: "SleepWell", price: "$1500", image: residentialImage, rating: 9 },
        { name: "Chair", vendor: "SeatRight", price: "$250", image: residentialImage, rating: 6 },
        { name: "Cabinet", vendor: "StoragePlus", price: "$600", image: residentialImage, rating: 7 },
        { name: "Decor", vendor: "StyleHome", price: "$50-300", image: residentialImage, rating: 8 }
      ]
    },
    {
      icon: blackLeaf,
      alt: "Leaf icon",
      heading: "LANDSCAPE",
      content: "& Decor",
      description: "Beautiful landscaping materials and outdoor decor",
      materials: [
        { name: "Plants", vendor: "GreenThumb", price: "$25-$150", image: residentialImage, rating: 9 },
        { name: "Pavers", vendor: "OutdoorLiving", price: "$3/sqft", image: residentialImage, rating: 7 },
        { name: "Fountain", vendor: "WaterFeatures", price: "$1200", image: residentialImage, rating: 8 },
        { name: "Soil", vendor: "EarthGood", price: "$30/cu yd", image: residentialImage, rating: 6 },
        { name: "Mulch", vendor: "GardenCare", price: "$40/cu yd", image: residentialImage, rating: 5 },
        { name: "Tools", vendor: "YardWorks", price: "$20-200", image: residentialImage, rating: 7 }
      ]
    },
  ];

  const headers = [
    { heading: "DURABLE", subheading: "LOW-MAINTENANCE" },
    { heading: "ECO-FRIENDLY", subheading: "HEALTHY LIFE" },
    { heading: "ECONOMIC", subheading: "PRICES YOU'LL LOVE" },
  ];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.heading);
    setSelectedMaterialId(null);
    setPreviewMaterial({
      title: category.heading,
      description: category.description,
      materials: category.materials
    });
  };

const handleMaterialSelect = (material) => {
  setSelectedMaterialId(material.name + material.vendor); // unique identifier
  setPreviewMaterial({ ...material, category: selectedCategory });
};


  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const applyFilters = () => {
    // Here you would implement your actual filtering logic
    console.log("Applying filters:", filters);
    setShowFilter(false);
  };

  const getFilteredMaterials = () => {
    if (!selectedCategory) return [];
    
    const category = materials.find(cat => cat.heading === selectedCategory);
    if (!category) return [];
    
    let filtered = [...category.materials];
    
    // Apply quality filter
    if (filters.quality) {
      const [min, max] = filters.quality.split('-').map(Number);
      filtered = filtered.filter(material => material.rating >= min && material.rating <= max);
    }
    
    // Apply price sorting
    if (filters.cost === "LOW TO HIGH") {
      filtered.sort((a, b) => parseFloat(a.price.replace(/[^0-9.]/g, '')) - parseFloat(b.price.replace(/[^0-9.]/g, '')));
    } else if (filters.cost === "HIGH TO LOW") {
      filtered.sort((a, b) => parseFloat(b.price.replace(/[^0-9.]/g, '')) - parseFloat(a.price.replace(/[^0-9.]/g, '')));
    }
    
    return filtered;
  };

  return (
    <Suspense fallback={UserScreenSpinner}>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="px-8 h-[calc(100vh-6rem)] lg:h-[calc(100vh-4rem)] sm:p-0">
        
        {/* Header Section */}
        <div className="max-w-8xl mx-auto px-4 mt-0">
          <div className="flex items-center justify-between mb-6">
                        <span onClick={() => setStep(prev => prev - 1)}>
              <Backbutton />
            </span>
            
            <div className="flex items-center gap-8">
              <Image src={buyMaterialDarkIcon} height={70} width={70} alt="building" />
              
              <div className="flex items-center gap-4">
                {headers.map((header, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <p className="text-2xl text-light-text">{header.heading}</p>
                    <span className="text-light-text text-sm">{header.subheading}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-64 h-12 rounded-full pl-4 pr-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <Image
                    src={searchIcon}
                    alt="Search"
                    width={20}
                    height={20}
                    className="absolute right-3 top-3"
                  />
                </div>
                
                {/* Filter Button with Popup */}
                <div className="relative">
                  <button
                    className="flex items-center gap-2 px-4 py-2 border border-black rounded-md hover:bg-gray-100 transition"
                    onClick={() => setShowFilter(prev => !prev)}
                  >
                    <Image src={boyIcon} alt="Filter" width={20} height={20} />
                    FILTER
                  </button>

                  {showFilter && (
                    <div className="absolute top-14 right-0 bg-white border border-gray-300 rounded-lg shadow-lg w-[350px] z-50 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Image src={boyIcon} alt="Filter Icon" width={20} height={20} />
                          <p className="font-semibold">FILTER</p>
                        </div>
                        <button 
                          onClick={() => setShowFilter(false)} 
                          className="text-gray-500 hover:text-black text-xl"
                        >
                          ×
                        </button>
                      </div>

                      {/* City and Cost Dropdowns */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <select 
                          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                          value={filters.city}
                          onChange={(e) => handleFilterChange('city', e.target.value)}
                        >
                          <option value="Faisalabad">Faisalabad</option>
                          <option value="Lahore">Lahore</option>
                          <option value="Karachi">Karachi</option>
                        </select>
                        <select 
                          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                          value={filters.cost}
                          onChange={(e) => handleFilterChange('cost', e.target.value)}
                        >
                          <option value="LOW TO HIGH">LOW TO HIGH</option>
                          <option value="HIGH TO LOW">HIGH TO LOW</option>
                        </select>
                      </div>

                      {/* Quality Rating Tags */}
                      <div className="mb-4">
                        <p className="text-sm font-semibold mb-2">SPECIFIC QUALITY RATINGS</p>
                        <div className="flex justify-between gap-2">
                          <button 
                            className={`text-xs px-3 py-1 rounded-full transition ${filters.quality === '0-5' ? 'bg-yellow-300 font-bold' : 'bg-gray-200 hover:bg-gray-300'}`}
                            onClick={() => handleFilterChange('quality', filters.quality === '0-5' ? null : '0-5')}
                          >
                            0–5
                          </button>
                          <button 
                            className={`text-xs px-3 py-1 rounded-full transition ${filters.quality === '6-7' ? 'bg-orange-300 font-bold' : 'bg-gray-200 hover:bg-gray-300'}`}
                            onClick={() => handleFilterChange('quality', filters.quality === '6-7' ? null : '6-7')}
                          >
                            6–7
                          </button>
                          <button 
                            className={`text-xs px-3 py-1 rounded-full transition ${filters.quality === '8-10' ? 'bg-blue-400 font-bold' : 'bg-gray-200 hover:bg-gray-300'}`}
                            onClick={() => handleFilterChange('quality', filters.quality === '8-10' ? null : '8-10')}
                          >
                            8–10
                          </button>
                        </div>
                      </div>

                      {/* Apply Changes */}
                      <button 
                        className="w-full bg-black text-white py-2 rounded-md mt-2 hover:bg-gray-800 transition"
                        onClick={applyFilters}
                      >
                        APPLY CHANGES
                      </button>
                    </div>
                  )}
                </div>
                
                <UButton
                  text={
                    <span className="flex items-center gap-2">
                      <Image src={messageIcon} alt="Message" width={20} height={20} />
                      <span>GET <b>ASSIST</b></span>
                    </span>
                  }
                  className="px-4 py-2"
                />
              </div>
            </div>
          </div>
          <hr className="mb-6" />
        </div>

        {/* Main Content Area */}
        <div className="max-w-8xl mx-auto px-4 flex-1 flex">
          {/* Categories Sidebar */}
          <div className="w-64 mr-6">
            <h3 className="text-xl font-bold mb-4">Material Categories</h3>
            <div className="space-y-2">
              {materials.map((category, index) => (
                <div
                  key={index}
                  onClick={() => handleCategorySelect(category)}
                  className={`p-3 rounded-md cursor-pointer transition-all flex items-center ${
                    selectedCategory === category.heading 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-gray-100 hover:bg-orange-100'
                  }`}
                >
                  <Image
                    src={category.icon}
                    alt={category.alt}
                    width={24}
                    height={24}
                    className="mr-2"
                  />
                  <div>
                    <p className="font-medium">{category.heading}</p>
                    <p className="text-xs">{category.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Materials Grid with Scroll */}
          <div className="flex-1 flex">
            <div className="w-2/3 pr-6">
              <div className="bg-white rounded-lg p-4 h-[calc(100vh-350px)] flex flex-col">
                <h2 className="text-xl font-bold mb-4">
                  {selectedCategory || "Select a category"}
                </h2>
                
                <div className="grid grid-cols-3 gap-4 overflow-y-auto pr-2 custom-scrollbar">
                  {selectedCategory ? (
                    getFilteredMaterials().map((material, index) => (
                      <div
                        key={index}
                        onClick={() => handleMaterialSelect(material)}

                        className={`p-4 rounded-lg cursor-pointer transition-all relative ${
                          selectedMaterialId === material.name + material.vendor
                            ? 'bg-orange-100 border-2 border-orange-500'
                            : 'bg-gray-50 hover:bg-orange-50 border border-gray-200'
                        }`}
                      >

                        <div className="h-40 bg-gray-200 rounded-md mb-2 overflow-hidden">
                          <Image
                            src={material.image}
                            alt={material.name}
                            width={200}
                            height={200}
                            className="w-full h-full object-cover"
                          />
                          {selectedMaterialId === material.name + material.vendor && (

                            <div className="absolute top-2 right-2 bg-orange-500 rounded-full p-1">
                              <Image src={tickIcon} alt="Selected" width={16} height={16} />
                            </div>
                          )}
                        </div>
                        <h3 className="font-medium">{material.name}</h3>
                        <p className="text-sm text-gray-600">{material.vendor}</p>
                        <p className="text-sm font-bold text-orange-600">
                          {material.price}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-3 flex items-center justify-center h-64">
                      <p className="text-gray-500">
                        Please select a category to view materials
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Preview Panel */}
            <div className="w-1/3">
              <div className="bg-white rounded-lg p-4 border border-gray-200 h-[calc(100vh-350px)]">
                <h2 className="text-xl font-bold mb-4">Material Details</h2>
                
                {previewMaterial ? (
                  <div>
                    {previewMaterial.category ? (
                      // Material item preview
                      <>

                      <div className="relative h-48 bg-gray-200 rounded-md mb-4 overflow-hidden cursor-pointer group" onClick={() => setShowZoom(true)}>
  <Image
    src={previewMaterial.image}
    alt={previewMaterial.name}
    width={300}
    height={200}
    className="w-full h-full object-cover"
  />

  {/* Enlarge Icon */}
  <div className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow-md group-hover:scale-110 transition-transform">
    <FaExpandAlt className="text-gray-700" size={18} />
  </div>
</div>

                        <h3 className="text-lg font-bold">{previewMaterial.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Category: {previewMaterial.category}
                        </p>
                        <p className="text-sm mb-2">
                          Vendor: <span className="font-medium">{previewMaterial.vendor}</span>
                        </p>
                        <p className="text-lg font-bold text-orange-600 mb-4">
                          Price: {previewMaterial.price}
                        </p>
                        <button className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition">
                          Add to Cart
                        </button>
                      </>
                    ) : (
                      // Category preview
                      <>
                        <h3 className="text-lg font-bold">{previewMaterial.title}</h3>
                        <p className="text-gray-600 mb-4">{previewMaterial.description}</p>
                        
                        <h4 className="font-medium mb-2">Available Materials:</h4>
                        <ul className="space-y-2">
                          {previewMaterial.materials.slice(0, 4).map((mat, idx) => (
                            <li key={idx} className="flex justify-between items-center border-b pb-2">
                              <span>{mat.name}</span>
                              <span className="text-orange-600 font-medium">{mat.price}</span>
                            </li>
                          ))}
                          {previewMaterial.materials.length > 4 && (
                            <li className="text-sm text-gray-500">
                              + {previewMaterial.materials.length - 4} more items
                            </li>
                          )}
                        </ul>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">
                      Select a material to view details
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {showZoom && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
    {/* Close Button */}
    <button
      onClick={() => setShowZoom(false)}
      className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white text-large text-black shadow-lg hover:bg-gray-200 transition z-50"
    >
      ×
    </button>

    {/* Previous Arrow */}
    <button
      onClick={() => {
        const materials = getFilteredMaterials();
        const currentIndex = materials.findIndex(m => m.name + m.vendor === selectedMaterialId);
        const prevIndex = (currentIndex - 1 + materials.length) % materials.length;
        handleMaterialSelect(materials[prevIndex]);
      }}
      className="absolute text-large left-8 w-10 h-10 flex items-center justify-center rounded-full bg-white text-black shadow-lg hover:bg-gray-200 transition z-50"
    >
      ‹
    </button>

    {/* Image Container */}
    <div className="w-[80vw] max-w-[700px]">
      <Image
        src={previewMaterial.image}
        alt={previewMaterial.name}
        width={700}
        height={500}
        className="object-contain w-full h-auto rounded-lg"
      />
    </div>

    {/* Next Arrow */}
    <button
      onClick={() => {
        const materials = getFilteredMaterials();
        const currentIndex = materials.findIndex(m => m.name + m.vendor === selectedMaterialId);
        const nextIndex = (currentIndex + 1) % materials.length;
        handleMaterialSelect(materials[nextIndex]);
      }}
      className="absolute right-8 text-large w-10 h-10 flex items-center justify-center rounded-full bg-white text-black shadow-lg hover:bg-gray-200 transition z-50"
    >
      ›
    </button>
  </div>
)}

        
        {/* Continue Button */}
          <div className="flex justify-end items-center mt-4">
            <BlackButton 
              onclickfunction={() => setStep(prev => prev + 1)} 
disabled={!selectedMaterialId}
text={selectedMaterialId ? "Next" : "Select a Material to Continue"}

            />
          </div>

        {/* Scrollbar Styles */}
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        `}</style>
      </motion.section>
    </Suspense>
  );
};

export default MaterialSelectionPage;