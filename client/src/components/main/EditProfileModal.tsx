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

const formLabelStyle =
  "px-2 mt-2 w-2/6 py-2 align-baseline text-base font-bold";
const formItemStyle = "flex flex-row gap-x-6";
const formInputStyle = "w-48 bg-secondary rounded-xl";

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
      <DialogContent className="md:max-2xl:5/6 w-11/12 max-w-[1000px] rounded-lg p-4">
        <DialogHeader>
          <DialogTitle className="my-2 ml-2 text-left text-2xl">
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
            className="rounded-full md:max-2xl:w-24"
          />
          <a className="pt-3 text-base text-[#7D916F]">
            Change Profile Picture
          </a>
        </div>
        {/* FORM SECTION */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-6 space-y-6 md:max-2xl:px-6"
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
                <FormItem className={`pb-6 ${formItemStyle}`}>
                  <FormLabel className={formLabelStyle}>City</FormLabel>
                  <FormControl>
                    <Input
                      className={formInputStyle}
                      placeholder="shadcn"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="float-right mr-0.5 h-8"
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
