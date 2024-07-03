import Navbar from "./Navbar";

export default function Header() {
  return (
    <div
      id="header"
      className="relative flex h-[350px] w-full justify-center bg-[url('/logo-background.png')] p-10 px-16 text-white max-[340px]:px-2"
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      {/* Z score to ensure it goes over the black filter*/}
      <div id="nav_header" className="relative z-10 flex w-full flex-col">
        <Navbar />

        <div id="inspiring_div" className="mt-auto text-center sm:text-start">
          <div className="text-4xl" style={{ fontWeight: "519" }}>
            Inspiring generations to co-exist
          </div>
          <div className="text-xl">recreation, education, conservation</div>
        </div>
      </div>
    </div>
  );
}
