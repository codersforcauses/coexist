import { useState } from "react";

import { usePings } from "@/hooks/pings";

import NewEvent from "../components/main/newevent/NewEvent";
import { Button } from "../components/ui/button";

export default function Home() {
  const [clicked, setClicked] = useState(false);
  const { data, isLoading } = usePings({
    enabled: clicked,
  });

  return (
    <div className="mx-auto text-center">
      <h1 className="text-3xl text-primary">Test title</h1>
      <Button onClick={() => setClicked(true)}>
        {isLoading ? "Loading" : "Ping"}
      </Button>
      <p>
        Response from server: <span>{data as string}</span>
      </p>
    </div>
  );
}
