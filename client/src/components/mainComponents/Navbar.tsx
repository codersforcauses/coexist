import Image from "next/image";

import { DropDownNav } from "./DropDown";

const onHoverStyle =
  "rounded border-b-4 border-transparent px-2 hover:border-[#5C764B] hover:opacity-80";

function ButtonsContainer({ isHiddenWhenLg }: { isHiddenWhenLg: boolean }) {
  return (
    <div
      id="buttons-container"
      className={`${isHiddenWhenLg ? "max-lg:hidden" : ""} flex flex-col items-center justify-center gap-2 lg:flex-row lg:gap-20`}
    >
      <a className={`${onHoverStyle}`} href="">
        Upcoming Events
      </a>

      <a className={`${onHoverStyle}`} href="">
        About Us
      </a>

      <div className="flex flex-col items-center justify-center lg:flex-row lg:gap-5">
        <button className={`${onHoverStyle}`}>Log in</button>
        <button className="rounded-lg border-2 border-white p-1 px-4 hover:opacity-70">
          Sign up
        </button>
      </div>
    </div>
  );
}

export default function Navbar() {
  return (
    <div
      id="navbar"
      className="flex w-full items-center justify-between whitespace-nowrap text-xl font-medium lg:text-2xl"
    >
      <div
        id="logo"
        className="flex w-full items-center justify-start"
        style={{ minWidth: "200px" }}
      >
        <a className="hover:opacity-80" href="">
          <Image src="/logo.png" width={155} height={100} alt="logo" />{" "}
        </a>
      </div>
      <ButtonsContainer isHiddenWhenLg={true} />
      <DropDownNav
        ButtonsContainer={<ButtonsContainer isHiddenWhenLg={false} />}
      />
    </div>
  );
}
