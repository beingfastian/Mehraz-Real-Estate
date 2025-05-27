import Image from "next/image";
import Link from "next/link";

const UserHeaderSubmenuItem = ({ text, href, src, index }) => {
  return (
    <>
      <li
        className={`border-b-2 md:border-b border-black/10 header-list-item-pad ${
          index === 0 ? "border-t-2 md:border-t border-black/10" : ""
        }`}>
        <Link href={href} className="px-3.5 flex items-center header-list-sub-item-gap ">
          <Image src={src} alt={text} className="h-[40px] w-auto md:h-8 sm:h-6" />
          <span className="opacity-90 base-text-0 uppercase text-black/90">
            {text}
          </span>
        </Link>
      </li>
    </>
  );
};

export default UserHeaderSubmenuItem;
