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
import { searchIcon, messageIcon, tickIcon } from "@/assets";
import UButton from "../UButton";
import DesignCarouselMain from "../designs/DesignCarouselMain";
import BlackButton from "../BlackButton";
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

const MaterialSelectionPreview = ({ setStep }) => {
  const borderColor = "#00000033";
  const [design, setDesign] = useState(null);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [hoveredMaterial, setHoveredMaterial] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
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

  // Group materials into chunks of 12 for carousel slides
  const groupedMaterials = [];
  if (design?.materials) {
    for (let i = 0; i < design.materials.length; i += 12) {
      groupedMaterials.push(design.materials.slice(i, i + 12));
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
    setSelectedMaterials(prev => {
      if (prev.some(m => m.name === material.name)) {
        return prev.filter(m => m.name !== material.name);
      }
      return [...prev, material];
    });
  };

  const isMaterialSelected = (material) => {
    return Array.isArray(selectedMaterials) && selectedMaterials.some(m => m.name === material.name);
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
    console.log("Applying filters:", filters);
    setShowFilter(false);
  };

  const getFilteredMaterials = () => {
    if (!selectedCategory) return [];
    
    const category = materials.find(cat => cat.heading === selectedCategory);
    if (!category) return [];
    
    let filtered = [...category.materials];
    
    if (filters.quality) {
      const [min, max] = filters.quality.split('-').map(Number);
      filtered = filtered.filter(material => material.rating >= min && material.rating <= max);
    }
    
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

          <div className="Material-container relative flex-1 space-y-1">
            <aside className="flex gap-3 px-4 overflow-x-hidden -ml-[-250px]">
              {["ALL", "TREES", "WOOD", "STONE", "GLASS"].map((category, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap px-[50px] py-2 rounded-full border font-medium
                    ${
                      selectedCategory === category
                        ? "bg-gray-800 text-white border-black font-semibold"
                        : "bg-white text-black border-black"
                    }`}
                >
                  {category} (9)
                </button>
              ))}
            </aside>

            <div className={`left-side absolute h-[80%] top-[263px] transform -translate-y-1/2 rounded-full flex justify-around items-center flex-col w-[58px] hover:min-w-[200px] hover:w-auto hover:rounded-lg border border-1 border-[${borderColor}] bg-[#ffffff] z-10`}>
              {materials?.map((value, index) => (
                <div
                  key={index}
                  className={`rounded-full bg-bg-dull border border-1 border-[${borderColor}] w-full overflow-hidden flex cursor-pointer ${
                    selectedCategory === index 
                    ? 'bg-[#f0d4b1] border border-[#e6a87f]' 
                    : 'bg-gray-100 hover:bg-gray-200 border border-transparent'
                  }`}
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
              ))}
            </div>

<div className="-mt-[50px]">
  <OrderListCardPr selectedMaterials={selectedMaterials} />
</div>

            <div className="right-carousel sm:w-full w-[90%] ml-auto">
              <div className="h-full w-full -mt-[30px]">
                <DesignCarouselMain slidesCount={groupedMaterials.length} className="custom-arrow-up">
                  {groupedMaterials.map((materialGroup, slideIndex) => (
                    <div 
                      key={slideIndex}
                      className="h-[50vh] min-h-[400px] max-h-[auto] lg:h-[40vh] sm:h-[30vh] xs:h-[25vh] rounded-xl overflow-hidden !grid grid-cols-6 grid-rows-3 gap-2 p-2"
                    >
                      {materialGroup.map((material, index) => {
                        const isSelected = isMaterialSelected(material);
                        return (
                          <div
                            key={index}
                            className={`w-full h-full p-1 rounded-lg relative border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col ${
                              isSelected ? 'bg-[#21254A] text-white' : 'bg-white'
                            }`}
                            onMouseEnter={(e) => handleMaterialHover(material, e)}
                            onMouseLeave={handleMaterialLeave}
                            onClick={() => handleMaterialSelect(material)}
                          >
                            <div className="w-full h-20 rounded-md overflow-hidden relative flex-shrink-0">
                              <Image
                                src={material.image}
                                layout="fill"
                                objectFit="cover"
                                alt={`Material ${material.name}`}
                                className="w-full h-full"
                              />
                              <div className={`absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center ${
                                isSelected ? 'bg-blue-500' : 'bg-gray-200'
                              }`}>
                                <Image
                                  src={tickIcon}
                                  width={12}
                                  height={12}
                                  alt="Selected"
                                  className={isSelected ? 'bg-blue-500 opacity-[100%]' : 'opacity-50'}
                                />
                              </div>
                            </div>
                            <div className="mt-1 p-1 flex-grow flex flex-col">
                              <h4 className={`font-bold text-xs uppercase truncate ${
                                isSelected ? 'text-white' : 'text-black'
                              }`}>{material.name}</h4>
                              <p className={`text-[10px] truncate ${
                                isSelected ? 'text-gray-300' : 'text-gray-600'
                              }`}>{material.vendor}</p>
                              <p className={`text-[10px] mt-auto rounded-full px-1 py-0.5 truncate ${
                                isSelected ? 'bg-[#3a3f6d] text-white' : 'bg-gray-100'
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
            </div>
          </div>
          
          <div className="flex justify-end items-center mt-[-100px]">
            <BlackButton onclickfunction={() => setStep(prev => prev + 1)} />
          </div>
        </div>
      </motion.section>
    </Suspense>
  );
};

export default MaterialSelectionPreview;