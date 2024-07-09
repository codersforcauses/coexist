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
  setIsLoading: any;
}

export function SelectBranch({ setValue, setIsLoading }: Prop) {
  const [branchData, setBranchData] = useState<any>(null);

  useEffect(() => {
    async function fetchBranch() {
      setIsLoading(true);
      const branchArray = await selectCity();
      console.log(branchArray);
      setBranchData(branchArray);
    }

    fetchBranch();
  }, []);

  if (branchData === null) {
    return (
      <Select
        onValueChange={(value: any) => {
          setValue(value);
        }}
      >
        <SelectTrigger className="w-[180px] rounded-[20px] border-2 bg-[#7D916F] p-1 px-2">
          <SelectValue placeholder="City" />
        </SelectTrigger>
      </Select>
    );
  } else {
    setIsLoading(false);
  }

  return (
    <Select onValueChange={(value) => setValue(value)}>
      <SelectTrigger className="w-[180px] rounded-[20px] border-2 bg-[#7D916F] p-1 px-2">
        <SelectValue placeholder="City" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>City</SelectLabel>
          {branchData.map((d: any) => (
            <SelectItem value={d.id}>{d.name}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
