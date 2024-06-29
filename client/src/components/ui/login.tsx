import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import SignUpModal from "./signup";

const LoginModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    //implement code that need to happen when login button is clicked
    console.log("Login button clicked");
  };

  return (
    <Dialog open={openLogin} onOpenChange={setOpenLogin}>
      <DialogTrigger>Login</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <Button variant="default" onClick={(e) => setOpenLogin(false)}>
            {" "}
            Back
          </Button>
          <img></img>
          <Button
            variant="default"
            onClick={() => {
              setOpenSignup(true);
            }}
          >
            {" "}
            Sign up{" "}
          </Button>
          <DialogTitle>Log in with your account</DialogTitle>
          <Label htmlFor="loginemail">Email</Label>
          <Input id="loginemail" onChange={(e) => setEmail(e.target.value)} />
          <Label htmlFor="loginpassword">Password</Label>
          <Input
            id="loginpassword"
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogHeader>

        <Button variant="outline" onClick={handleLogin}>
          {" "}
          Submit
        </Button>
      </DialogContent>
      <SignUpModal
        isOpen={openSignup}
        onClose={() => {
          setOpenLogin(false);
          setOpenSignup(false);
        }}
      />
    </Dialog>
  );
};

export default LoginModal;
