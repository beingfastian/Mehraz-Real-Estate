"use client";
import React, { useState } from "react";
import { AiOutlineContacts } from "react-icons/ai";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { PiCopyLight } from "react-icons/pi";
import { BiSolidCopy } from "react-icons/bi";
import Image from "next/image";

const Contact = () => {
  const [copiedType, setCopiedType] = useState("");

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(""), 3000); // Reset the state after 2 seconds
  };

  return (
    <div
      className="w-full min-h-full object-cover bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: `url(/images/user-side/backgroundContact.png)`,
        backgroundPosition: `center`,
      }}>
      <div className="relative p-6 overflow-x-hidden rounded-lg w-full mflg:container mx-auto px-2">
        {/* <div className='absolute top-16 right-0 cursor-pointer p-4'>
          <RxCross1 className="text-white text-4xl" />
        </div> */}
        {/* Left Section */}
        <div className="flex flex-col items-center py-5 gap-x-5 w-full mfmd:flex-row  mt-5">
          <div className="flex items-center   justify-center min-w-[300px] mflg:min-w-[500px]">
            <AiOutlineContacts className="text-5xl font-bold text-white mr-3" />
            <h1 className="text-4xl text-white font-bold w-auto mflg:w-20">
              Contact Us
            </h1>
          </div>
          <div className="w-full mflg:max-w-[700px] gap-5">
            <div className="flex items-center mfxs:mt-5 mflg:mt-0 mfxs:min-w-full mfmd:max-w-[500px] mflg:max-w-[700px] justify-between bg-white px-4 py-2 rounded-full shadow-md">
              <FaPhoneAlt className="text-black text-2xl mr-3" />
              <p className="text-gray-800 font-medium flex-1">Phone</p>
              <p className="text-gray-800 font-medium flex-1">
                +92-325-8181842
              </p>
              <div
                className={`flex flex-col items-center cursor-pointer ${
                  copiedType === "phone" ? "text-black" : "text-gray-600"
                }`}
                onClick={() => handleCopy("+92-325-8181842", "phone")}>
                {copiedType === "phone" ? (
                  <BiSolidCopy className="text-xl mb-1" />
                ) : (
                  <PiCopyLight className="text-xl mb-1" />
                )}
                <p className="text-sm">Copy</p>
              </div>
            </div>
            <div className="flex items-center my-5 mfxs:min-w-full mfmd:max-w-[500px] mflg:max-w-[700px] rounded-full bg-white px-10 py-4  shadow-md">
              <MdEmail className="text-black text-2xl mr-3" />
              <p className="text-gray-800 font-medium flex-1">Email</p>
              <p className="text-gray-800 font-medium flex-1">
                admin@mehraz.pk
              </p>
              <div
                className={`flex flex-col items-center cursor-pointer ${
                  copiedType === "email" ? "text-black" : "text-gray-600"
                }`}
                onClick={() => handleCopy("admin@mehraz.pk", "email")}>
                {copiedType === "email" ? (
                  <BiSolidCopy className="text-xl mb-1" />
                ) : (
                  <PiCopyLight className="text-xl mb-1" />
                )}
                <p className="text-sm">Copy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <p className="text-2xl capitalize text-white font-bold mb-4">
          OUR OFFICES
        </p>
        <div className="flex flex-col items-start gap-x-5 w-full mfmd:flex-row justify-center mt-5">
          <div className="flex flex-1 w-full mfmd:w-1/2 items-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.081782409342!2d144.96305761582242!3d-37.81421787975161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xb0f420ce989d9e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1612385971180!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="w-full h-72 rounded-lg"></iframe>
          </div>

          <div className="w-full mflg:w-1/3 mfmd:w-1/2 flex flex-wrap mfsm:flex-nowrap mt-5 mfmd:mt-0">
            <div className="bg-transparent mfmd:max-w-[250px] rounded-lg shadow-md p-4">
              <Image
                fill
                src="https://plus.unsplash.com/premium_photo-1693966067602-9ca1f56695c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnVpbGRpbmdzfGVufDB8fDB8fHww"
                alt="Office 1"
                className="w-[1800px] h-32 rounded-lg outline outline-white outline-offset-4 p-2 mb-2"
              />
              <div className="flex gap-2 mt-5">
                <p className="text-3xl text-white">
                  <FaMapMarkerAlt />
                </p>
                <div>
                  <h1 className="text-white font-bold text-nowrap">OFFICE 1</h1>
                  <p className="text-gray-400 text-md font-bold">Location</p>
                  <a
                    href="https://www.google.com/maps"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-md font-bold underline text-nowrap">
                    VIEW IN MAPS
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-transparent mb-3 mfmd:max-w-[250px] rounded-lg shadow-md p-4">
              <Image
                fill
                src="https://plus.unsplash.com/premium_photo-1693966067602-9ca1f56695c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnVpbGRpbmdzfGVufDB8fDB8fHww"
                alt="Office 1"
                className="w-[1800px] h-32 rounded-lg outline outline-white outline-offset-4 p-2 mb-2"
              />
              <div className="flex gap-2 mt-5">
                <p className="text-3xl text-white">
                  <FaMapMarkerAlt />
                </p>
                <div>
                  <h3 className="text-white font-bold text-nowrap">OFFICE 2</h3>
                  <p className="text-gray-400 text-md font-bold">Location</p>
                  <a
                    href="https://www.google.com/maps"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-md font-bold underline text-nowrap">
                    VIEW IN MAPS
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
