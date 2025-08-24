"use client";

import Image from "next/image";
import { UButton } from "@/components";
import useRPS from "@/hooks/useRPS";
import { IoChatboxOutline, IoCheckmark } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import { fastHomeIcon } from "@/assets";
import { useState, useMemo } from "react";

// Import individual service icons
import lightingIcon from "@/assets/images/user-side/Services/light.png";
import switchesIcon from "@/assets/images/user-side/Services/socket.png";
import waterIcon from "@/assets/images/user-side/Services/water.png";
import sewerageIcon from "@/assets/images/user-side/Services/sewer.png";
import stormwaterIcon from "@/assets/images/user-side/Services/drain.png";
import gasIcon from "@/assets/images/user-side/Services/gas.png";
import acIcon from "@/assets/images/user-side/Services/ac.png";
import fireDetectionIcon from "@/assets/images/user-side/Services/fire-fighter.png";
import fireFightingIcon from "@/assets/images/user-side/Services/fire-fighter.png";
import cctvIcon from "@/assets/images/user-side/Services/cctv.png";
import intercomIcon from "@/assets/images/user-side/Services/intercom.png";
import loadCalcIcon from "@/assets/images/user-side/Services/load.png";
import smartHomeIcon from "@/assets/images/user-side/Services/smart-home.png";
import hvacIcon from "@/assets/images/user-side/Services/hvac.png";
import solarIcon from "@/assets/images/user-side/Services/solar.png";
import internetIcon from "@/assets/images/user-side/Services/internet.png";
import tvCableIcon from "@/assets/images/user-side/Services/tv.png";

