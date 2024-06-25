import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [drop, setDrop] = useState<boolean>(false);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    buttonRef.current = document.getElementById("dropdown") as HTMLDivElement;
  }, []);

  function dropdown() {
    if (drop && buttonRef.current) {
      buttonRef.current.classList.add("show");
    } else if (buttonRef.current) {
      buttonRef.current.classList.remove("show");
    }
    setDrop(!drop);
  }

  return (
    <div
      style={{
        fontFamily: "Work Sans",
        fontStyle: "normal",
        lineHeight: "28px",
        fontSize: "24px",
        fontWeight: "300",
        whiteSpace: "nowrap",
      }}
    >
      <div
        id="navbar"
        className="bg-white-500 grid h-[50px] w-[70vw]"
        style={{
          gridTemplateColumns: "1fr 3fr 1fr",
        }}
      >
        <div
          id="pop"
          className="bg-white-500 flex w-full items-center justify-start"
          style={{ minWidth: "200px" }}
        >
          <a href="">
            <Image src="/logo.png" width={155} height={100} alt="logo" />{" "}
          </a>
        </div>

        <div
          id="responsive-full"
          className="bg-white-500 flex w-full items-center justify-end px-10"
          style={{ textAlign: "center", paddingRight: "50px" }}
        >
          <div>
            <a className="" style={{ marginRight: "50px" }} href="">
              About us
            </a>

            <a className="" href="">
              Upcoming Events
            </a>
          </div>
        </div>

        <div
          id="responsive-full"
          className="flex w-full items-center justify-center text-white"
          style={{ minWidth: "200px" }}
        >
          <button className="rounded px-5" style={{ width: "auto" }}>
            Log in
          </button>

          <button
            className="rounded text-white"
            style={{
              padding: "0px 20px",
              height: "48px",
              border: "2px solid white",
              borderRadius: "10px",
            }}
          >
            Sign up
          </button>
        </div>

        <div id="responsive-phone">
          <button onClick={() => dropdown()}>
            <i className="fa fa-bars" style={{ fontSize: "30px" }}></i>
          </button>
        </div>
      </div>

      <div id="dropdown">
        <ul>
          <li>
            <a href="">About us</a>
          </li>

          <li>
            <a href="">Upcoming Events </a>
          </li>

          <li>
            <button className="mr-5 rounded" style={{ width: "auto" }}>
              Log in
            </button>

            <button
              className="rounded text-white"
              style={{
                lineHeight: "20px",
                padding: "2px 20px",
                height: "48px",
                border: "2px solid white",
                borderRadius: "10px",
              }}
            >
              Sign up
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
