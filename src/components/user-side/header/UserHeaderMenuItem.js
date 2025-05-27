"use client";
import Image from "next/image";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";

const UserHeaderMenuItem = ({
  src,
  text,
  href,
  setIsMenuOpen,
  setShowSubMenu = null,
  isHide = false,
}) => {
  return (
    <>
      <li className={`m-0.5 ${isHide ? "hidden sm:block" : ""}  text-black/90 base-text-0`}>
        {href ? (
          <Link
            href={href}
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center header-list-item-gap border-b-2 md:border-b border-accent-1-extra-light header-list-item-pad ">
            <Image
              src={src}
              alt={text}
              height={24}
              // className="h-[29px] w-auto md:h-6 sm:h-5"
                 className="h-8 w-auto md:h-6 sm:h-5"
            />
            <span>{text}</span>
          </Link>
        ) : (
          <button
            onClick={() => {
              setShowSubMenu(text);
              setIsMenuOpen(false);
            }}
            className="uppercase w-full flex items-center header-list-item-gap border-b-2 md:border-b border-accent-1-extra-light header-list-item-pad relative ">
            <Image src={src} alt={text} className="h-[29px] w-auto sm:h-5" />
            <span className="">
              {text}
            </span>
            <FaChevronRight
              className={`h-auto transition-transform duration-300 absolute right-2 header-arrow-size `}
              
            />
          </button>
        )}
      </li>
    </>
  );
};

export default UserHeaderMenuItem;
