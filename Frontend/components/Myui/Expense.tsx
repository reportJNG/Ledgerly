import {
  Calendar,
  MinusCircleIcon,
  PlusCircleIcon,
  DollarSign,
  EditIcon,
  Trash2,
} from "lucide-react";
import { expenses } from "@/lib/generated/prisma";
import React from "react";

interface exp {
  item: expenses;
  edit: React.Dispatch<React.SetStateAction<boolean>>;
  del: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Expense({ item, edit, del }: exp) {
  return (
    <div className="bg-card text-card-foreground rounded-lg border border-border p-4 shadow-sm transition-colors hover:bg-accent/50">
      {item && (
        <div className="flex flex-col gap-3">
          {/* Date Row */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <strong className="text-sm font-medium text-foreground">
              {new Date(item.date).toLocaleDateString("fr-FR")}
            </strong>
          </div>

          {/* Name Row */}
          <div className="flex items-center gap-2">
            {item.type === "income" ? (
              <PlusCircleIcon className="h-5 w-5 text-chart-2" />
            ) : (
              <MinusCircleIcon className="h-5 w-5 text-destructive" />
            )}
            <strong className="text-base font-semibold">{item.name}</strong>
          </div>

          {/* Amount and Actions Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-lg font-bold">
              <span>{Number(item.amount).toFixed(2)}</span>
              <DollarSign className="h-4 w-4" />
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => edit((prev) => !prev)}
                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label="Edit expense"
              >
                <EditIcon className="h-4 w-4" />
              </button>
              <button
                onClick={() => del((prev) => !prev)}
                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                aria-label="Delete expense"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {!item && (
        <div className="flex items-center justify-center py-8">
          <strong className="text-muted-foreground">Empty</strong>
        </div>
      )}
    </div>
  );
}
