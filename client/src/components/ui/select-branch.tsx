import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetBranches from "@/hooks/useBranches";
import { cn } from "@/lib/utils";

type Props = {
  selectedId: number | undefined;
  onChange: (id: number) => void;
  className?: string;
};

export function SelectBranch({ selectedId, onChange, className }: Props) {
  const { data: branches, isPending, isError } = useGetBranches();

  const onValueChange = (value: string) => {
    const parsed = parseInt(value);
    if (parsed) {
      onChange(parsed);
    }
  };

  return (
    <Select
      value={selectedId ? selectedId.toString() : ""}
      onValueChange={onValueChange}
    >
      <SelectTrigger className={cn("w-[180px]", className)}>
        <SelectValue placeholder="Branch" />
      </SelectTrigger>
      <SelectContent>
        {isPending || isError ? (
          <SelectItem value="NaN" disabled>
            Loading...
          </SelectItem>
        ) : (
          branches.map((branch) => (
            <SelectItem value={branch.id.toString()} key={branch.id}>
              {branch.name}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
}
