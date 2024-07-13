import { useState } from "react";

import RsvpListModal from "@/components/main/RsvpListModal";
import { usePings } from "@/hooks/pings";

import { Button } from "../components/ui/button";

export default function Home() {
  const [clicked, setClicked] = useState(false);
  const { data, isLoading } = usePings({
    enabled: clicked,
  });

  {
    /*   const [isSignUpOpen, setSignUp] = useState(false);
     */
  }

  return (
    <div>
      <h1 className="text-3xl text-primary">Test title</h1>
      <Button onClick={() => setClicked(true)}>
        {isLoading ? "Loading" : "Ping"}
      </Button>
      <p>
        Response from server: <span>{data as string}</span>
      </p>
      <RsvpListModal />
    </div>
  );
}
