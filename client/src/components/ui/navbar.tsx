import Image from "next/image";
/*
TODOLIST
correct font
responsive
*/

export default function Navbar() {
  return (
    <div
      id="navbar"
      className="bg-white-500 grid h-[50px] w-[70vw]"
      style={{
        fontFamily: "Work Sans",
        fontStyle: "normal",
        fontSize: "24px",
        lineHeight: "28px",
        fontWeight: "500",
        gridTemplateColumns: "1fr 3fr 1fr",
      }}
    >
      <div
        id="pop"
        className="bg-white-500 flex w-full items-center justify-center"
        style={{ minWidth: "200px" }}
      >
        <Image src="logo.png" style={{ width: "155px" }} alt="" />
      </div>

      <div
        id="responsive-full"
        className="bg-white-500 flex w-full items-center justify-end px-10"
        style={{ textAlign: "center" }}
      >
        <div>
          <a className="" style={{ marginRight: "50px" }} href="">
            Events
          </a>
          <a className="" style={{ marginRight: "50px" }}>
            Contact
          </a>
          <a className="">About</a>
        </div>
      </div>

      <div
        id="responsive-full"
        className="bg-white-500 flex w-full items-center justify-center"
        style={{ minWidth: "200px" }}
      >
        <button
          className="rounded px-5"
          style={{ color: "#93B487", whiteSpace: "nowrap", width: "auto" }}
        >
          Log in
        </button>
        <button
          className="rounded text-white"
          style={{ width: "125px", height: "48px", backgroundColor: "#93B487" }}
        >
          Sign up
        </button>
      </div>

      <div id="responsive-phone">
        <button onClick={() => alert("s")}>
          <i className="fa fa-bars" style={{ fontSize: "30px" }}></i>
        </button>
      </div>
    </div>
  );
}
