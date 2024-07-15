import { ReloadIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

export function ButtonLoading() {
  return (
    <Button className="bg-transparent" disabled>
      <ReloadIcon className="mr-2 h-[40px] w-[40px] animate-spin" />
    </Button>
  );
}
