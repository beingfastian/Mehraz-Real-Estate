"use client";
import {
  aboutUsIcon,
  blogIcon,
  contactUsIcon,
  goHomeIcon,
  highCustomIcon,
  materialsIcon,
  myVerseImage,
  propertiesIcon,
  servicesIcon,
  teamAndApplyIcon,
  SavedIcon,
} from "@/assets";
import { useEffect, useMemo, useRef, useState } from "react";
import { UserHeaderMenuItem, UserHeaderSubmenuItem } from "@/components";
import {
  FaXTwitter,
  FaFacebookF,
  FaInstagram,
  FaChevronLeft,
} from "react-icons/fa6";
import Link from "next/link";
import { Poppins } from "next/font/google";
import Image from "next/image";

import SubmenuItemOne from "./SubmenuItemOne";
import { getCurrentYear } from "@/helper/helper";
import { useAuth } from "@/context/UserContext";
import { useRedirect } from "@/context/redirectContext";

const poppins = Poppins({
  weight: ["400"],
  subsets: ["latin-ext"],
});

const menuDataItems = [
  { text: "go home", href: "/", src: goHomeIcon },
  { text: "services", href: null, src: servicesIcon },
  { text: "saved", href: "/", src: SavedIcon },
  { text: "blog", href: "/blog", src: blogIcon },
  { text: "contact us", href: "/contact-us", src: contactUsIcon },
  { text: "about us", href: "/about-us", src: aboutUsIcon },
  { text: "team & apply", href: "/team-apply", src: teamAndApplyIcon },
];

const subMenuItems = {
  services: {
    title: "design & build",
    item1: [
      {
        text: "fast homes",
        href: "/fast-homes",
        src: servicesIcon,
      },
      {
        text: "high custom",
        href: "/high-custom",
        src: highCustomIcon,
      },
    ],
    item2: [
      {
        text: "properties",
        href: "/properties",
        src: propertiesIcon,
      },
      {
        text: "materials",
        href: "/materials",
        src: materialsIcon,
      },
    ],
  },
};

