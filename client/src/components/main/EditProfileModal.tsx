import { zodResolver } from "@hookform/resolvers/zod";
import { Copy } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { FaRegEdit } from "react-icons/fa";
import { z } from "zod";

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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const imageLoader = () => {
  return "https://ui-avatars.com/api/?name=John+Doe";
};

const formSchema = z.object({
  fname: z.string(),
  lname: z.string(),
  email: z.string().email(),
  city: z.string(),
});

export default function EditProfileModal() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fname: "",
      lname: "",
      email: "",
      city: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
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
        {/* FORM SECTION */}
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
