import * as React from "react";
import { useEffect, useRef } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectBranch({
  setValue,
}: {
  setValue: (value: string) => void;
}) {
  return (
    <Select onValueChange={(value) => setValue(value)}>
      <SelectTrigger className="w-[180px] rounded-[20px] border-2 bg-[#7D916F] p-1 px-2">
        <SelectValue placeholder="City" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>City</SelectLabel>
          <SelectItem value="Perth">Perth</SelectItem>
          <SelectItem value="Sydney">Sydney</SelectItem>
          <SelectItem value="Brisbane">Brisbane</SelectItem>
          <SelectItem value="Gold Coast">Gold Coast</SelectItem>
          <SelectItem value="Cairns">Cairns</SelectItem>
          <SelectItem value="Townsville">Townsville</SelectItem>
          <SelectItem value="Melbourne">Melbourne</SelectItem>
          <SelectItem value="Hobart">Hobart</SelectItem>
          <SelectItem value="Byron Bay">Byron Bay</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
