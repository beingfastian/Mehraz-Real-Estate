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



// temp data
const defaultDesign = {
  id: "hajfkajlj214141",
  title: "Design Title",
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
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  style: {
    name: "MODERN",
    budget: "LOW",
  },
  materials: [
    {
      image: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Portland Cement",
      vendor: "Lucky Cement",
      price: "1,200 PKR/Bag",
      description: "High-quality cement for all construction needs",
      specs: "50kg bag, Type I",
      quantity: "100 Bags (1 Lot)"
    },
    {
      image: "https://images.unsplash.com/photo-1605152276897-4f618f831968?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Steel Bars",
      vendor: "Amreli Steels",
      price: "220 PKR/kg",
      description: "High tensile strength steel bars for reinforcement",
      specs: "60-grade, 12mm diameter",
      quantity: "1 Ton (Minimum Order)"
    },
    {
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Red Bricks",
      vendor: "Chenab Bricks",
      price: "12 PKR/Brick",
      description: "Standard size clay bricks for construction",
      specs: "9x4.5x3 inches",
      quantity: "10,000 Bricks (1 Truck Load)"
    },
    {
      image: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Sand",
      vendor: "Chenab Sand Suppliers",
      price: "3,500 PKR/Truck",
      description: "Fine quality construction sand",
      specs: "Sieve size 4.75mm",
      quantity: "700 CFT (1 Truck Load)"
    },
    {
      image: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Marble Tiles",
      vendor: "Pak Marble",
      price: "1,500 PKR/Sq.Ft",
      description: "Premium quality marble flooring tiles",
      specs: "2x2 feet, 18mm thickness",
      quantity: "100 Sq.Ft (Minimum Order)"
    },
    {
      image: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Ceramic Tiles",
      vendor: "Master Tiles",
      price: "300 PKR/Sq.Ft",
      description: "Glossy finish ceramic wall tiles",
      specs: "1x2 feet, 8mm thickness",
      quantity: "50 Sq.Ft (Minimum Order)"
    },
    {
      image: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "PVC Pipes",
      vendor: "Star Pipes",
      price: "350 PKR/Foot",
      description: "4-inch diameter sewerage pipes",
      specs: "10 feet length, Schedule 40",
      quantity: "10 Pipes (Minimum Order)"
    },
    {
      image: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Electrical Wires",
      vendor: "Pak Cables",
      price: "120 PKR/Foot",
      description: "Copper core building wires",
      specs: "1.5mm, 3-core",
      quantity: "100 Feet (Minimum Order)"
    },
    {
      image: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Wooden Doors",
      vendor: "Chenab Doors",
      price: "25,000 PKR/Piece",
      description: "Solid wood main entrance door",
      specs: "3x7 feet, Teak wood",
      quantity: "1 Piece"
    },
    {
      image: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Aluminum Windows",
      vendor: "Falcon Windows",
      price: "8,000 PKR/Sq.Ft",
      description: "Sliding aluminum windows",
      specs: "Double glazed, Powder coated",
      quantity: "1 Sq.Ft (Minimum Order)"
    },
    {
      image: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Waterproofing",
      vendor: "Sika Pakistan",
      price: "1,200 PKR/Liter",
      description: "Liquid waterproofing membrane",
      specs: "Covers 4 Sq.Ft/Liter",
      quantity: "20 Liter (Drum)"
    },
    {
      image: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Sanitary Ware",
      vendor: "Duravit",
      price: "15,000 PKR/Piece",
      description: "Wall hung WC with soft close seat",
      specs: "European standard",
      quantity: "1 Piece"
    },
      {
    image: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Concrete Blocks",
    vendor: "Chenab Concrete",
    price: "45 PKR/Block",
    description: "Standard concrete blocks for construction",
    specs: "8x8x16 inches",
    quantity: "500 Blocks (1 Pallet)"
  },
  {
    image: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Roofing Sheets",
    vendor: "Gul Ahmed Steel",
    price: "450 PKR/Sq.Ft",
    description: "Galvanized steel roofing sheets",
    specs: "26 gauge, 3 feet width",
    quantity: "100 Sq.Ft (Minimum Order)"
  },
  {
    image: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Floor Tiles",
    vendor: "Shabbir Tiles",
    price: "400 PKR/Sq.Ft",
    description: "Anti-skid ceramic floor tiles",
    specs: "2x2 feet, 10mm thickness",
    quantity: "50 Sq.Ft (Minimum Order)"
  },
  {
    image: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Wall Putty",
    vendor: "Durabuild",
    price: "800 PKR/Bag",
    description: "White cement based wall putty",
    specs: "40kg bag, covers 40 Sq.Ft",
    quantity: "10 Bags (Minimum Order)"
  },
  {
    image: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Plumbing Fittings",
    vendor: "Aqua Flow",
    price: "150 PKR/Piece",
    description: "PVC plumbing joints and elbows",
    specs: "1/2 inch to 2 inch sizes",
    quantity: "50 Pieces (Minimum Order)"
  },
  {
    image: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Electrical Switches",
    vendor: "Pak Elektrik",
    price: "250 PKR/Piece",
    description: "Modular electrical switches",
    specs: "15A, 250V, Screwless",
    quantity: "10 Pieces (Minimum Order)"
  },
  {
    image: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Glass Panels",
    vendor: "Clear View Glass",
    price: "1,800 PKR/Sq.Ft",
    description: "Tempered glass panels",
    specs: "6mm thickness, clear",
    quantity: "10 Sq.Ft (Minimum Order)"
  },
  {
    image: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Wallpaper",
    vendor: "Decor Plus",
    price: "1,200 PKR/Roll",
    description: "Self-adhesive wall covering",
    specs: "20 inch width, 33 feet length",
    quantity: "5 Rolls (Minimum Order)"
  },
  {
    image: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Ceiling Fans",
    vendor: "Pak Fan",
    price: "8,500 PKR/Piece",
    description: "Energy efficient ceiling fan",
    specs: "48 inch, 3 blades, Remote control",
    quantity: "1 Piece"
  },
  {
    image: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Kitchen Sink",
    vendor: "Franke",
    price: "12,000 PKR/Piece",
    description: "Stainless steel double bowl sink",
    specs: "18/10 steel, 60x45cm",
    quantity: "1 Piece"
  },
  {
    image: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Bathroom Faucet",
    vendor: "Grohe",
    price: "6,500 PKR/Piece",
    description: "Wall mounted bathroom faucet",
    specs: "Single lever, Chrome finish",
    quantity: "1 Piece"
  },
  {
    image: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "LED Lights",
    vendor: "Philips",
    price: "1,200 PKR/Piece",
    description: "Energy saving LED bulbs",
    specs: "15W (100W equivalent), 6500K",
    quantity: "10 Pieces (Minimum Order)"
  },
  {
    image: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Security Cameras",
    vendor: "Dahua",
    price: "15,000 PKR/Piece",
    description: "Outdoor IP security camera",
    specs: "4MP, Night vision, Weatherproof",
    quantity: "1 Piece"
  },
  {
    image: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Door Locks",
    vendor: "Yale",
    price: "4,500 PKR/Piece",
    description: "Mortise door lock set",
    specs: "Brass finish, 3 keys included",
    quantity: "1 Piece"
  },
  {
    image: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Wall Paint",
    vendor: "Berger",
    price: "1,800 PKR/Gallon",
    description: "Premium interior wall paint",
    specs: "Matte finish, 1 gallon covers 400 Sq.Ft",
    quantity: "1 Gallon"
  },
  {
    image: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Wood Polish",
    vendor: "Feast Watson",
    price: "2,500 PKR/Liter",
    description: "Wood finishing polish",
    specs: "Clear gloss, 1 liter covers 150 Sq.Ft",
    quantity: "1 Liter"
  },
  {
    image: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Wall Cladding",
    vendor: "Stone Depot",
    price: "1,800 PKR/Sq.Ft",
    description: "Natural stone wall cladding",
    specs: "Random pattern, 1-2 inch thickness",
    quantity: "20 Sq.Ft (Minimum Order)"
  },
  {
    image: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Floor Grout",
    vendor: "Mapei",
    price: "1,500 PKR/Bag",
    description: "Tile joint filling compound",
    specs: "5kg bag, covers 25 Sq.Ft",
    quantity: "5 Bags (Minimum Order)"
  },
  {
    image: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Shower Enclosure",
    vendor: "Jaquar",
    price: "45,000 PKR/Piece",
    description: "Frameless glass shower cabin",
    specs: "36x36 inches, 8mm tempered glass",
    quantity: "1 Piece"
  },
  {
    image: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Kitchen Countertop",
    vendor: "Corian",
    price: "3,500 PKR/Sq.Ft",
    description: "Solid surface kitchen counter",
    specs: "12mm thickness, seamless joints",
    quantity: "10 Sq.Ft (Minimum Order)"
  },
  {
    image: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Window Blinds",
    vendor: "Hunter Douglas",
    price: "2,500 PKR/Sq.Ft",
    description: "Aluminum vertical blinds",
    specs: "89mm slats, Remote controlled",
    quantity: "10 Sq.Ft (Minimum Order)"
  },
  {
    image: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Solar Panels",
    vendor: "Jinko Solar",
    price: "45,000 PKR/Panel",
    description: "550W Mono PERC Solar Panel",
    specs: "25 years performance warranty",
    quantity: "1 Panel"
  },
  {
    image: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Inverter Battery",
    vendor: "Phoenix",
    price: "35,000 PKR/Piece",
    description: "Deep cycle solar battery",
    specs: "200Ah, 12V, Maintenance free",
    quantity: "1 Piece"
  },
    {
    image: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Solar Panels",
    vendor: "Jinko Solar",
    price: "45,000 PKR/Panel",
    description: "550W Mono PERC Solar Panel",
    specs: "25 years performance warranty",
    quantity: "1 Panel"
  },
  {
    image: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Inverter Battery",
    vendor: "Phoenix",
    price: "35,000 PKR/Piece",
    description: "Deep cycle solar battery",
    specs: "200Ah, 12V, Maintenance free",
    quantity: "1 Piece"
  }
  ],
};

