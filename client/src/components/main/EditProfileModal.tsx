import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, Copy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FaRegEdit } from "react-icons/fa";
import { LuChevronDown, LuChevronRight } from "react-icons/lu";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

const formLabelStyle =
  "lg:max-2xl:text-lg px-2 mt-2 w-2/6 lg:max-2xl:w-1/5 py-2 align-baseline text-base font-bold";
const formItemStyle = "flex flex-row gap-x-6";
const formInputStyle =
  "lg:max-2xl:rounded-lg lg:max-2xl:text-lg w-48 bg-secondary rounded-xl lg:max-2xl:w-96";

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
        <Button>
          <FaRegEdit></FaRegEdit>
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-2xl:5/6 w-11/12 max-w-[900px] rounded-lg p-4 md:max-2xl:px-10 md:max-2xl:py-8">
        <DialogHeader>
          <DialogTitle className="my-2 ml-2 text-left text-2xl md:max-2xl:text-3xl md:max-2xl:font-bold">
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
            className="rounded-full md:max-2xl:w-32"
          />
          <a className="pt-3 text-base text-[#7D916F] md:max-2xl:text-lg">
            Change Profile Picture
          </a>
        </div>
        {/* FORM SECTION */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-6 space-y-6 md:max-2xl:pl-36"
          >
            <FormField
              control={form.control}
              name="fname"
              render={({ field }) => (
                <FormItem className={formItemStyle}>
                  <FormLabel className={formLabelStyle}>First Name</FormLabel>
                  <FormControl>
                    <Input
                      className={formInputStyle}
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lname"
              render={({ field }) => (
                <FormItem className={formItemStyle}>
                  <FormLabel className={formLabelStyle}>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      className={formInputStyle}
                      placeholder=""
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className={formItemStyle}>
                  <FormLabel className={formLabelStyle}>Email</FormLabel>
                  <FormControl>
                    <Input
                      className={formInputStyle}
                      placeholder=""
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className={formItemStyle}>
                  <FormLabel className={formLabelStyle}>City</FormLabel>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="space-x-6 pl-4 pr-2 lg:max-2xl:text-base"
                        >
                          <span>City</span>
                          <ChevronDown size={20} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Perth</DropdownMenuLabel>
                        <DropdownMenuLabel>Melbourne</DropdownMenuLabel>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Link
              href="/change-password"
              className="inline-flex items-center pl-10 pt-2 text-lg font-semibold text-primary"
            >
              Change Password
              <LuChevronRight />
            </Link>

            <Button
              className="float-right mr-0.5 h-8 md:max-2xl:h-9 md:max-2xl:text-lg"
              variant="outline"
              type="submit"
            >
              Update Profile
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