const UserHeaderMenu = () => {
  const menuRef = useRef(null);
  const subMenuRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(null);
  const { setIsAcceptTerms } = useRedirect();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setShowSubMenu(null);
  };

  const handleClickOutside = event => {
    if (showSubMenu != null) {
      if (subMenuRef.current && !subMenuRef.current.contains(event.target)) {
        setShowSubMenu(null);
      }
    } else if (isMenuOpen) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleAcceptTerms = () => {
    setIsAcceptTerms(true);
  };

  return (
    <>
      <div
        className={`relative flex items-center justify-end ${poppins.className}`}
        ref={menuRef}>
        <button onClick={toggleMenu} className="space-y-2 md:space-y-1.5">
          <div
            className={`w-10 md:w-7 h-0.5 bg-white transition-transform duration-300 ${
              isMenuOpen && !showSubMenu
                ? "rotate-45 translate-x-0.5 translate-y-2.5 md:translate-y-2"
                : ""
            }`}></div>
          <div
            className={`w-10 md:w-7 h-0.5 bg-white transition-opacity duration-300 ${
              isMenuOpen && !showSubMenu ? "opacity-0" : ""
            }`}></div>
          <div
            className={`w-10 md:w-7 h-0.5 bg-white transition-transform duration-300 ${
              isMenuOpen && !showSubMenu
                ? "-rotate-45 translate-x-0.5 -translate-y-2.5 md:-translate-y-2"
                : ""
            }`}></div>
        </button>
        <div
          className={`max-h-user-header-menu sm:max-h-user-header-menu-sm bg-white rounded-2xl shadow-dropdown-2 absolute z-[2] top-12 sm:top-10 grid transition-grid-rows-opacity-padding duration-300 ${
            isMenuOpen && !showSubMenu
              ? "grid-rows-[1fr] py-4 opacity-100"
              : "grid-rows-[0fr] py-0 opacity-0"
          }`}>
          <div className="overflow-hidden w-max ">
            <div className="max-h-user-header-menu-inner sm:max-h-user-header-menu-inner-sm overflow-y-auto mr-1">
              <ul className={`uppercase flex flex-col`}>
                {menuDataItems.map(({ src, text, href }, index) => (
                  <UserHeaderMenuItem
                    key={index}
                    src={src}
                    text={text}
                    href={href}
                    setIsMenuOpen={setIsMenuOpen}
                    setShowSubMenu={href === null ? setShowSubMenu : null}
                    isHide={index === 2}
                  />
                ))}
              </ul>

              <div
                className={`uppercase text-xs w-full sm:max-w-[200px] sm-text-[8px] f-col gap-1 md:gap-1.5 sm:gap-2 font-light text-center my-4 px-2`}>
                <p>&copy; mehraz (smc-pvt) ltd. all rights reserved</p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <Link
                    href="/terms-and-policy"
                    onClick={handleAcceptTerms}
                    className="underline text-underline-offset text-nowrap ">
                    Terms and conditions
                  </Link>
                  <span className="w-1 h-1 rounded-full bg-accent-black block sm:hidden "></span>
                  <Link
                    href="/terms-and-policy"
                    onClick={handleAcceptTerms}
                    className="underline text-underline-offset ">
                    policy
                  </Link>
                  <span className="w-1 h-1 rounded-full bg-accent-black block sm:hidden"></span>
                  <Link
                    href="/terms-and-policy"
                    onClick={handleAcceptTerms}
                    className="underline text-underline-offset ">
                    refund
                  </Link>
                </div>
              </div>
              <a
                href={"https://www.myverse.club"}
                target="_blank"
                className="mx-4 block bg-accent-dark-blue py-2 pl-2 pr-8 rounded-full">
                <Image
                  src={myVerseImage}
                  alt="myverse"
                  width={100}
                  height={100}
                  className="h-10 lg:h-8 w-auto mx-auto"
                />
              </a>
            </div>
          </div>
        </div>

        <div
          ref={subMenuRef}
          className={`max-h-user-header-menu sm:max-h-user-header-menu-sm bg-white rounded-2xl shadow-dropdown-2 absolute z-[2] top-12 sm:top-10 grid transition-grid-rows-opacity-padding duration-300 ${
            showSubMenu
              ? "grid-rows-[1fr] py-4 opacity-100"
              : "grid-rows-[0fr] py-0 opacity-0"
          }`}>
          <div className="overflow-hidden w-max">
            <div className="max-h-user-header-menu-inner sm:max-h-user-header-menu-inner-sm overflow-y-auto mr-1">
              {showSubMenu && (
                <>
                  <div className="my-2 flex items-end">
                    <button
                      className="opacity-60 p-2 m-1"
                      onClick={() => {
                        setShowSubMenu(null);
                        setIsMenuOpen(true);
                      }}>
                      <FaChevronLeft className="header-arrow-size" />
                    </button>
                    <h3 className="uppercase opacity-60 base-text-0 text-[#000000] text-center w-full pr-9">
                      {subMenuItems[showSubMenu]?.title}
                    </h3>
                  </div>
                  <ul className="f-col mx-2.5 border-2 md:border  border-black/10 rounded-[10px] ">
                    {subMenuItems[showSubMenu]?.item1.map(
                      ({ src, text, href }, index) => (
                        <SubmenuItemOne
                          key={index}
                          index={index}
                          src={src}
                          text={text}
                          href={href}
                        />
                      ),
                    )}
                  </ul>
                  <ul className={`uppercase flex flex-col mt-2 `}>
                    {subMenuItems[showSubMenu]?.item2.map(
                      ({ src, text, href }, index) => (
                        <UserHeaderSubmenuItem
                          key={index}
                          index={index}
                          src={src}
                          text={text}
                          href={href}
                        />
                      ),
                    )}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHeaderMenu;
