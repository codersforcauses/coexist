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
import FailedBranch from "./failed-branch";

interface Prop {
  setValue: (value: string) => void;
  setIsLoading: any;
}

export function SelectBranch({ setValue, setIsLoading }: Prop) {
  const [branchData, setBranchData] = useState<any>(null);

  useEffect(() => {
    async function fetchBranch() {
      setIsLoading(true);
      const branchArray = await selectCity();
      setBranchData(branchArray);
    }

    fetchBranch();
  }, []);

  if (branchData == false || branchData == null) {
    setIsLoading(false);
    return (
      <Select
        onValueChange={(value: any) => {
          setValue(value);
        }}
      >
        <FailedBranch></FailedBranch>
        <SelectTrigger className="w-[180px] rounded-[20px] border-2 bg-[#7D916F] p-1 px-2">
          <SelectValue placeholder="City" />
          <SelectContent>
            <SelectItem value="N/A">No cities available</SelectItem>
          </SelectContent>
        </SelectTrigger>
      </Select>
    );
  } else {
    setIsLoading(false);
  }

  function nametoid(name: string) {
    for (let i = 0; i < branchData.length; i++) {
      if (branchData[i].name === name) {
        return branchData[i].id;
      }
    }
  }

  return (
    <Select
      onValueChange={(value) => {
        setValue(nametoid(value));
      }}
    >
      <SelectTrigger className="w-[180px] rounded-[20px] border-2 bg-[#7D916F] p-1 px-2">
        <SelectValue placeholder="City" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>City</SelectLabel>
          {branchData.map((d: any) => (
            <SelectItem value={d.name}>{d.name}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
