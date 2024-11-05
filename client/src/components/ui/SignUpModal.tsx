import { set } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import { toast } from "sonner";

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
import { useAuth } from "@/context/AuthProvider";
import { useRegister } from "@/hooks/useUser";

import { SelectBranch } from "./select-branch";

interface Props {
  children: ReactNode;
}

function SignUpModal({ children }: Props) {
  const router = useRouter();
  const { login } = useAuth();
  const { mutate: register } = useRegister({
    // TODO: Re-write these functions once the form has been changed to use react-hook-form
    onSuccess: (_, details) => {
      alert("Account created successfully.");
      login(details.email, details.password).then(() => {
        router.push("/profile");
        toast.success("You are now logged in.");
      });
    },
    onError: (error) => {
      if (!error.status) {
        alert(
          "There was an server error when trying to create an account. Please try again later.",
        );
      } else {
        alert(`Registration Error. Status Code = ${error.status}`);
      }
    },
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [city, setCity] = useState("N/A");
  const [phone, setPhone] = useState("");
  const onErrorStyle = "border-2 border-red-500";
  const [error, setError] = useState({
    email: false,
    firstname: false,
    lastname: false,
    phone: false,
    password: false,
    confirmpassword: false,
    city: false,
  });
  const [emsg, setMsg] = useState(Array(6).fill(false));
  // 0 -  empty fields
  // 1 -  invalid email
  // 2 -  invalid phone
  // 3 -  password mismatch
  // 4 -  duplicate email
  // 5 -  no branch selected
  //

  function emptyFields() {
    let msg = Array(6).fill(false);
    let temp = {
      email: false,
      firstname: false,
      lastname: false,
      phone: false,
      password: false,
      confirmpassword: false,
      city: false,
    };

    const fields = {
      email,
      firstname,
      lastname,
      password,
      confirmpassword,
      city,
    };

    //check each field if its empty
    Object.entries(fields).forEach(([key, value]) => {
      if (!value.trim().length) {
        temp[key as keyof typeof temp] = true;
      }
    });

    //if atleast one empty show error message to fill out required fields
    if (
      temp["email"] ||
      temp["firstname"] ||
      temp["lastname"] ||
      temp["password"] ||
      temp["confirmpassword"] ||
      temp["city"]
    ) {
      msg[0] = true;
      setMsg(msg);
      setError(temp);
      return true;
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    let msg = Array(6).fill(false);
    let temp = {
      email: false,
      firstname: false,
      lastname: false,
      phone: false,
      password: false,
      confirmpassword: false,
      city: false,
    };

    e.preventDefault();

    // front end checks for empty fields
    if (emptyFields()) {
      return;
    }

    // mismatching password
    if (password !== confirmpassword) {
      temp["password"] = true;
      temp["confirmpassword"] = true;
      msg[3] = true;
      setMsg(msg);
      setError(temp);
      return;
    }

    //invalid phone number
    if (phone.trim().length) {
      if (!/^\d+$/.test(phone) || phone.length !== 10) {
        temp["phone"] = true;
        msg[2] = true;
        setMsg(msg);
        setError(temp);
        return;
      }
    }

    if (city === "N/A") {
      temp["city"] = true;
      msg[6] = true;
      setError(temp);
      setMsg(msg);
      return;
    }

    //make api call
    register({
      email,
      password,
      firstName: firstname,
      lastName: lastname,
      phone,
      branch: Number(city),
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
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
              {emsg[0] ? (
                <a className="text-xs font-medium text-red-500">
                  Please fill out all required fields (*).
                </a>
              ) : (
                ""
              )}

              <div>
                <Label htmlFor="email" className="font-semibold">
                  Email <a className="text-red-500">*</a>{" "}
                </Label>
                <Input
                  type="text"
                  id="email"
                  placeholder="Enter Email"
                  className={`w-full ${error["email"] ? onErrorStyle : ""}`}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {emsg[1] ? (
                <a className="text-xs font-medium text-red-500">
                  Invalid Email.
                </a>
              ) : (
                ""
              )}

              {emsg[4] ? (
                <a className="text-xs font-medium text-red-500">
                  Email already has been used.
                </a>
              ) : (
                ""
              )}

              {/* Name labels */}
              <div className="flex w-full flex-row gap-2">
                <div className="flex w-[49%] flex-col">
                  <Label htmlFor="text">
                    First Name <a className="text-red-500">*</a>{" "}
                  </Label>
                  <Input
                    type="text"
                    id="firstName"
                    placeholder="Enter text"
                    className={`w-full ${error["firstname"] ? onErrorStyle : ""}`}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="flex w-[49%] flex-col">
                  <Label htmlFor="text">
                    Last Name <a className="text-red-500">*</a>{" "}
                  </Label>
                  <Input
                    type="text"
                    id="lastName"
                    placeholder="Enter text"
                    className={`w-full ${error["lastname"] ? onErrorStyle : ""}`}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="text">Phone number</Label>
                <Input
                  type="text"
                  id=""
                  placeholder="Enter phone number"
                  className={`w-full ${error["phone"] ? onErrorStyle : ""}`}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              {emsg[2] ? (
                <a className="text-xs font-medium text-red-500">
                  Enter a valid phone number.
                </a>
              ) : (
                ""
              )}

              <div>
                <Label htmlFor="password">
                  Password <a className="text-red-500">*</a>{" "}
                </Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  className={`w-full ${error["password"] ? onErrorStyle : ""}`}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="password">
                  Confirm Password <a className="text-red-500">*</a>{" "}
                </Label>
                <Input
                  type="password"
                  id="passwordConfirm"
                  placeholder="Enter password again"
                  className={`w-full ${error["confirmpassword"] ? onErrorStyle : ""}`}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {emsg[3] ? (
                <a className="text-xs font-medium text-red-500">
                  Passwords do not match.
                </a>
              ) : (
                ""
              )}

              {/* Select label */}
              <div className="flex flex-col">
                {/* Component uses branch api to get cities from backend*/}
                <Label htmlFor="branch">Branch</Label>
                <SelectBranch setValue={setCity} signUp={true} />

                {emsg[6] ? (
                  <a className="text-xs font-medium text-red-500">
                    Please select a branch.
                  </a>
                ) : (
                  ""
                )}
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
