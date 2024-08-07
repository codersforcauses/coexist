import Image from "next/image";
import { ReactNode, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";

const onErrorStyle = "border-2 border-red-500";
interface Props {
  children: ReactNode;
}

function LogInModal({ children }: Props) {
  const { login } = useAuth();
  const [useremail, setUseremail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login({ useremail, password });
    if (!success) {
      handleError();
    }
  };

  const handleError = () => {
    setLoginError(true);
    setTimeout(() => setLoginError(false), 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="flex h-full max-h-[460px] w-[95%] max-w-[600px] flex-col items-center rounded-[40px] border-0 bg-accent p-1 shadow-lg file:mx-auto"
        style={{ borderRadius: "32px" }}
      >
        <div className="w-full overflow-y-auto rounded-[30px] border-4 border-accent bg-white p-4">
          {/*Image */}
          <div className="w-30 h-30 mb-1 flex justify-center">
            <Image
              src="/web_logo.png"
              alt="CO-EXIST LOGO"
              width={150}
              height={150}
            />
          </div>
          <div className="mb-2 flex justify-center border-b-2 border-accent">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">Login</DialogTitle>
            </DialogHeader>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full">
            <div className="grid gap-4 py-4">
              <div className="gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter Email"
                  className={`w-full ${loginError ? onErrorStyle : ""}`}
                  value={useremail}
                  onChange={(e) => setUseremail(e.target.value)}
                />
              </div>
              <div className="gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  className={`w-full ${loginError ? onErrorStyle : ""}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {loginError ? (
                  <div className="-mb-4 text-center text-xs font-medium text-red-500">
                    Invalid Email or password
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>

            <DialogFooter>
              <div className="mt-1 flex w-full justify-center">
                <Button type="submit" variant="signup" className="w-[270px]">
                  Login
                </Button>
              </div>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default LogInModal;
