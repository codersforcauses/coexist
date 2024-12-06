import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import validator from "validator";
import { z } from "zod";

import SignInModal from "@/components/modal/sign-in";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/BetterDialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SelectBranch } from "@/components/ui/select-branch";
import { useAuth } from "@/context/AuthProvider";
import { useDelayedPending } from "@/hooks/useDelayedPending";
import { useRegister } from "@/hooks/useUser";

const schema = z
  .object({
    email: z.string().email(),
    phone: z
      .string()
      .refine(validator.isMobilePhone, "Must be a valid phone number"),
    first_name: z.string().min(1).max(255),
    last_name: z.string().min(1).max(255),
    password: z.string().min(6),
    password_confirm: z.string().min(6),
    branch_id: z.number(),
  })
  .superRefine(({ password, password_confirm }, ctx) => {
    if (password != password_confirm) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords must match",
        path: ["password_confirm"],
      });
    }
  });

type Props = {
  children: ReactNode;
};

export default function SignUpModal({ children }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent wrapHeight>
        <DialogHeader>
          <DialogTitle className="text-2xl">Create an account</DialogTitle>
        </DialogHeader>
        <SignUpForm />
      </DialogContent>
    </Dialog>
  );
}

function SignUpForm() {
  const router = useRouter();
  const { login } = useAuth();
  const { mutate: register, isPending } = useRegister({
    onSuccess: (_, details) => {
      login(details.email, details.password).then(() => {
        router.push("/profile");
        toast.success("Your account has been created.");
      });
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.["error"];

      if (
        typeof errorMessage === "string" &&
        errorMessage.includes("duplicate")
      ) {
        form.setError("email", { message: "Email is already in use" });
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    },
  });

  const showIsPending = useDelayedPending(isPending);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      phone: "",
      first_name: "",
      last_name: "",
      password: "",
      password_confirm: "",
    },
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    register({
      email: values.email,
      phone: values.phone,
      firstName: values.first_name,
      lastName: values.last_name,
      password: values.password,
      branch: values.branch_id,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col sm:flex-row sm:gap-2 [&>*]:flex-1">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>First Name</FormLabel>
                <FormControl>
                  <FormInput type="text" placeholder="John" {...field} />
                </FormControl>
                <FormMessage preserveSpace />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Last Name</FormLabel>
                <FormControl>
                  <FormInput type="text" placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage preserveSpace />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Email</FormLabel>
              <FormControl>
                <FormInput
                  type="email"
                  placeholder="john@gmail.com"
                  {...field}
                />
              </FormControl>
              <FormMessage preserveSpace />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Phone Number</FormLabel>
              <FormControl>
                <FormInput type="tel" placeholder="04 xx xxx xxx" {...field} />
              </FormControl>
              <FormMessage preserveSpace />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Password</FormLabel>
              <FormControl>
                <FormInput
                  type="password"
                  placeholder="Enter password..."
                  {...field}
                />
              </FormControl>
              <FormMessage preserveSpace />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password_confirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Password Confirmation</FormLabel>
              <FormControl>
                <FormInput
                  type="password"
                  placeholder="Confirm password..."
                  {...field}
                />
              </FormControl>
              <FormMessage preserveSpace />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="branch_id"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel required>Local Co-Exist Branch</FormLabel>
              <FormControl>
                <SelectBranch
                  selectedId={field.value}
                  onChange={field.onChange}
                  className={`w-full ${fieldState.error ? "border-red-300" : ""}`}
                />
              </FormControl>
              <FormMessage preserveSpace />
            </FormItem>
          )}
        />
        <div className="flex flex-col items-start justify-between gap-2.5 sm:flex-row sm:items-center">
          <SignInModal>
            <span>
              <button type="button" className="underline">
                Already have an account?
              </button>
            </span>
          </SignInModal>
          <Button type="submit" className="self-stretch">
            {showIsPending ? (
              <ReloadIcon className="size-4 animate-spin text-primary" />
            ) : (
              "Create Account"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