const MaterialSelectionPage = ({ setStep }) => {
  const borderColor = "#00000033";
  const [design, setDesign] = useState(null);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [hoveredMaterial, setHoveredMaterial] = useState(null);
const [selectedCategory, setSelectedCategory] = useState("ALL");
const [popupMaterial, setPopupMaterial] = useState(null);
const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [showFilter, setShowFilter] = useState(false);
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });
    const [filters, setFilters] = useState({
    city: "Faisalabad",
    cost: "LOW TO HIGH",
    quality: null,
  });


  const fetchDesignData = async () => {
    setDesign(defaultDesign);
  };

    // Group materials into chunks of 4 for carousel slides

  const groupedMaterials = [];
  if (design?.materials) {
    for (let i = 0; i < design.materials.length; i += 18) {
      groupedMaterials.push(design.materials.slice(i, i + 18));
    }
  }

  const materials = [
    {
      icon: blackwall,
      alt: "black wall icon",
      heading: "Building",
      content: "Grey Structure",
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
      heading: "FINISH",
      content: "& Decor",
    },
    {
      icon: blackLeaf,
      alt: "Leaf icon",
      heading: "LANDSCAPE",
      content: "& Decor",
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

  const handleMaterialSelect = (material) => {
    setSelectedMaterial(material === selectedMaterial ? null : material);
  };

  useEffect(() => {
    fetchDesignData();
  }, []);

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
    <Suspense fallback={<UserScreenSpinner />}>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="px-8 h-[calc(100vh-6rem)] lg:h-[calc(100vh-4rem)] sm:p-0"
      >
        <div className="max-w-8xl w-auto min-h-[500px] max-h-page-user-inner mx-auto px-4 pt-8 h-[80vh] flex flex-col">
          {/* Keep the exact same top bar as before */}
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
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search"
                      className="text-[20px] w-[285px] h-[45px] rounded-[50px] p-2 ml-[35px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-black border border-1 border-black"
                    />
                    <Image
                      src={searchIcon}
                      alt="Search Icon"
                      className="w-[34px] h-[34px] opacity-60 absolute top-1/2 left-[90%] transform -translate-x-1/2 -translate-y-1/2"
                    />
                  </div>
                  <div className="flex justify-center items-center gap-2">
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
  <div className="absolute top-14 right-0 bg-white border border-gray-300 rounded-lg shadow-lg w-[560px] z-50 p-6">
    
    {/* Top Bar - Centered Filter Icon + Text */}
<div className="flex items-center justify-between mb-2">
  <div className="flex items-center justify-center gap-2 flex-1"> {/* Added justify-center and flex-1 */}
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

    {/* Divider */}
    <div className="border-b border-black opacity-30 mb-4"></div>

    {/* Dropdowns - City & Cost */}
    <div className="flex gap-4 mb-6">
      {/* City Dropdown */}
      <div className="flex flex-col w-1/2 items-center mx-[35px]">
        <label
          className="text-black/90 mb-3 uppercase"
          style={{
            fontFamily: "FONTSPRING DEMO - Proxima Nova",
            fontWeight: 600,
            fontSize: "18px",
            lineHeight: "100%",
            letterSpacing: "0%",
            textAlign: "center",
          }}
        >
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
            container: {
              height: "44px",
              border: "1px solid rgba(40,40,40,0.6)",
            },
            text: {
              fontSize: "14px",
              fontWeight: 400,
            },
            chevronContainer: {
              width: "50px",
              height: "44px",
            },
            chevronIcon: {
              fontSize: "16px",
            },
          }}
        />
      </div>

      {/* Cost Dropdown */}
      <div className="flex flex-col w-1/2 items-center mx-[35px]">
        <label
          className="text-black/90 mb-3 uppercase"
          style={{
            fontFamily: "FONTSPRING DEMO - Proxima Nova",
            fontWeight: 600,
            fontSize: "18px",
            lineHeight: "100%",
            letterSpacing: "0%",
            textAlign: "center",
          }}
        >
          COST
        </label>
        <DesSelSelect
          options={budget.map((b) => ({ label: b.name, value: b.name }))}
          selectedOption={filters.cost}
          selectHandler={(value) => handleFilterChange("cost", value)}
          customStyle={{
            container: {
              height: "44px",
              border: "1px solid rgba(40,40,40,0.6)",
            },
            text: {
              fontSize: "14px",
              fontWeight: 400,
            },
            chevronContainer: {
              width: "50px",
              height: "44px",
            },
            chevronIcon: {
              fontSize: "16px",
            },
          }}
        />
      </div>
    </div>

    {/* Divider */}
    <div className="border-b border-black opacity-30 mb-4"></div>

    {/* Rating Tags */}
