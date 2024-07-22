"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Control, useForm } from "react-hook-form";
import { z } from "zod";

import ChangePasswordModal from "@/components/main/ChangePasswordModal";
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

// FIXME: Populate user's profile
const imageLoader = () => {
  return `https://ui-avatars.com/api/?name=${username}`;
};

const profileFormSchema = z.object({
  fname: z.string().min(2, { message: "Must be 2 or more characters long" }),
  lname: z.string().min(2, { message: "Must be 2 or more characters long" }),
  email: z.string().email(),
  phone: z.string().min(10, {
    message: "Must be 10 or more characters long",
  }),
  branch: z.string(),
});

// FIXME: Mock data
const branches = [
  {
    discriminator: "melbourne",
    label: "Melbourne",
  },
  {
    discriminator: "perth",
    label: "Perth",
  },
  {
    discriminator: "sydney",
    label: "Sydney",
  },
] as const;

const username = "John Alderson";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type FormFieldProps = {
  control: Control<any>;
  name: string;
  label: string;
  placeholder: string;
};

function CustomFormField({
  control,
  name,
  label,
  placeholder,
}: FormFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row justify-between gap-x-4">
          <FormLabel className="w-22 mt-2 px-2 py-2 align-baseline text-base font-bold lg:max-5xl:min-w-40 lg:max-5xl:text-lg">
            {label}
          </FormLabel>
          <FormControl>
            <Input
              className="w-44 rounded-xl bg-secondary md:w-56 lg:max-5xl:w-96 lg:max-5xl:rounded-lg lg:max-5xl:text-lg"
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          <FormMessage className="w-48 px-1 pt-1 lg:max-5xl:w-96" />
        </FormItem>
      )}
    />
  );
}

const fields = [
  {
    label: "First Name",
    name: "fname",
    placeholder: "",
  },
  {
    label: "Last Name",
    name: "lname",
    placeholder: "",
  },
  {
    label: "Email",
    name: "email",
    placeholder: "",
  },
  {
    label: "Phone",
    name: "phone",
    placeholder: "",
  },
];

export default function EditProfileModal({ isOpen, onClose }: Props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fname: "",
      lname: "",
      email: "",
      phone: "",
      branch: "",
    },
  });

  function onSubmit(values: z.infer<typeof profileFormSchema>) {
    console.log(values);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
          <Button
            role="link"
            variant="link"
            className="pt-3 text-base text-primary/70 md:max-5xl:text-lg"
          >
            Change Profile Picture
          </Button>
        </div>

        {/* FORM SECTION */}

        {/* Edit Profile Form */}
        <Form {...profileForm}>
          <form
            onSubmit={profileForm.handleSubmit(onSubmit)}
            className="mx-auto mt-6 space-y-6 md:max-5xl:w-2/3"
          >
            {fields.map((field) => (
              <CustomFormField
                key={field.name}
                control={profileForm.control}
                name={field.name}
                label={field.label}
                placeholder={field.placeholder}
              />
            ))}

            {/* branch */}
            <Popover open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <PopoverTrigger asChild></PopoverTrigger>
            </Popover>

            <FormField
              control={profileForm.control}
              name="branch"
              render={({ field }) => (
                <FormItem className="flex flex-row justify-between gap-x-4 pb-6">
                  <FormLabel className="w-22 mt-2 px-2 py-2 align-baseline text-base font-bold lg:max-5xl:min-w-40 lg:max-5xl:text-lg">
                    Branch
                  </FormLabel>
                  <div className="flex justify-start lg:max-5xl:w-full">
                    <Popover open={dropdownOpen} onOpenChange={setDropdownOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={dropdownOpen}
                            className="flex w-44 flex-row justify-between space-x-6 pl-4 pr-2 md:w-56 lg:max-5xl:rounded-lg lg:max-5xl:text-base"
                          >
                            <span>
                              {field.value
                                ? branches.find(
                                    (branch) =>
                                      branch.discriminator === field.value,
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
                                  key={branch.discriminator}
                                  onSelect={() => {
                                    profileForm.setValue(
                                      "branch",
                                      branch.discriminator,
                                    );
                                    // FIXME: Closes the popover after selecting a branch (~100ms delay). Should we include this?
                                    // setTimeout(() => setOpen(false), 100);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      branch.discriminator === field.value
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
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ChangePasswordModal />

            <div className="flex flex-row justify-center">
              <Button
                className="my-4 h-10 px-2 max-md:w-full max-sm:mt-2 md:max-5xl:w-6/12 md:max-5xl:text-lg"
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
