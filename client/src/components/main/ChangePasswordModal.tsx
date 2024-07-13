"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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

const imageLoader = () => {
  return `https://ui-avatars.com/api/?name=${username}`;
};

const pwdFormSchema = z.object({
  oldPwd: z.string().min(5),
  newPwd: z.string(),
  confirmPwd: z.string(),
});

const username = "John Doe";

export default function ChangePasswordModal() {
  const pwdForm = useForm<z.infer<typeof pwdFormSchema>>({
    resolver: zodResolver(pwdFormSchema),
    defaultValues: {
      oldPwd: "",
      newPwd: "",
      confirmPwd: "",
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          role="link"
          variant="link"
          className="inline-flex h-8 items-center px-2 text-base font-semibold text-primary md:max-5xl:text-lg"
        >
          Change Password
          <ChevronRight size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-5xl:5/6 w-11/12 max-w-[900px] rounded-lg p-4 md:max-5xl:px-10 md:max-5xl:py-8">
        <DialogHeader>
          <DialogTitle className="my-2 ml-2 text-left text-2xl md:max-5xl:text-3xl md:max-5xl:font-bold">
            Change Password
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
          <h2 className="pt-3 text-lg font-semibold text-black">{username}</h2>
        </div>

        {/* FORM SECTION */}

        {/* Change Password Form */}
        <Form {...pwdForm}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              return pwdForm.handleSubmit((data) => console.log(data))(e);
            }}
            className="mt-6 space-y-6"
          >
            {/* old pwd */}
            <FormField
              control={pwdForm.control}
              name="oldPwd"
              render={({ field }) => (
                <FormItem className="mx-auto flex w-full flex-col lg:max-5xl:w-1/2">
                  <FormLabel className="w-full text-base font-bold lg:max-5xl:text-lg">
                    Current password
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full rounded-xl bg-secondary lg:max-5xl:w-96 lg:max-5xl:rounded-lg lg:max-5xl:text-lg"
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* new pwd */}
            <FormField
              control={pwdForm.control}
              name="newPwd"
              render={({ field }) => (
                <FormItem className="mx-auto flex w-full flex-col lg:max-5xl:w-1/2">
                  <FormLabel className="w-full text-base font-bold lg:max-5xl:text-lg">
                    New password
                  </FormLabel>
                  <div>
                    <FormControl>
                      <Input
                        className="w-full rounded-xl bg-secondary lg:max-5xl:w-96 lg:max-5xl:rounded-lg lg:max-5xl:text-lg"
                        placeholder=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* confirm new pwd */}
            <FormField
              control={pwdForm.control}
              name="confirmPwd"
              render={({ field }) => (
                <FormItem className="mx-auto flex w-full flex-col lg:max-5xl:w-1/2">
                  <FormLabel className="w-full text-base font-bold lg:max-5xl:text-lg">
                    Confirm new password
                  </FormLabel>
                  <div>
                    <FormControl>
                      <Input
                        className="w-full rounded-xl bg-secondary lg:max-5xl:w-96 lg:max-5xl:rounded-lg lg:max-5xl:text-lg"
                        placeholder=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <div className="flex flex-row justify-end">
              <Button
                className="h-8 px-2 md:max-5xl:h-9 md:max-5xl:text-lg"
                variant="outline"
                type="submit"
              >
                Update Password
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
