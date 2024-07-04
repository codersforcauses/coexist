import { Heading1Icon } from "lucide-react";
import Image from "next/image";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function LogInModal({ isOpen, onClose }: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent
        className="s mx-auto w-[95%] max-w-[600px] rounded-[40px] border-0 bg-[#9DAD93] p-1 shadow-lg"
        style={{ backgroundColor: "#9DAD93", borderRadius: "32px" }}
      >
        <div className="h-full w-full rounded-[30px] border-4 border-[#9DAD93] bg-white p-4">
          {/*Image */}
          <div className="w-30 h-30 mb-1 flex justify-center">
            <Image
              src="/web_logo.png"
              alt="CO-EXIST LOGO"
              width={150}
              height={150}
            />
          </div>
          <div className="mb-2 flex justify-center border-b-2 border-[#9DAD93]">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">Login</DialogTitle>
            </DialogHeader>
          </div>

          {/* Labels */}
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Enter Email" className="w-full" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Enter password"
                className="w-full"
              />
            </div>
          </div>

          <DialogFooter>
            <div className="mt-1 flex w-full justify-center">
              <Button type="submit" variant="signup" style={{ width: "270px" }}>
                Sign in
              </Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default LogInModal;
