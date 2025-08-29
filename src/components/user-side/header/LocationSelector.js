"use client";

import React, { useState, useEffect, useRef } from "react";
import { MapPin, X, Check } from "lucide-react";;

const LocationSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("LOC");
  const [selectedCity, setSelectedCity] = useState(null);
  const popupRef = useRef(null);

  // Pakistan cities with their short codes
  const pakistanCities = [
    { name: "Lahore", code: "LHR", province: "Punjab" },
    { name: "Karachi", code: "KHI", province: "Sindh" },
    { name: "Islamabad", code: "ISB", province: "Federal Capital" },
    { name: "Rawalpindi", code: "RWP", province: "Punjab" },
    { name: "Faisalabad", code: "FSD", province: "Punjab" },
    { name: "Multan", code: "MLT", province: "Punjab" },
    { name: "Peshawar", code: "PSH", province: "Khyber Pakhtunkhwa" },
    { name: "Quetta", code: "QTA", province: "Balochistan" },
    { name: "Sialkot", code: "SKT", province: "Punjab" },
    { name: "Gujranwala", code: "GJR", province: "Punjab" },
    { name: "Hyderabad", code: "HYD", province: "Sindh" },
    { name: "Bahawalpur", code: "BWP", province: "Punjab" },
    { name: "Sargodha", code: "SGD", province: "Punjab" },
    { name: "Sukkur", code: "SKR", province: "Sindh" },
    { name: "Larkana", code: "LRK", province: "Sindh" },
    { name: "Sheikhupura", code: "SHP", province: "Punjab" },
    { name: "Jhang", code: "JHG", province: "Punjab" },
    { name: "Rahim Yar Khan", code: "RYK", province: "Punjab" },
    { name: "Gujrat", code: "GJT", province: "Punjab" },
    { name: "Kasur", code: "KSR", province: "Punjab" },
  ];

  // Group cities by province
  const citiesByProvince = pakistanCities.reduce((acc, city) => {
    if (!acc[city.province]) {
      acc[city.province] = [];
    }
    acc[city.province].push(city);
    return acc;
  }, {});

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLocationSelect = city => {
    setSelectedLocation(city.code);
    setSelectedCity(city);
    setIsOpen(false);
  };

  const resetLocation = () => {
    setSelectedLocation("LOC");
    setSelectedCity(null);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={popupRef}>
      {/* Location Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white inline-flex px-4 items-center gap-3 md:gap-2 xs:gap-1">
        <MapPin size={20} strokeWidth={1.5} className="w-7 h-auto md:w-6 sm:w-5"/>
        <span className="base-text block sm:hidden">{selectedLocation}</span>

      </button>

      {/* Popup */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Select Location
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Selected Location Display */}
          {selectedCity && (
            <div className="p-3 bg-blue-50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-green-600" />
                  <span className="text-sm font-medium text-gray-900">
                    {selectedCity.name} ({selectedCity.code})
                  </span>
                </div>
                <button
                  onClick={resetLocation}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                  Clear
                </button>
              </div>
            </div>
          )}

          {/* Cities List */}
          <div className="max-h-72 overflow-y-auto">
            {Object.entries(citiesByProvince).map(([province, cities]) => (
              <div key={province}>
                {/* Province Header */}
                <div className="sticky top-0 bg-gray-50 px-4 py-2 border-b border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-700">
                    {province}
                  </h4>
                </div>

                {/* Cities in Province */}
                {cities.map(city => (
                  <button
                    key={city.code}
                    onClick={() => handleLocationSelect(city)}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                      selectedCity?.code === city.code
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700"
                    }`}>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{city.name}</span>
                      <span className="text-sm text-gray-500 font-mono">
                        {city.code}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-3 bg-gray-50 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Select a city to filter content by location
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
