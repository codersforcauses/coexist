import Image from "next/image";
import { useState } from "react";

import LogInModal from "../ui/LogInModal";
import SignUpModal from "../ui/SignUpModal";
import { DropDownNav } from "./DropDown";

const onHoverStyle =
  "rounded border-b-4 border-transparent px-2 hover:border-[#5C764B] hover:opacity-80";

function ButtonsContainer({ isHiddenWhenLg }: { isHiddenWhenLg: boolean }) {
  const [isSignUpOpen, setSignUp] = useState(false);
  const [isLogInOpen, setLogIn] = useState(false);

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
        <button className={`${onHoverStyle}`} onClick={() => setLogIn(true)}>
          Log in
        </button>
        <button
          className="rounded-lg border-2 border-white p-1 px-4 hover:opacity-70"
          onClick={() => setSignUp(true)}
        >
          Sign up
        </button>
      </div>
      <SignUpModal isOpen={isSignUpOpen} onClose={() => setSignUp(false)} />
      <LogInModal isOpen={isLogInOpen} onClose={() => setLogIn(false)} />
    </div>
  );
}

export default function Navbar() {
  return (
    <div
      id="navbar"
      className="flex w-full items-center justify-between whitespace-nowrap text-xl lg:text-2xl"
    >
      <div id="logo" className="fleopacityx w-full items-center justify-start">
        <a className="hover:-80" href="">
          <Image
            src="/logo.png"
            className="z-10"
            width={155}
            height={100}
            alt="logo"
          />
        </a>
      </div>
      <ButtonsContainer isHiddenWhenLg={true} />
      <DropDownNav
        ButtonsContainer={<ButtonsContainer isHiddenWhenLg={false} />}
      />
    </div>
  );
}
