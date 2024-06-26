import { AlignJustify } from "lucide-react";
import { ReactElement } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DropDownNav({
  ButtonsContainer,
}: {
  ButtonsContainer: ReactElement;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="lg:hidden">
          <AlignJustify size={30} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="m-1 w-48">
        <div className="flex justify-center"> Menu </div>
        <DropdownMenuSeparator />
        {ButtonsContainer}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
