import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  default as LogInModal,
  default as SignUpModal,
} from "@/components/ui/LogInModal";
import { useAuth } from "@/hooks/useAuth";

import { DropDownNav } from "./DropDown";

const onHoverStyle =
  "rounded border-b-4 border-transparent px-2 hover:border-[#5C764B] hover:opacity-80";
const outlineStyle =
  "rounded-lg border-2 border-white p-1 px-4 hover:opacity-70";

function Links({ isHiddenWhenLg }: { isHiddenWhenLg: boolean }) {
  const { isLoggedIn } = useAuth();
  const [isSignUpOpen, setSignUp] = useState(false);
  const [isLogInOpen, setLogIn] = useState(false);

  return (
    <div
      id="buttons-container"
      className={`${isHiddenWhenLg ? "max-lg:hidden" : ""} flex flex-col items-center justify-center gap-2 lg:flex-row lg:gap-20`}
    >
      <Link className={`${onHoverStyle}`} href="/events">
        Upcoming Events
      </Link>

      <Link className={`${onHoverStyle}`} href="/about">
        About Us
      </Link>

      {isLoggedIn ? (
        <Link href="/profile" className={outlineStyle}>
          Profile
        </Link>
      ) : (
        <div className="flex flex-col items-center justify-center lg:flex-row lg:gap-5">
          <button className={`${onHoverStyle}`} onClick={() => setLogIn(true)}>
            Log in
          </button>
          <button className={outlineStyle} onClick={() => setSignUp(true)}>
            Sign up
          </button>
        </div>
      )}
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
      <div id="logo" className="flex w-full items-center justify-start">
        <Link className="hover:opacity-80" href="/">
          <Image src="/logo.png" width={155} height={100} alt="logo" />{" "}
        </Link>
      </div>
      <Links isHiddenWhenLg={true} />
      <DropDownNav Links={<Links isHiddenWhenLg={false} />} />
    </div>
  );
}
