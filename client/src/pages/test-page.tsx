import { Work_Sans as FontSans } from "next/font/google";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";

import ChangePasswordModal from "@/components/main/ChangePasswordModal";
import EditProfileModal from "@/components/main/EditProfileModal";
import Header from "@/components/main/header/Header";
import { usePings } from "@/hooks/pings";
import { cn } from "@/lib/utils";

import { Button } from "../components/ui/button";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function Home() {
  const [isEditProfileOpen, setEditProfileOpen] = useState(false);
  return (
    <main
      className={cn(
        "m-0 flex min-h-screen flex-col items-center p-0 font-sans",
        fontSans.variable,
      )}
    >
      <h1 className="text-3xl text-primary">Test title</h1>
      <Button onClick={() => setEditProfileOpen(true)}>
        <FaRegEdit />
      </Button>
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setEditProfileOpen(false)}
      />
    </main>
  );
}
