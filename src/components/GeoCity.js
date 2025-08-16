"use client";
import { useEffect, useState } from "react";

export default function GeoCity() {
  const [city, setCity] = useState < string > "Detecting...";

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async position => {
          const { latitude, longitude } = position.coords;

          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
            );
            const data = await res.json();
            const cityName =
              data.address?.city ||
              data.address?.town ||
              data.address?.village ||
              "Unknown";
            setCity(cityName);
          } catch (error) {
            setCity("Could not fetch city");
          }
        },
        () => {
          setCity("Permission denied");
        },
      );
    } else {
      setCity("Geolocation not supported");
    }
  }, []);

  return <p className="text-sm text-accent-black/60">Your city: {city}</p>;
}
