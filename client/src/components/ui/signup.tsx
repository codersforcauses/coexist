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

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignUpModal: React.FC<SignupModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [open,setOpenSignup] = useState(false);

  const handleLogin = async () => {
    if (!email || !password || !username || !firstname || !lastname) {
      alert("Please fill in all fields.");
      return;
    }

    //implement code that need to happen when login button is clicked
    console.log("Sign up button clicked");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger>Sign up</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign up</DialogTitle>
          <Label htmlFor="username">Username</Label>
          <Input id="username" onChange={(e) => setUsername(e.target.value)} />
          <Label htmlFor="firstname">First name</Label>
          <Input
            id="firstname"
            onChange={(e) => setFirstname(e.target.value)}
          />
          <Label htmlFor="lastname">Last name</Label>
          <Input id="lastname" onChange={(e) => setLastname(e.target.value)} />
          <Label htmlFor="signupemail">Email</Label>
          <Input id="signupemail" onChange={(e) => setEmail(e.target.value)} />
          <Label htmlFor="signuppassword">Password</Label>
          <Input
            id="signuppassword"
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogHeader>

        <Button variant="outline" onClick={handleLogin}>
          {" "}
          Submit
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpModal;