<div className="flex justify-between items-start mb-4 px-2">
  {/* Left Text Block */}
  <div className="flex flex-col text-center">
    <span
      style={{
        fontFamily: "FONTSPRING DEMO - Proxima Nova",
        fontWeight: 400,
        fontSize: "18px",
        lineHeight: "100%",
        letterSpacing: "0%",
        color: "rgba(47, 47, 47, 0.7)",
        textTransform: "uppercase",
      }}
    >
      SPECIFIC QUALITY
    </span>
    <span
      style={{
        fontFamily: "FONTSPRING DEMO - Proxima Nova",
        fontWeight: 700,
        fontSize: "18px",
        lineHeight: "100%",
        letterSpacing: "0%",
        color: "rgba(47, 47, 47, 0.7)",
        textTransform: "uppercase",
      }}
    >
      RATINGS
    </span>
  </div>

  {/* Right Buttons */}
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
        style={{
          fontFamily: "FONTSPRING DEMO - Proxima Nova",
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "100%",
          letterSpacing: "0%",
          color: "#2F2F2F",
        }}
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


    {/* Divider */}
    <div className="border-b border-black opacity-30 mb-4"></div>

    {/* Apply Button */}
<div className="flex justify-center mt-4">
  <button
    onClick={applyFilters}
    className="w-[220px] h-[48px] bg-[#323232] text-white text-[13px] font-semibold uppercase rounded-[4px] shadow-md hover:bg-[#1f1f1f] transition"
    style={{
      padding: "14px 50px",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      gap: "10px",
    }}
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
<aside className="flex gap-3 px-4 overflow-x-hidden -ml-[-250px]">
  {["ALL", "TREES", "WOOD", "STONE", "GLASS"].map((category, i) => (
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
      {category} (9)
    </button>
  ))}
