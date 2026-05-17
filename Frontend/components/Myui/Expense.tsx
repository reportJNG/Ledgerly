import {
  Calendar,
  MinusCircleIcon,
  PlusCircleIcon,
  DollarSign,
  EditIcon,
  Trash2,
} from "lucide-react";
import { expenses } from "@/lib/generated/prisma";

interface exp {
  item: expenses;
  edit: (id: string, i: string) => void;
  del: (id: string, i: string) => void;
}
export default function Expense({ item, edit, del }: exp) {
  return (
    <div>
      <div>
        <Calendar />{" "}
        <strong>{new Date(item.date).toLocaleDateString("fr-FR")}</strong>
      </div>
      <div>
        {item.type === "income" ? <PlusCircleIcon /> : <MinusCircleIcon />}{" "}
        <strong>{item.name}</strong>
      </div>
      <div>
        <div>
          {Number(item.amount).toFixed(2)}
          <DollarSign />
        </div>
        <div>
          <button onClick={() => edit(item.id, item.user_id)}>
            <EditIcon />
          </button>
          <button onClick={() => del(item.id, item.user_id)}>
            <Trash2 />
          </button>
        </div>
      </div>
    </div>
  );
}
