import { Value } from "@radix-ui/react-select";
import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import selectCity from "../../hooks/selectCity";

interface Prop {
  setValue: (value: string) => void;
  signUp: boolean;
}

export function SelectBranch({ setValue, signUp }: Prop) {
  const cities_query = selectCity();
  const city_list = cities_query.data?.results;

  return (
    <Select
      onValueChange={(value: any) => {
        setValue(value);
      }}
    >
      <SelectTrigger className={`${signUp ? "w-full" : "w-[180px]"}`}>
        <SelectValue placeholder="City" defaultValue="N/A" />
        <SelectContent>
          {cities_query.isLoading ? (
            <SelectItem value="N/A">Loading...</SelectItem>
          ) : (
            city_list &&
            city_list.map((city) => (
              <SelectItem value={city.id.toString()}>{city.name}</SelectItem>
            ))
          )}
        </SelectContent>
      </SelectTrigger>
    </Select>
  );
}
