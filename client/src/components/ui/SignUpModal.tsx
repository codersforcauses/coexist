import Image from "next/image";
import { useState } from "react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";

import { SelectBranch } from "./select-branch";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function SignUpModal({ isOpen, onClose }: Props) {
  const { register } = useAuth();

  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    // alert("Sign up successful");

    e.preventDefault();

    // front end checks for empty field and password
    if (password !== confirmpassword) {
      alert("password err");
      return;
    }
    if (
      !email.trim().length ||
      !password.trim().length ||
      !confirmpassword.trim().length ||
      !firstname.trim().length ||
      !lastname.trim().length
    ) {
      alert("empty field");
      return;
    }

    //make api call
    const success = await register({
      email,
      password,
      firstname,
      lastname,
      //city,
    });

    if (typeof success === "string") {
      if (success.includes("duplicate")) {
        alert("duplicate user");
      } else if (success.includes("email")) {
        alert("invalid email");
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild></DialogTrigger>
      {/* Outer green container */}
      <DialogContent
        className="mx-auto flex h-full max-h-[725px] w-[95%] max-w-[600px] flex-col border-0 bg-accent p-[8px] shadow-lg"
        style={{ borderRadius: "40px" }}
      >
        <div className="max-h-90 h-full w-full overflow-y-auto rounded-[36px] border-4 border-white bg-white p-4">
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
              <DialogTitle className="text-xl font-semibold">
                Sign up
              </DialogTitle>
            </DialogHeader>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Labels */}
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="email" className="font-semibold">
                  Email
                </Label>
                <Input
                  type="text"
                  id="email"
                  placeholder="Enter Email"
                  className="w-full"
                  onChange={(e) => setemail(e.target.value)}
                  /*style={{ backgroundColor: "#EFF1ED", borderRadius: "5px", height:"33px"}}*/
                />
              </div>

              {/* Name labels */}
              <div className="flex w-full flex-row gap-2">
                <div className="flex w-[49%] flex-col">
                  <Label htmlFor="text">First Name</Label>
                  <Input
                    type="text"
                    id="firstName"
                    placeholder="Enter text"
                    className="w-full"
                    onChange={(e) => setfirstname(e.target.value)}
                  />
                </div>
                <div className="flex w-[49%] flex-col">
                  <Label htmlFor="text">Last Name</Label>
                  <Input
                    type="text"
                    id="lastName"
                    placeholder="Enter text"
                    className="w-full"
                    onChange={(e) => setlastname(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  className="w-full"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="password">Confirm Password</Label>
                <Input
                  type="password"
                  id="passwordConfirm"
                  placeholder="Enter password again"
                  className="w-full"
                  onChange={(e) => setconfirmPassword(e.target.value)}
                />
              </div>

              {/* Select label */}
              <div className="flex flex-col">
                {/* Component uses branch api to get cities from backend*/}
                <Label htmlFor="branch">Branch</Label>
                <SelectBranch setValue={setCity} signUp={true} />
              </div>
            </div>

            <DialogFooter>
              <div className="mt-1 flex w-full justify-center">
                <Button type="submit" variant="signup" className="w-[270px]">
                  Sign Up
                </Button>
              </div>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SignUpModal;
