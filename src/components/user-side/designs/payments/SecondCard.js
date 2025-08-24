"use client";
import Nextbutton from "@/components/Nextbutton";
import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa6";
import { PiCodesandboxLogoBold } from "react-icons/pi";
import Image from "next/image";
import tickIcon from "@/assets/icons/buy-materials/tickIcon.svg";
import localimg from "@/assets/images/bg.jpg";

const SecondCard = ({
  service1,
  totalCost,
  productRates,
  onTotalCostUpdate,
  onSelectedServicesUpdate,
  onSelectedMaterialsUpdate,
}) => {
  const selected = service1.find(service => service.checked);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const materials = [
    {
      name: "Wood",
      vendor: "Vendor A",
      price: "120 PKR",
      numericPrice: 120,
      image: "/materials/wood.jpg",
    },
    {
      name: "Marble",
      vendor: "Vendor B",
      price: "220 PKR",
      numericPrice: 220,
      image: "/materials/marble.jpg",
    },
    {
      name: "Tiles",
      vendor: "Vendor C",
      price: "180 PKR",
      numericPrice: 180,
      image: "/materials/tiles.jpg",
    },
    {
      name: "Granite",
      vendor: "Vendor D",
      price: "250 PKR",
      numericPrice: 250,
      image: "/materials/granite.jpg",
    },
    {
      name: "Steel",
      vendor: "Vendor E",
      price: "300 PKR",
      numericPrice: 300,
      image: "/materials/steel.jpg",
    },
    {
      name: "Bricks",
      vendor: "Vendor F",
      price: "90 PKR",
      numericPrice: 90,
      image: "/materials/bricks.jpg",
    },
    {
      name: "Paint",
      vendor: "Vendor G",
      price: "70 PKR",
      numericPrice: 70,
      image: "/materials/paint.jpg",
    },
    {
      name: "Concrete",
      vendor: "Vendor H",
      price: "150 PKR",
      numericPrice: 150,
      image: "/materials/concrete.jpg",
    },
    {
      name: "Glass",
      vendor: "Vendor I",
      price: "350 PKR",
      numericPrice: 350,
      image: "/materials/glass.jpg",
    },
  ];

  // Filter services based on selected service type
  const getFilteredServices = () => {
    const homeServicePlan = {
      id: "home-service-plan",
      service: "HOME SERVICE PLANS",
      includes: "Detailed layout of utilities and home infrastructure plans.",
      rate: `${totalCost} PKR/SQM`,
      cost: `${totalCost} PKR/SQM`,
      numericRate: parseInt(totalCost) || 0,
      seeHow: "",
      type: "design", // Always show in design
    };

    let filteredRates = [];
    const selectedType = selected?.text?.toLowerCase();

    if (selectedType === "design") {
      // Show home service plan first for design, then filter by type
      filteredRates = [
        homeServicePlan,
        ...productRates.filter(rate => rate.type?.toLowerCase() === "design"),
      ];
    } else if (selectedType) {
      // Filter by the selected type
      filteredRates = productRates.filter(
        rate => rate.type?.toLowerCase() === selectedType,
      );
    }

    // Assign unique IDs to Firebase services if they don't have them
    filteredRates = filteredRates.map((service, index) => {
      if (service.id === "home-service-plan") return service;

      return {
        ...service,
        id:
          service.id || `${selectedType}-firebase-${service.service}-${index}`,
      };
    });

    return filteredRates;
  };

  // Calculate total cost based on selected services and materials
  const calculateTotalCost = () => {
    let total = 0;

    // Add selected services cost
    selectedServices.forEach(serviceId => {
      // Handle HOME SERVICE PLANS
      if (serviceId === "home-service-plan") {
        const homeServiceCost = parseInt(totalCost) || 0;
        total += homeServiceCost;
        return;
      }

      // Handle other services by finding them in the productRates array
      const service = productRates.find(rate => {
        // Check if this service matches the selected ID
        const generatedId = `${rate.type?.toLowerCase()}-firebase-${
          rate.service
        }-${productRates
          .filter(r => r.type?.toLowerCase() === rate.type?.toLowerCase())
          .indexOf(rate)}`;
        return rate.id === serviceId || generatedId === serviceId;
      });

      if (service && service.numericRate) {
        total += service.numericRate;
      }
    });

    // Add selected materials cost
    selectedMaterials.forEach(material => {
      total += material.numericPrice;
    });

    return total;
  };

  // Update total cost when selections change
  useEffect(() => {
    const newTotal = calculateTotalCost();
    if (onTotalCostUpdate) {
      onTotalCostUpdate(newTotal);
    }
  }, [selectedServices, selectedMaterials]);

  // Update parent with selected services data when selections change
  useEffect(() => {
    const getSelectedServicesData = () => {
      const servicesData = [];

      selectedServices.forEach(serviceId => {
        // Handle HOME SERVICE PLANS
        if (serviceId === "home-service-plan") {
          servicesData.push({
            id: "home-service-plan",
            service: "HOME SERVICE PLANS",
            includes:
              "Detailed layout of utilities and home infrastructure plans.",
            rate: `${totalCost} PKR/SQM`,
            numericRate: parseInt(totalCost) || 0,
            type: "design",
          });
          return;
        }

        // Handle other services
        const service = productRates.find(rate => {
          const generatedId = `${rate.type?.toLowerCase()}-firebase-${
            rate.service
          }-${productRates
            .filter(r => r.type?.toLowerCase() === rate.type?.toLowerCase())
            .indexOf(rate)}`;
          return rate.id === serviceId || generatedId === serviceId;
        });

        if (service) {
          servicesData.push(service);
        }
      });

      return servicesData;
    };

    const selectedServicesData = getSelectedServicesData();
    if (onSelectedServicesUpdate) {
      onSelectedServicesUpdate(selectedServicesData);
    }
  }, [selectedServices, productRates, totalCost]);

  // Update parent with selected materials data when selections change
  useEffect(() => {
    const materialsWithCategory = selectedMaterials.map(material => ({
      ...material,
      category: selected?.text === "MATERIALS" ? "materials" : "furniture",
    }));

    if (onSelectedMaterialsUpdate) {
      onSelectedMaterialsUpdate(materialsWithCategory);
    }
  }, [selectedMaterials, selected?.text]);

  const handleServiceSelection = (index, service) => {
    const serviceId =
      service.id || `${selected?.text?.toLowerCase()}-service-${index}`;
    setSelectedServices(prev => {
      return prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId];
    });
  };

  const isServiceSelected = (index, service) => {
    const serviceId =
      service.id || `${selected?.text?.toLowerCase()}-service-${index}`;
    return selectedServices.includes(serviceId);
  };

  // Extract numeric value from rate string
  const extractNumericRate = rateString => {
    const match = rateString?.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  return (
    <div>
      {(selected?.text === "DESIGN" || selected?.text === "CONSTRUCTION") && (
        <div className="w-full px-4 py-2 bg-white rounded-md shadow-sm text-center">
          {/* Header */}
          <h1 className="text-xl font-semibold mb-1">
            <span className="font-bold">{selected?.text}</span> CHARGES
          </h1>
          <hr className="w-[50%] mx-auto mb-2" />

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-gray-700">
              <thead className="uppercase text-black border-b">
                <tr>
                  <th className="px-2 py-1 w-[15%]">Service</th>
                  <th className="px-2 py-1 w-[60%]">Includes</th>
                  <th className="px-2 py-1 w-[15%]">Rate</th>
                  <th className="px-2 py-1 w-[10%]">See How</th>
                </tr>
              </thead>

              <tbody>
                {getFilteredServices().map((value, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-gray-200 transition-all border-b cursor-pointer ${
                      isServiceSelected(index, value)
                        ? "bg-blue-50"
                        : "bg-gray-100"
                    }`}
                    onClick={() => handleServiceSelection(index, value)}>
                    {/* Service */}
                    <td className="px-1 py-1 w-[15%] align-top">
                      <div className="flex items-start gap-2 bg-white px-2 py-1 rounded-full">
                        <span
                          className={`border-2 border-black h-[18px] w-[18px] flex justify-center items-center rounded-full cursor-pointer transition-all ${
                            isServiceSelected(index, value)
                              ? "bg-green-500 border-green-500"
                              : "bg-white"
                          }`}>
                          {isServiceSelected(index, value) && (
                            <FaCheck className="text-[10px] text-white" />
                          )}
                        </span>
                        <span className="text-[12px] font-semibold leading-tight">
                          {value.service}
                        </span>
                      </div>
                    </td>

                    {/* Includes */}
                    <td className="px-2 py-1">
                      <div className="bg-white border border-gray-200 rounded-lg px-2 py-1">
                        {value.includes}
                      </div>
                    </td>

                    {/* Single Rate Column */}
                    <td className="px-2 py-1">
                      <div className="bg-white border border-gray-200 rounded-md px-2 py-1 text-center">
                        {value.rate}
                      </div>
                    </td>

                    {/* See How */}
                    <td className="px-2 py-1 text-right">
                      <Nextbutton />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Changes Section - Only show for DESIGN */}
          {selected?.text === "DESIGN" && (
            <div className="grid grid-cols-3 justify-start items-center bg-[#ffebd2c7] text-sm px-2 py-1 mt-2 rounded-full w-full">
              <div className="font-medium">CHANGES</div>
              <div className="text-center">
                LEVEL <span className="font-bold">LOW</span>
              </div>
              <div className="flex justify-end gap-2 mr-16">
                <button className="bg-white border border-gray-300 rounded-sm px-2 py-1 shadow-sm hover:bg-gray-100">
                  RATE
                </button>
              </div>
            </div>
          )}

          {/* Offer Section - Only show for DESIGN */}
          {selected?.text === "DESIGN" && (
            <div className="flex items-center gap-2 bg-[#FFEBD2] text-sm px-2 py-1 mt-2 rounded-full w-full">
              <span className="border-2 border-black h-[20px] w-[20px] flex justify-center items-center rounded-full bg-white" />
              <span>OFFER</span>
              <input
                type="text"
                placeholder="Label"
                className="w-[300px] border border-gray-300 rounded px-1 text-center"
              />
              <input
                type="number"
                placeholder="%"
                className="w-[50px] border border-gray-300 rounded px-1 text-center"
              />
              <span>% OFF</span>
            </div>
          )}
        </div>
      )}

      {selected?.text === "MATERIALS" && (
        <div className="w-full px-2 py-2 bg-white text-center">
          <h1 className="text-xl font-semibold mb-2">
            <span className="font-bold">MATERIAL</span> SELECTION
          </h1>
          <hr className="w-[50%] mx-auto mb-4" />

          <div className="h-[340px] overflow-y-auto overflow-x-hidden px-1">
            <div className="grid grid-cols-4 gap-3">
              {materials.map((material, index) => {
                const isSelected = selectedMaterials.some(
                  item => item.name === material.name,
                );
                return (
                  <div
                    key={index}
                    className={`w-[145px] h-[150px] rounded-[10px] relative border border-gray-200 shadow-md hover:shadow-lg transition-all flex flex-col cursor-pointer ${
                      isSelected ? "bg-[#21254A]" : "bg-white"
                    }`}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedMaterials(prev =>
                          prev.filter(item => item.name !== material.name),
                        );
                      } else {
                        setSelectedMaterials(prev => [...prev, material]);
                      }
                    }}>
                    {/* Material Image */}
                    <div className="w-full h-[85px] rounded-[5px] overflow-hidden relative">
                      <Image
                        src={localimg}
                        layout="fill"
                        objectFit="cover"
                        alt={`Material ${material.name}`}
                        className="w-full h-full"
                      />
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
                      <h4
                        className={`font-bold text-[15px] uppercase truncate font-[FONTSPRING DEMO - Proxima Nova] ${
                          isSelected ? "text-white" : "text-[#1f1f1f]"
                        }`}>
                        {material.name}
                      </h4>
                      <p
                        className={`text-[14px] truncate font-[FONTSPRING DEMO - Proxima Nova] ${
                          isSelected
                            ? "text-white opacity-80"
                            : "text-[#2f2f2f]"
                        }`}>
                        {material.vendor}
                      </p>
                      <p
                        className={`text-[14px] mt-auto rounded-full px-2 py-0.5 truncate font-[Milliard] ${
                          isSelected
                            ? "bg-white/20 text-white border-white"
                            : "bg-gray-100 border border-black opacity-80"
                        }`}>
                        {material.price}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {selected?.text === "FURNITURE" && (
        <div className="w-full px-2 py-2 bg-white text-center">
          <h1 className="text-xl font-semibold mb-2">
            <span className="font-bold">FURNITURE</span> SELECTION
          </h1>
          <hr className="w-[50%] mx-auto mb-4" />

          <div className="h-[340px] overflow-y-auto overflow-x-hidden px-1">
            <div className="grid grid-cols-4 gap-3">
              {materials.map((material, index) => {
                const isSelected = selectedMaterials.some(
                  item => item.name === material.name,
                );
                return (
                  <div
                    key={index}
                    className={`w-[145px] h-[150px] rounded-[10px] relative border border-gray-200 shadow-md hover:shadow-lg transition-all flex flex-col cursor-pointer ${
                      isSelected ? "bg-[#21254A]" : "bg-white"
                    }`}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedMaterials(prev =>
                          prev.filter(item => item.name !== material.name),
                        );
                      } else {
                        setSelectedMaterials(prev => [...prev, material]);
                      }
                    }}>
                    {/* Material Image */}
                    <div className="w-full h-[85px] rounded-[5px] overflow-hidden relative">
                      <Image
                        src={localimg}
                        layout="fill"
                        objectFit="cover"
                        alt={`Furniture ${material.name}`}
                        className="w-full h-full"
                      />
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

                    {/* Furniture Info */}
                    <div className="mt-1 flex-grow flex flex-col px-1">
                      <h4
                        className={`font-bold text-[15px] uppercase truncate font-[FONTSPRING DEMO - Proxima Nova] ${
                          isSelected ? "text-white" : "text-[#1f1f1f]"
                        }`}>
                        {material.name}
                      </h4>
                      <p
                        className={`text-[14px] truncate font-[FONTSPRING DEMO - Proxima Nova] ${
                          isSelected
                            ? "text-white opacity-80"
                            : "text-[#2f2f2f]"
                        }`}>
                        {material.vendor}
                      </p>
                      <p
                        className={`text-[14px] mt-auto rounded-full px-2 py-0.5 truncate font-[Milliard] ${
                          isSelected
                            ? "bg-white/20 text-white border-white"
                            : "bg-gray-100 border border-black opacity-80"
                        }`}>
                        {material.price}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecondCard;
