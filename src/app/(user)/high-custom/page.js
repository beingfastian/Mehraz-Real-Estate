"use server";
import React from "react";
import {
  UserScreenSpinner,
  Screen1,
  ProjectDetails,
  DesSelStep1Screen1InputBox,
  DesSelSelect,
  Placetype,
  Card,
  SpecificDetail,
  UserProtectedRoute,
  HighCustompage,
} from "@/components";
import {
  industrialImage,
  renovativeImage,
  residentialImage,
  commercialImage,
} from "@/assets";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/Firebase/firebase";
import getStylesFromDB from "@/Firebase/admin-side/roles-analytics-cities/styles/getStylesFromFirebase";

const Route = async () => {
  const cities = [
    { name: "Faisalabad", label: "Faisalabad" },
    { name: "Karachi", label: "Karachi" },
    { name: "Lahore", label: "Lahore" },
    { name: "Islamabad", label: "Islamabad" },
    { name: "Peshawar", label: "Peshawar" },
  ];

  const projecttype = [
    {
      text: (
        <>
          <b>RESIDENTIAL</b> DESIGN
        </>
      ),
      URL: "residential",
      imagesrc: residentialImage.src,
    },
    {
      text: (
        <>
          {" "}
          <b>COMMERCIAL</b> DESIGN
        </>
      ),
      URL: "commercial",
      imagesrc: commercialImage.src,
    },
    {
      text: (
        <>
          <b>RENOVATION</b> / INTERIOR DESIGN
        </>
      ),
      URL: "renovative",
      imagesrc: renovativeImage.src,
    },
    {
      text: (
        <>
          <b>INDUSTRIAL</b> / OTHER
        </>
      ),
      URL: "industrial",
      imagesrc: renovativeImage.src,
    },
  ];

  async function handlebuyplotexternal(document) {
    try {
      const docRef = await addDoc(collection(db, "highcustom"), document);
      console.log("Saved:", docRef);
      return true;
    } catch (error) {
      console.log("Error", error.message);
      return false;
    }
  }

  // ✅ Fetch styles server-side and pass as props
  let styles = [];
  let error = null;
  try {
    styles = await getStylesFromDB(["id", "name", "budget", "image"]);
  } catch (e) {
    error = "Failed to fetch styles";
  }

  return (
    <HighCustompage
      cities={cities}
      projecttype={projecttype}
      styles={styles}
      error={error}
    />
  );
};

export default Route;
