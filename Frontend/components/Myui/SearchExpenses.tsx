import { Input } from "../ui/input";
interface Searching {
  name: string;
  UseName: React.Dispatch<React.SetStateAction<string>>;
}
import { Search } from "lucide-react";

export default function Searchexpenses({ name, UseName }: Searching) {
  return (
    <div>
      <Input
        type="text"
        value={name}
        onChange={(e) => UseName(e.target.value.replace(/[^a-zA-Z0-9]/g, ""))}
      />
      <Search />
    </div>
  );
}
