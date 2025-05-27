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
import { custom2, customicon, myVerseImage } from "@/assets";
import {
  industrialImage,
  renovativeImage,
  residentialImage,
  commercialImage,
} from "@/assets";
import Image from "next/image";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/Firebase/firebase";
const defaultStep1Screen2FormData = {
  city: "",
};

const Route = () => {
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
      imagesrc: residentialImage.src, // Replace with your actual image path
    },
    {
      text: (
        <>
          {" "}
          <b>COMMERCIAL</b> DESIGN
        </>
      ),
      URL: "commercial",
      imagesrc: commercialImage.src, // Replace with your actual image path
    },
    {
      text: (
        <>
          <b>RENOVATION</b> / INTERIOR DESIGN
        </>
      ),
      URL: "renovative",
      imagesrc: renovativeImage.src, // Replace with your actual image path
    },
    {
      text: (
        <>
          <b>INDUSTRIAL</b> / OTHER
        </>
      ),
      URL: "industrial",
      imagesrc: renovativeImage.src, // Replace with your actual image path
    },
  ];
  async function handlebuyplotexternal(document) {
    try {
      console.log("here is document: ", document);
      const docRef = await addDoc(collection(db, "highcustom"), document);
      console.log("doc ref is:", docRef);
      return true;
    } catch (error) {
      console.log("Error", error.message);
      toast.error(error.message); 
      return false;
    }
  }

  return (
    <UserProtectedRoute>
      <HighCustompage />
    </UserProtectedRoute>
  );
};

export default Route;
