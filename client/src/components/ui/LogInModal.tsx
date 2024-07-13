import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function LogInModal({ isOpen, onClose }: Props) {
  const { login } = useAuth();
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login({ username, password });
    if (!success) {
      loginfailed();
    } else {
      //authentication success
    }
  };

  const loginfailed = () => {
    setusername("");
    setPassword("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Enter Username"
                  className="w-full"
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                />
              </div>
              <div className="gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  className="w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <DialogFooter>
              <div className="mt-1 flex w-full justify-center">
                <Button type="submit" variant="signup" className="w-[270px]">
                  Sign in
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
