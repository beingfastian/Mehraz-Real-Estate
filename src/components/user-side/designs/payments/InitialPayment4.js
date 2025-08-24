"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BlackButton from "@/components/user-side/BlackButton";
import { IoChatboxOutline } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import { fastHomeIcon } from "@/assets";
import { Backbutton, UButton } from "@/components";
import Image from "next/image";
import { renovativeImage, residentialImage, commercialImage } from "@/assets";
import { Card2 } from "@/components";
import { FaCheck } from "react-icons/fa6";
import { DesignIcon } from "@/components";
import { whitewall, buyMaterialLightIcon, couch } from "@/assets";
import useRPS from "@/hooks/useRPS";
import { useAuth } from "@/context/UserContext";
import { fetchPaymentService } from "@/services/admin-side/fetchPaymentService";

const InitialPayment4 = ({ setStep, setPaymentAmount, setPaymentType }) => {
  const { router, pathname, searchParams } = useRPS();
  const [auth, setAuth, setIsAcceptTerms, isAcceptTerms] = useAuth();
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract project type from URL
  const getProjectTypeFromUrl = () => {
    const pathSegments = pathname.split("/");
    const projectTypes = ["fast-homes", "high-custom"];
    const projectType = pathSegments.find(segment =>
      projectTypes.includes(segment),
    );
    return projectType || "unknown-project";
  };

  // Get user ID
  const getUserId = () => {
    if (!auth || auth.isLoading || !auth.success || !auth.user) {
      return null;
    }
    return auth.user.phone;
  };

  // Fetch payment data on component mount
  useEffect(() => {
    const loadPaymentData = async () => {
      const userId = getUserId();
      const projectType = getProjectTypeFromUrl();

      if (!userId) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const result = await fetchPaymentService(userId, projectType);

        if (result.success) {
          setPaymentData(result.data);
          setError(null);
        } else {
          // If no payment data found, set default values
          setPaymentData({
            costDesign: 0,
            costConstruction: 0,
            costMaterials: 0,
            costFurnitures: 0,
            totalCost: 0,
          });
          setError(null);
        }
      } catch (error) {
        console.error("Error loading payment data:", error);
        setError("Failed to load payment data");
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if auth is not loading
    if (!auth?.isLoading) {
      loadPaymentData();
    }
  }, [auth, pathname]);

  // Handle individual payment
  const handleIndividualPayment = (serviceType, amount) => {
    setPaymentAmount(amount);
    setPaymentType(serviceType);

    const newParams = new URLSearchParams(searchParams);
    newParams.set("screen", 7);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  // Handle pay for all
  const submitHandler = () => {
    const totalAmount = paymentData?.totalCost || 0;
    setPaymentAmount(totalAmount);
    setPaymentType("all");

    const newParams = new URLSearchParams(searchParams);
    newParams.set("screen", 7);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const formatCurrency = amount => {
    return new Intl.NumberFormat("en-PK").format(amount);
  };

  const getServiceStatus = cost => {
    return cost === 0 ? "PAYMENT CLEARED" : `${formatCurrency(cost)} PKR`;
  };

  const getServiceStatusColor = cost => {
    return cost === 0 ? "text-green-600" : "text-black";
  };

  const projecttype = [
    {
      icon: <DesignIcon fill="white" stroke="white" width={50} height={50} />,
      text: (
        <>
          <b>DESIGN</b>
        </>
      ),
      URL: "residential",
      imagesrc: residentialImage.src,
      checked: paymentData?.costDesign > 0,
      cost: paymentData?.costDesign || 0,
      serviceType: "design",
    },
    {
      icon: (
        <Image
          src={whitewall}
          alt="CONSTRUCTION"
          width={50}
          height={50}
          className="object-contain"
        />
      ),
      text: (
        <>
          <b>CONSTRUCTION</b>
        </>
      ),
      URL: "commercial",
      imagesrc: commercialImage.src,
      checked: paymentData?.costConstruction > 0,
      cost: paymentData?.costConstruction || 0,
      serviceType: "construction",
    },
    {
      icon: (
        <Image
          src={buyMaterialLightIcon}
          alt="Materials"
          width={50}
          height={50}
          className="object-contain"
        />
      ),
      text: (
        <>
          <b>MATERIALS</b>
        </>
      ),
      URL: "renovative",
      imagesrc: renovativeImage.src,
      checked: paymentData?.costMaterials > 0,
      cost: paymentData?.costMaterials || 0,
      serviceType: "materials",
    },
    {
      icon: (
        <Image
          src={couch}
          alt="Furniture"
          width={40}
          height={40}
          className="object-contain"
        />
      ),
      text: (
        <>
          <b>FURNITURE</b> & LANDSCAPE
        </>
      ),
      URL: "industrial",
      imagesrc: renovativeImage.src,
      checked: paymentData?.costFurnitures > 0,
      cost: paymentData?.costFurnitures || 0,
      serviceType: "furniture",
    },
  ];

  // Show loading state
  if (auth?.isLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Loading payment information...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Retry
          </button>
        </div>
      </div>
    );
  }

  const totalPendingAmount = paymentData?.totalCost || 0;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col min-h-full min-w-full">
      <div className="flex">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-1 mt-8">PAYMENT</h1>
          <p className="text-black/70 bg-gray-200/70 max-w-[50%] rounded-2xl mb-4 mx-auto">
            Services Availed
          </p>
        </div>
      </div>

      {/* Service Cards - Keep Original Design */}
      <div className="flex justify-center items-center flex-wrap gap-8 md:gap-6 sm:gap-4 mb-12 ">
        {projecttype.map((value, index) => (
          <div
            key={index}
            style={{
              boxShadow: "10px 15px 20px 0px rgba(0, 0, 0, 0.25)",
              borderRadius: "16px",
            }}>
            <Card2
              data={value}
              setStep={setStep}
              onPayment={handleIndividualPayment}
            />
          </div>
        ))}
      </div>

      {/* Total Amount Section - Your Original Design */}
      <div className="flex flex-col justify-center items-center text-center bg-[#EFEFEF] my-1 text-xl text-center md:text-start md:bg-white w-[40%] shadow-lg border border-gray-300 rounded-xl mx-auto">
        <div className="flex flex-row">
          <span className="font-bold mr-1">TOTAL AMOUNT</span>
          {totalPendingAmount === 0 ? (
            <>CLEARED</>
          ) : (
            <>
              PENDING ={" "}
              <span className="text-black mx-1">
                {formatCurrency(totalPendingAmount)}
              </span>
              <span className="font-bold">PKR</span>
            </>
          )}
        </div>
        <div className="flex items-center">
          <span className="bg-[#0CD350] flex h-[20px] w-[20px] rounded-full justify-center items-center">
            <FaCheck className="text-white text-xs" />
          </span>
          <span className="text-xs ml-2">Satisfaction Guarantee</span>
        </div>
      </div>

      {/* Pay Button - Only show if there's pending amount (Your Original Design) */}
      {totalPendingAmount > 0 && (
        <div className="flex min-w-[80%] w-[80%] mx-auto">
          <UButton
            onClick={submitHandler}
            text="PAY FOR ALL"
            color="gray-white"
            className="text-base px-[30px] mx-auto w-[50%] min-w-[50%] py-1 rounded-3xl"
          />
        </div>
      )}

      {/* Footer Navigation */}
      <footer className="w-full absolute left-0 bottom-0 bg-accent-gray py-3 mt-10">
        <div className="max-w-[80%] mx-auto grid grid-cols-3 text-white text-sm font-semibold">
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
          <div className="flex justify-center items-center">
            <span className="flex items-center gap-2 text-[24px] px-6">
              <IoChatboxOutline />
              <button>CHAT</button>
            </span>
          </div>
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
    </motion.section>
  );
};

export default InitialPayment4;
