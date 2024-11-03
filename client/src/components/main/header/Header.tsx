import Navbar from "./Navbar";
import NavBarTitle from "./NavBarTitle";

export default function Header() {
  return (
    <div
      id="header"
      className="relative flex justify-center bg-[url('/logo-background.webp')] px-5 py-10 text-white md:px-0"
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 h-full w-full bg-black opacity-30"></div>

      {/* Z score to ensure it goes over the black filter*/}
      <div
        id="nav_header"
        className="z-10 flex max-w-screen-2xl basis-[95%] flex-col gap-10 md:gap-20"
      >
        <Navbar />
        <NavBarTitle />
      </div>
    </div>
  );
}
