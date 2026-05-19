import { Input } from "../ui/input";
interface Searching {
  name: string;
  UseName: React.Dispatch<React.SetStateAction<string>>;
}
import { Search } from "lucide-react";

export default function Searchexpenses({ name, UseName }: Searching) {
  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
      <Input
        type="text"
        placeholder="Search expenses..."
        value={name}
        onChange={(e) => UseName(e.target.value.replace(/[^a-zA-Z0-9]/g, ""))}
        className="pl-10 pr-4 h-10 w-full rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
        title="Search..."
      />
    </div>
  );
}
