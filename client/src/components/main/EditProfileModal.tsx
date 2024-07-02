import { Copy } from "lucide-react";
import Image from "next/image";
import { FaRegEdit } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const imageLoader = () => {
  return "https://ui-avatars.com/api/?name=John+Doe";
};

export default function EditProfileModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Share</Button> */}
        <Button>
          <FaRegEdit></FaRegEdit>
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-2xl:w-96rem w-11/12 rounded-lg">
        <DialogHeader>
          <DialogTitle className="mb-2 text-left text-2xl">
            Edit Profile
          </DialogTitle>
          <div className="border-t border-[#7D916F]"></div>
        </DialogHeader>
        <div className="mt-2 grid w-full place-items-center">
          <Image
            loader={imageLoader}
            src="jd.png"
            alt="Profile Picture"
            width={128}
            height={128}
            className="rounded-full"
          />
          <a className="pt-1 text-base text-[#7D916F]">
            Change Profile Picture
          </a>
        </div>
        <form className="w-full space-y-4 bg-white p-8">
          <div>
            <label className="" htmlFor="fname">
              First name
            </label>
            <input
              className="rounded-lg bg-red-700"
              type="text"
              id="fname"
              name="fname"
            />
          </div>
          <div>
            <label htmlFor="lname">Last name</label>
            <input type="text" id="lname" name="lname" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" />
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input type="text" id="city" name="city" />
          </div>
          <div>
            <label htmlFor="fname">Old Password</label>
            <input type="password" id="oldpassword" name="oldpassword" />
          </div>
        </form>

        {/* <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
