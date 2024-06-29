import { Work_Sans as FontSans } from "next/font/google";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";

import EditProfileModal from "@/components/main/EditProfileModal";
import Header from "@/components/main/Header";
import { usePings } from "@/hooks/pings";
import { cn } from "@/lib/utils";

import { Button } from "../components/ui/button";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function Home() {
  const [clicked, setClicked] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  const { data, isLoading } = usePings({
    enabled: clicked,
  });

  // const onClickHandler = () => {
  //   showModal ? setShowModal(false) : setShowModal(true);
  //   setClicked(true);
  // };

  return (
    <main
      className={cn(
        "m-0 flex min-h-screen flex-col items-center p-0 font-sans",
        fontSans.variable,
      )}
    >
      <Header />

      <h1 className="text-3xl text-primary">Test title</h1>
      {/* <Button onClick={onClickHandler}>{isLoading ? "Loading" : "Ping"}</Button> */}
      <EditProfileModal />
    </main>
  );
}
