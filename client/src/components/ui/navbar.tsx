import { AlignJustify } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [drop, setDrop] = useState<boolean>(false);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    buttonRef.current = document.getElementById("dropdown") as HTMLDivElement;
  }, []);

  function dropdown() {
    if (buttonRef.current) {
      setDrop(!drop);
    }
  }

  return (
    <div
      className="whitespace-nowrap font-sans text-2xl font-light"
      style={{ fontFamily: '"Work Sans", sans-serif', lineHeight: "28px" }}
    >
      <div
        id="navbar"
        className="bg-white-500 flex h-[50px] w-full items-center justify-between px-0 xl:grid"
        style={{
          gridTemplateColumns: "1fr 3fr 1fr",
        }}
      >
        <div
          id="logo"
          className="bg-white-500 flex w-full items-center justify-start"
          style={{ minWidth: "200px" }}
        >
          <a className="hover:opacity-80" href="">
            <Image src="/logo.png" width={155} height={100} alt="logo" />{" "}
          </a>
        </div>

        <div
          id="responsive-full"
          className="bg-white-500 flex w-full items-center justify-end px-10 pr-[50px] text-center"
        >
          <div className="hidden lg:flex">
            <a
              className="mr-12 border-b-4 border-transparent hover:border-[#5C764B] hover:opacity-80"
              href=""
            >
              About us
            </a>

            <a
              className="border-b-4 border-transparent hover:border-[#5C764B] hover:opacity-80"
              href=""
            >
              Upcoming Events
            </a>
          </div>
        </div>

        <div
          id="responsive-full"
          className="hidden w-full min-w-52 items-center justify-center text-white lg:flex"
        >
          <button className="mx-4 w-auto rounded border-b-4 border-transparent px-2 hover:border-[#5C764B] hover:opacity-80">
            Log in
          </button>
          <button className="m-0 mb-2 h-12 rounded-lg border-2 border-white px-5 text-white hover:opacity-70">
            Sign up
          </button>
        </div>

        <div id="responsive-phone" className="flex lg:hidden">
          <button onClick={() => dropdown()}>
            <AlignJustify className="p-0" size={30} color="currentColor" />
          </button>
        </div>
      </div>

      <div
        id="dropdown"
        className={`${drop ? "flex" : "hidden"} " absolute mt-3 w-[75vw] flex-col bg-black bg-opacity-90 p-5 px-12 lg:hidden`}
        style={{ lineHeight: "55px" }}
      >
        <ul>
          <li>
            <a
              className="border-b-4 border-transparent hover:border-[#5C764B]"
              href=""
            >
              About us
            </a>
          </li>

          <li>
            <a
              className="border-b-4 border-transparent hover:border-[#5C764B]"
              href=""
            >
              Upcoming Events{" "}
            </a>
          </li>

          <li>
            <button
              style={{ lineHeight: "auto" }}
              className="m-0 mr-5 border-b-4 border-transparent p-0 hover:border-[#5C764B]"
            >
              Log in
            </button>

            <button
              style={{ lineHeight: "15px" }}
              className="h-12 rounded-lg border-2 border-white px-5 py-0.5 text-white hover:opacity-70"
            >
              Sign up
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
