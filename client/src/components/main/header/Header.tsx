import Navbar from "./Navbar";
import NavBarTitle from "./NavBarTitle";

export default function Header() {
  return (
    <div
      id="header"
      className="relative flex w-full justify-center bg-[url('/logo-background.webp')] p-10 text-white max-[340px]:px-2 md:px-16"
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 h-full w-full bg-black opacity-30"></div>
      {/* Z score to ensure it goes over the black filter*/}
      <div
        id="nav_header"
        className="z-10 flex w-full flex-col gap-10 md:gap-20"
      >
        <Navbar />
        <NavBarTitle />
      </div>
    </div>
  );
}