const InitialPayment = ({ setSteps }) => {
  const { router, pathname, searchParams } = useRPS();

  // State for selected services
  const [selectedServices, setSelectedServices] = useState({});

  const submitHandler = () => {
    const newParams = new URLSearchParams(searchParams);

    // Save only the total cost
    newParams.set("totalCost", totalCost);

    // Move to next screen
    newParams.set("screen", 4);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  // Icon mapping for each service
  const serviceIcons = {
    lighting: lightingIcon,
    switches: switchesIcon,
    water: waterIcon,
    sewerage: sewerageIcon,
    stormwater: stormwaterIcon,
    gas: gasIcon,
    ac: acIcon,
    fireDetection: fireDetectionIcon,
    fireFighting: fireFightingIcon,
    cctv: cctvIcon,
    intercom: intercomIcon,
    loadCalc: loadCalcIcon,
    smartHome: smartHomeIcon,
    hvac: hvacIcon,
    solar: solarIcon,
    fireFightingSmart: fireFightingIcon, // Reusing the same icon
    internet: internetIcon,
    tvCable: tvCableIcon,
  };

  const plans = [
    {
      id: "core",
      title: "CORE MEP PLANS",
      subtitle: "ESSENTIAL",
      baseRate: "15 PKR/SFT",
      items: [
        {
          id: "lighting",
          name: "Lighting Plan",
          desc: "Lights, fixtures, switches layout",
          cost: 0.75,
        },
        {
          id: "switches",
          name: "Switch Sockets",
          desc: "Power sockets, control, SW",
          cost: 0.75,
        },
        {
          id: "water",
          name: "Water Supply Plan",
          desc: "Piping for fresh water to taps",
          cost: 0.75,
        },
        {
          id: "sewerage",
          name: "Sewerage Plan",
          desc: "Drain pipes plan, casking waste",
          cost: 0.75,
        },
        {
          id: "stormwater",
          name: "Stormwater Drainage",
          desc: "Outdoor water flow, gutters etc",
          cost: 0.75,
        },
        {
          id: "gas",
          name: "Gas Piping Plan",
          desc: "For kitchen, geysers",
          cost: 0.75,
        },
      ],
    },
    {
      id: "safety",
      title: "SAFETY/COMM.",
      subtitle: "RECOMMENDED",
      baseRate: "15 PKR/SFT",
      items: [
        {
          id: "ac",
          name: "A.C. Planning",
          desc: "Unit placements, ducts, drainage",
          cost: 0.75,
        },
        {
          id: "fireDetection",
          name: "Fire Detection",
          desc: "Detectors, alarms for warnings",
          cost: 0.75,
        },
        {
          id: "fireFighting",
          name: "Fire Fighting",
          desc: "Extinguishers, sprinklers etc.",
          cost: 0.75,
        },
        {
          id: "cctv",
          name: "CCTV",
          desc: "Surveillance, cameras, wiring, DVR/NVRs",
          cost: 0.75,
        },
        {
          id: "intercom",
          name: "Intercom, Phone Plan",
          desc: "Communication b/w gate & rooms",
          cost: 0.75,
        },
        {
          id: "loadCalc",
          name: "Load Calculation",
          desc: "Electrical panel schedule",
          cost: 0.75,
        },
      ],
    },
    {
      id: "smart",
      title: "SMART HOME",
      subtitle: "MODERN",
      baseRate: "15 PKR/SFT",
      items: [
        {
          id: "smartHome",
          name: "Smart Home",
          desc: "Automation wiring of appliances",
          cost: 0.75,
        },
        {
          id: "hvac",
          name: "HVAC",
          desc: "Heating, Ventilation & Air Conditioning",
          cost: 4.0,
        },
        {
          id: "solar",
          name: "Solar Power System",
          desc: "Panel layout, inverter, wiring",
          cost: 0.75,
        },
        {
          id: "fireFightingSmart",
          name: "Fire Fighting",
          desc: "Extinguishers, Sprinklers etc.",
          cost: 0.75,
        },
        {
          id: "internet",
          name: "Internet, LAN Layout",
          desc: "Network points, router locations",
          cost: 0.75,
        },
        {
          id: "tvCable",
          name: "TV Cable Layout",
          desc: "TV ports, signal wiring",
          cost: 0.75,
        },
      ],
    },
  ];

  // Handle individual service selection
  const toggleService = (planId, serviceId) => {
    const key = `${planId}-${serviceId}`;
    setSelectedServices(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Enhanced plan selection with better deselect functionality
  const togglePlan = planId => {
    const plan = plans.find(p => p.id === planId);
    const allServicesSelected = plan.items.every(
      item => selectedServices[`${planId}-${item.id}`],
    );

    if (allServicesSelected) {
      // Deselect all services in this plan
      setSelectedServices(prev => {
        const newState = { ...prev };
        plan.items.forEach(item => {
          delete newState[`${planId}-${item.id}`];
        });
        return newState;
      });
    } else {
      // Select all services in this plan
      setSelectedServices(prev => {
        const newState = { ...prev };
        plan.items.forEach(item => {
          newState[`${planId}-${item.id}`] = true;
        });
        return newState;
      });
    }
  };

  // Calculate total cost
  const totalCost = useMemo(() => {
    let total = 0;
    Object.keys(selectedServices).forEach(key => {
      if (selectedServices[key]) {
        const [planId, serviceId] = key.split("-");
        const plan = plans.find(p => p.id === planId);
        const service = plan.items.find(s => s.id === serviceId);
        if (service) {
          total += service.cost;
        }
      }
    });
    return total.toFixed(2);
  }, [selectedServices]);

  // Calculate cost for each plan
  const getPlanCost = planId => {
    const plan = plans.find(p => p.id === planId);
    let cost = 0;
    plan.items.forEach(item => {
      if (selectedServices[`${planId}-${item.id}`]) {
        cost += item.cost;
      }
    });
    return cost.toFixed(2);
  };

  // Check if all services in a plan are selected
  const isPlanFullySelected = planId => {
    const plan = plans.find(p => p.id === planId);
    return plan.items.every(item => selectedServices[`${planId}-${item.id}`]);
  };

  // Check if any services in a plan are selected (for partial selection state)
  const isPlanPartiallySelected = planId => {
    const plan = plans.find(p => p.id === planId);
    const selectedCount = plan.items.filter(
      item => selectedServices[`${planId}-${item.id}`],
    ).length;
    return selectedCount > 0 && selectedCount < plan.items.length;
  };

  // Get plan selection state for better visual feedback
  const getPlanSelectionState = planId => {
    if (isPlanFullySelected(planId)) return "full";
    if (isPlanPartiallySelected(planId)) return "partial";
    return "none";
  };

  return (
    <div className="min-h-[100%] bg-white flex flex-col justify-between">
      {/* Main Content */}
      <div className="max-w-[85%] mx-auto w-full py-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-black text-[36px] font-bold">SELECT & PAY</h2>
          <div className="flex justify-between max-w-[200px] mx-auto text-gray-500/50 text-lg">
            <span>SERVICES</span>
            <span>ADVANCE</span>
          </div>
          <p className="mt-4 bg-accent-gold-2 text-white font-medium text-xl max-w-[40%] sm:max-w-full sm:w-full sm:mx-px mx-auto rounded-2xl px-4 py-1">
            Select <b className="font-bold">Home Services</b> Plans
          </p>
        </div>

        {/* Plans */}
        <div className="flex justify-center gap-6 sm:gap-2 flex-row sm:flex-col">
          {plans.map((plan, index) => {
            const selectionState = getPlanSelectionState(plan.id);

            return (
              <div
                key={index}
                className="w-full md:w-[33%] sm:w-full border border-gray-300 shadow-lg rounded-b-2xl rounded-t-[35px] bg-white">
                {/* Plan Header */}
                <div className="bg-gray-100 rounded-[35px] px-4 py-2 flex items-start gap-4 relative shadow-md">
                  <div
                    className="cursor-pointer mt-2"
                    onClick={() => togglePlan(plan.id)}>
                    {/* Custom checkbox/radio that shows select/deselect states */}
                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        selectionState === "full"
                          ? "bg-gray-700 border-gray-700"
                          : selectionState === "partial"
                          ? "bg-gray-300 border-gray-500"
                          : "bg-white border-gray-400"
                      }`}>
                      {selectionState === "full" && (
                        <IoCheckmark className="text-white text-lg" />
                      )}
                      {selectionState === "partial" && (
                        <div className="w-3 h-3 bg-gray-700 rounded-full"></div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="font-bold text-xl sm:text-sm">
                      {plan.title || "Plan"}
                    </div>
                    <div className="text-lg text-gray-500 sm:text-xs">
                      {plan.subtitle || "Subtitle"}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 text-lg sm:text-sm text-gray-600 rounded-3xl bg-white sm:px-2 px-4 py-1">
                    {getPlanCost(plan.id)} PKR/SFT
                  </div>
                </div>

                {/* Plan Items */}
                <div className="grid grid-cols-2 gap-2 p-2">
                  {plan.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                      onClick={() => toggleService(plan.id, item.id)}>
                      <div className="relative min-w-14 min-h-14 max-w-14 max-h-14 rounded-full overflow-hidden flex items-center justify-center">
                        <Image
                          src={serviceIcons[item.id]}
                          alt={item.name}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover bg-white"
                        />
                        {/* Checkbox overlay */}
                        <div
                          className={`absolute bottom-0 left-1/3 w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                            selectedServices[`${plan.id}-${item.id}`]
                              ? "bg-white"
                              : "bg-white"
                          }`}>
                          {selectedServices[`${plan.id}-${item.id}`] && (
                            <IoCheckmark className="text-black text-sm" />
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="text-md font-semibold">{item.name}</div>
                        <div className="text-sm text-gray-500 sm:hidden block">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Total & Next */}
        <div className="mt-8 flex sm:flex-col flex-row justify-end gap-[300px]">
          <div className="hidden">
            <strong>empyyy</strong>
          </div>
          {/* Total Cost - centered */}
          <div className="text-[20px] flex justify-between items-center text-center h-[46px] rounded-[10px] px-6 shadow-md border border-gray-200 bg-white min-w-[300px]">
            <strong>TOTAL COST</strong>
            <span>{totalCost} PKR</span>
          </div>

          {/* Next Button - on the right */}
          <UButton
            onClick={submitHandler}
            text="NEXT"
            color="gray-white"
            className="text-base px-10 ml-16 py-2 sm:w-full w-auto"
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-accent-gray py-3 mt-10">
        <div className="max-w-[80%] mx-auto grid grid-cols-3 text-white text-sm font-semibold">
          {/* PROJECT */}
          <div className="flex justify-center items-center">
            <span className="flex items-center gap-2 text-[24px] px-6">
              <Image
                src={fastHomeIcon}
                alt="Project Icon"
                width={24}
                height={24}
              />
              <button>PROJECT</button>
            </span>
          </div>

          {/* CHAT */}
          <div className="flex justify-center items-center">
            <span className="flex items-center gap-2 text-[24px] px-6">
              <IoChatboxOutline />
              <button>CHAT</button>
            </span>
          </div>

          {/* PAYMENT */}
          <div className="flex justify-center items-center">
            <UButton
              onClick={null}
              className="flex items-center gap-2 text-[#2F2F2F] py-4 px-2"
              color="gold-gray"
              text={
                <span className="flex items-center gap-2 text-[24px] px-6">
                  <MdOutlinePayment />
                  <span>Payment</span>
                </span>
              }
            />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InitialPayment;
