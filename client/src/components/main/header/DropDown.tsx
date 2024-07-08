import { AlignJustify } from "lucide-react";
import { ReactElement } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DropDownNav({ Links }: { Links: ReactElement }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="lg:hidden">
          <AlignJustify className="border-none" size={30} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="m-1 w-48 lg:hidden">
        <div className="flex justify-center font-medium"> Menu </div>
        <DropdownMenuSeparator />
        {Links}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
