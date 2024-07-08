import Navbar from "./Navbar";
import NavBarTitle from "./NavBarTitle";

export default function Header() {
  return (
    <div
      id="header"
      className="flex w-full justify-center bg-[url('/logo-background.png')] p-10 px-16 text-white max-[340px]:px-2"
    >
      {/* Dark overlay */}
      {/* <div className="absolute inset-0 bg-black opacity-30"></div> */}
      {/* Z score to ensure it goes over the black filter*/}
      <div
        id="nav_header"
        className="relative z-10 flex w-full flex-col gap-20"
      >
        <Navbar />
        <NavBarTitle />
      </div>
    </div>
  );
}
