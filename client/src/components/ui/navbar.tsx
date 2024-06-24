import Image from "next/image";
/*
TODOLIST
correct font
responsive
*/

export default function Navbar() {
  return (
    <div>
      <div
        id="navbar"
        className="bg-white-500 grid h-[50px] w-[70vw]"
        style={{
          fontFamily: "Work Sans",
          fontStyle: "normal",
          lineHeight: "28px",
          fontSize: "24px",
          fontWeight: "500",
          gridTemplateColumns: "1fr 3fr 1fr",
        }}
      >
        <div
          id="pop"
          className="bg-white-500 flex w-full items-center justify-start"
          style={{ minWidth: "200px" }}
        >
          <Image src="/logo.png" width={155} height={100} alt="logo" />
        </div>

        <div
          id="responsive-full"
          className="bg-white-500 flex w-full items-center justify-end px-10"
          style={{ textAlign: "center", paddingRight: "50px" }}
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
          className="flex w-full items-center justify-center text-white"
          style={{ minWidth: "200px" }}
        >
          <button
            className="rounded px-5"
            style={{ whiteSpace: "nowrap", width: "auto" }}
          >
            Log in
          </button>

          <button
            className="rounded text-white"
            style={{
              padding: "0px 20px",
              height: "48px",
              border: "2px solid white",
              whiteSpace: "nowrap",
            }}
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
    </div>
  );
}