</aside>

            {/* Keep the same left sidebar */}
            <div className={`left-side absolute h-[80%] top-[263px] transform -translate-y-1/2 rounded-full flex justify-around items-center flex-col w-[58px] hover:min-w-[200px] hover:w-auto hover:rounded-lg border border-1 border-[${borderColor}] bg-[#ffffff] z-10`}>
{materials?.map((value, index) => (
  <React.Fragment key={index}>
    {index !== 0 && <div className="w-[70%] h-[1px] bg-gray-300 mx-auto" />}  {/* Divider */}
    
    <div
      className={`rounded-full bg-bg-dull w-full overflow-hidden flex cursor-pointer
        ${selectedCategory === index 
          ? 'bg-[#fce7cc] border border-[#e6a87f]' 
          : 'bg-gray-100 hover:bg-gray-200 border border-transparent'}
      `}
      onClick={() => setSelectedCategory(index)}
    >
      <Image
        src={value.icon}
        alt={value.alt}
        height={100}
        width={100}
        className={`h-[55px] w-[55px] p-1`}
      />
      <div className="flex flex-col justify-center items-center">
        <p className="text-sm font-medium">{value?.heading}</p>
        <span className="text-xxs">{value?.content}</span>
      </div>
    </div>
  </React.Fragment>
))}


            </div>

