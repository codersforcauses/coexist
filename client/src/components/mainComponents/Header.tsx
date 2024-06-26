import Navbar from "./Navbar";

export default function Header() {
  return (
    <div
      id="header"
      className="flex h-[350px] w-full justify-center bg-[url('/logo-background.png')] p-10 px-16 text-white"
    >
      <div id="nav_header" className="flex w-full flex-col">
        <Navbar />

        <div
          id="inspiring_div"
          className="mt-auto text-center sm:text-start"
          style={{ maxWidth: "600px" }}
        >
          <div className="text-4xl" style={{ fontWeight: "519" }}>
            Inspiring generations to co-exist
          </div>
          <div className="text-xl">recreation, education, conservation</div>
        </div>
      </div>
    </div>
  );
}
