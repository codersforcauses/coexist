"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEdit } from "react-icons/fa";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const formLabelStyle =
  "lg:max-5xl:text-lg px-2 mt-2 w-2/6 lg:max-5xl:w-1/5 py-2 align-baseline text-base font-bold";
const formItemStyle = "flex flex-row gap-x-6";
const formInputStyle =
  "lg:max-5xl:rounded-lg lg:max-5xl:text-lg w-48 bg-secondary rounded-xl lg:max-5xl:w-96";

const imageLoader = () => {
  return "https://ui-avatars.com/api/?name=John+Doe";
};

const formSchema = z.object({
  fname: z.string(),
  lname: z.string(),
  email: z.string().email(),
  branch: z.string(),
});

// FIXME: Mock branch data
const branches = [
  {
    value: "melbourne",
    label: "Melbourne",
  },
  {
    value: "perth",
    label: "Perth",
  },
  {
    value: "sydney",
    label: "Sydney",
  },
] as const;

export default function EditProfileModal() {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fname: "",
      lname: "",
      email: "",
      branch: "",
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
      <DialogContent className="md:max-5xl:5/6 w-11/12 max-w-[900px] rounded-lg p-4 md:max-5xl:px-10 md:max-5xl:py-8">
        <DialogHeader>
          <DialogTitle className="my-2 ml-2 text-left text-2xl md:max-5xl:text-3xl md:max-5xl:font-bold">
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
            className="rounded-full md:max-5xl:w-32"
          />
          <a className="pt-3 text-base text-[#7D916F] md:max-5xl:text-lg">
            Change Profile Picture
          </a>
        </div>
        {/* FORM SECTION */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-6 space-y-6 md:max-5xl:pl-36"
          >
            {/* fname */}
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

            {/* lname */}
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

            {/* email */}
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

            {/* branch */}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild></PopoverTrigger>
            </Popover>

            <FormField
              control={form.control}
              name="branch"
              render={({ field }) => (
                <FormItem className={`pb-6 ${formItemStyle}`}>
                  <FormLabel className={formLabelStyle}>Branch</FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="space-x-6 pl-4 pr-2 lg:max-5xl:text-base"
                        >
                          <span>
                            {field.value
                              ? branches.find(
                                  (branch) => branch.value === field.value,
                                )?.label
                              : "Branch"}
                          </span>
                          <ChevronDown size={20} />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>

                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search branch..." />
                        <CommandList>
                          <CommandEmpty>No branch found.</CommandEmpty>
                          <CommandGroup>
                            {branches.map((branch) => (
                              <CommandItem
                                value={branch.label}
                                key={branch.value}
                                onSelect={() => {
                                  form.setValue("branch", branch.value);
                                  // FIXME: Closes the popover after selecting a branch (~100ms delay). Should we include this?
                                  // setTimeout(() => setOpen(false), 100);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    branch.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {branch.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-row justify-between">
              <Link
                // FIXME: actual change pwd url
                href="/change-password"
                className="inline-flex items-center px-2 text-base font-semibold text-primary md:max-5xl:text-lg"
              >
                Change Password
                <ChevronRight size={20} />
              </Link>

              <Button
                className="h-8 px-2 md:max-5xl:h-9 md:max-5xl:text-lg"
                variant="outline"
                type="submit"
              >
                Update Profile
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