{/* Updated Carousel with 18 materials per slide (3x6 grid) */}
<div className="right-carousel sm:w-full w-[90%] ml-auto relative"> {/* Added relative positioning */}
  <div className="h-full w-full">
    <DesignCarouselMain slidesCount={groupedMaterials.length}>
      {groupedMaterials.map((materialGroup, slideIndex) => (
        <div 
          key={slideIndex}
          className="h-[58vh] min-h-[460px] lg:h-[48vh] sm:h-[36vh] xs:h-[30vh] rounded-xl overflow-hidden !grid grid-cols-6 grid-rows-3 gap-x-2 gap-y-4 p-2"
        >
          {materialGroup.map((material, index) => {
            const isSelected = selectedMaterials.some(selected => selected.name === material.name);
            return (
              <div
                key={index}
                className={`w-[145px] h-[150px] rounded-[10px] relative border border-gray-200 shadow-md hover:shadow-lg transition-all flex flex-col ${
                  isSelected ? 'bg-[#21254A]' : 'bg-white'
                }`}
                onMouseEnter={(e) => handleMaterialHover(material, e)}
                onMouseLeave={handleMaterialLeave}
                onClick={(e) => {
                  if (isSelected) {
                    setSelectedMaterials(prev => 
                      prev.filter(selected => selected.name !== material.name)
                    );
                    setPopupMaterial(null); // Close popup when deselected
                  } else {
                    setSelectedMaterials(prev => [...prev, material]);
    setPopupMaterial({
      ...material,
      rowIndex: Math.floor(index / 6) // Assuming 6 columns per row
                    });
                  }
                }}
              >
                {/* Material Image */}
                <div className="w-full h-[85px] rounded-[5px] overflow-hidden relative">
                  <Image
                    src={material.image}
                    layout="fill"
                    objectFit="cover"
                    alt={`Material ${material.name}`}
                    className="w-full h-full"
                  />
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
                    {material.price}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </DesignCarouselMain>
  </div>

  {/* Popup Card */}
  {popupMaterial && (
    <div 
      className="absolute z-50" 
      style={{
        left: `-150px`, // Position to the right of the selected item
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
          
          {/* Keep the same hover preview */}
          {/* {hoveredMaterial && (
            <div 
              className="fixed bg-white p-4 border border-gray-300 shadow-lg rounded-lg z-50 w-[400px]"
              style={{
                left: `${previewPosition.x + 20}px`,
                top: `${previewPosition.y + 20}px`
              }}
            >
              <div className="flex">
                <Image
                  src={hoveredMaterial.image}
                  width={150}
                  height={100}
                  alt={hoveredMaterial.name}
                  className="rounded-md"
                />
                <div className="ml-4">
                  <h3 className="font-bold text-xl">{hoveredMaterial.name}</h3>
                  <p className="text-gray-600">{hoveredMaterial.vendor}</p>
                  <p className="font-bold mt-2">{hoveredMaterial.price}</p>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-sm text-gray-700">{hoveredMaterial.description}</p>
                <p className="text-sm mt-2"><span className="font-semibold">Specs:</span> {hoveredMaterial.specs}</p>
                <p className="text-sm mt-1"><span className="font-semibold">Quantity:</span> {hoveredMaterial.quantity}</p>
              </div>
            </div>
          )} */}
          
          <div className="flex justify-end items-center mt-1">
            <BlackButton onclickfunction={() => setStep(prev => prev + 1)} />
          </div>
        </div>
      </motion.section>
    </Suspense>
  );
};

export default MaterialSelectionPage;