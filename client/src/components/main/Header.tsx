import Navbar from "./Navbar";

type Header = {
  bottomdiv: boolean;
};

const Header: React.FC<Header> = ({ bottomdiv }) => {
  return (
    <div
      id="header"
      className={`flex ${bottomdiv ? "h-[350px]" : "h-auto"} w-full justify-center bg-[url('/logo-background.png')] p-10 px-16 text-white max-[340px]:px-2`}
    >
      <div id="nav_header" className="flex w-full flex-col">
        <Navbar />

        <div
          id="inspiring_div"
          className={` ${bottomdiv ? "block" : "hidden"} mt-auto text-center sm:text-start`}
        >
          <div className="text-4xl" style={{ fontWeight: "519" }}>
            Inspiring generations to co-exist
          </div>
          <div className="text-xl">recreation, education, conservation</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
