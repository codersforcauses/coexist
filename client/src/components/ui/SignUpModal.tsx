import { Heading1Icon } from "lucide-react";
import Image from "next/image";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function SignUpModal({ isOpen, onClose }: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent
        className="rounded-[35px] border-0 p-6 shadow-lg sm:max-w-[600px]"
        style={{ backgroundColor: "#768970", borderRadius: "32px" }}
      >
        <div className="h-full w-full rounded-[30px] border-4 border-[#768970] bg-white p-4">
          {/*Image */}
          <div className="w-30 h-30 mb-1 flex justify-center">
            <Image
              src="/web_logo.png"
              alt="CO-EXIST LOGO"
              width={150}
              height={150}
            />
          </div>
          <div className="mb-2 flex justify-center border-b-2 border-[#768970]">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                Sign up
              </DialogTitle>
            </DialogHeader>
          </div>

          {/* Labels */}
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter Email"
                className="w-full"
                /*style={{ backgroundColor: "#EFF1ED", borderRadius: "5px", height:"33px"}}*/
                focusStyle="focus:ring-2 focus:ring-[#768970] focus:border-[#768970]"
              />
            </div>

            <div className="flex w-full flex-row gap-2">
              <div className="flex w-[49%] flex-col gap-2">
                <Label htmlFor="text">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="Enter text"
                  className="w-full"
                  /*style={{ backgroundColor: "#EFF1ED", borderRadius: "5px", height:"33px"}}*/
                  focusStyle="focus:ring-2 focus:ring-[#768970] focus:border-[#768970]"
                />
              </div>
              <div className="flex w-[49%] flex-col gap-2">
                <Label htmlFor="text">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Enter text"
                  className="w-full"
                  focusStyle="focus:ring-2 focus:ring-[#768970] focus:border-[#768970]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Enter password"
                className="w-full"
                focusStyle="focus:ring-2 focus:ring-[#768970] focus:border-[#768970]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Confirm Password</Label>
              <Input
                id="passwordConfirm"
                placeholder="Enter password again"
                className="w-full"
                focusStyle="focus:ring-2 focus:ring-[#768970] focus:border-[#768970]"
              />
            </div>
          </div>

          <DialogFooter>
            <div className="flex w-full justify-center">
              <Button type="submit" variant="signup" style={{ width: "270px" }}>
                Sign Up
              </Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SignUpModal;
