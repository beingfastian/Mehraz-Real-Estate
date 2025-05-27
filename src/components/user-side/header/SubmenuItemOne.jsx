import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const SubmenuItemOne = ({ text, href, src ,index}) => {
    return (
      <>
        <li className="m-0.5">
          <Link
            href={href}
            className={`flex items-center header-list-sub-item-gap header-list-item-pad ${index === 0 ? "border-b-2 md:border-b border-black/10 " : ""}`}>
            <Image src={src} alt={text} className={`h-[40px] w-auto md:h-8 sm:h-6 ${index === 1 ? "-translate-y-1/3 translate-x-1/4" : ""}`} />
            <span className="base-text-0 uppercase text-black/90">{text}</span>
          </Link>
        </li>
      </>
    );
  };
  
  export default SubmenuItemOne;
