import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import SignUpModal from "@/components/modal/sign-up";
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
import { useAuth } from "@/context/AuthProvider";
import { useDelayedPending } from "@/hooks/useDelayedPending";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type Props = {
  children: ReactNode;
};

export default function SignInModal({ children }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent wrapHeight>
        <DialogHeader>
          <DialogTitle className="text-2xl">Sign into your account</DialogTitle>
        </DialogHeader>
        <SignInForm />
      </DialogContent>
    </Dialog>
  );
}

function SignInForm() {
  const router = useRouter();
  const { login } = useAuth();

  const [isPending, setIsPending] = useState(false);
  const showIsPending = useDelayedPending(isPending);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setIsPending(true);
    login(values.email, values.password)
      .then((success) => {
        setIsPending(false);
        if (success) {
          toast.success("You are now logged in.");
          router.push("/");
        } else {
          form.setError("email", {
            message: "Invalid email or password",
          });
        }
      })
      .catch(() => {
        toast.error("Something went wrong. Please try again later.");
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
        <div className="flex flex-col items-start justify-between gap-2.5 sm:flex-row sm:items-center">
          <SignUpModal>
            <span>
              <button type="button" className="underline">
                Don't have an account?
              </button>
            </span>
          </SignUpModal>
          <Button type="submit" className="self-stretch">
            {showIsPending ? (
              <ReloadIcon className="size-4 animate-spin text-primary" />
            ) : (
              "Sign In"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
