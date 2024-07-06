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
          <div className="border-t border-primary"></div>
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
        <form className="w-full space-y-4 bg-white p-5 pr-16">
          <div className="grid grid-cols-2">
            <label className="text-base font-bold" htmlFor="fname">
              First name
            </label>
            <input
              className="rounded-md bg-secondary"
              type="text"
              id="fname"
              name="fname"
            />
            <label className="text-base font-bold" htmlFor="lname">
              Last name
            </label>
            <input
              className="rounded-md bg-secondary"
              type="text"
              id="lname"
              name="lname"
            />
            <label className="text-base font-bold" htmlFor="email">
              Email
            </label>
            <input
              className="rounded-md bg-secondary"
              type="text"
              id="email"
              name="email"
            />
            <label className="text-base font-bold" htmlFor="city">
              City
            </label>
            <input
              className="rounded-md bg-secondary"
              type="text"
              id="city"
              name="city"
            />
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
