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
import { Button } from "../ui/button";

interface exp {
  item: expenses;
  edit: React.Dispatch<React.SetStateAction<boolean>>;
  del: React.Dispatch<React.SetStateAction<boolean>>;
  oneitem: React.Dispatch<React.SetStateAction<expenses | undefined>>;
}

export default function Expense({ item, edit, del, oneitem }: exp) {
  if (!item) {
    return (
      <div className="bg-card text-card-foreground rounded-lg border border-dashed border-border p-6 flex items-center justify-center">
        <p className="text-sm text-muted-foreground font-medium">
          No expenses found
        </p>
      </div>
    );
  }

  return (
    <div className="group bg-card text-card-foreground rounded-lg border border-border p-4 shadow-sm transition-all hover:shadow-md hover:border-accent">
      <div className="flex flex-col gap-3">
        {/* Date Row */}
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-muted p-1.5">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            {new Date(item.date).toLocaleDateString("fr-FR")}
          </span>
        </div>

        {/* Name & Type Row */}
        <div className="flex items-center gap-2">
          {item.type === "income" ? (
            <PlusCircleIcon className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
          ) : (
            <MinusCircleIcon className="h-5 w-5 text-red-500 dark:text-red-400" />
          )}
          <strong className="text-base font-semibold truncate">
            {item.name}
          </strong>
        </div>

        {/* Amount and Actions Row */}
        <div className="flex items-center justify-between pt-1 border-t border-border/50">
          <div
            className={`flex items-center gap-1 text-lg font-bold ${
              item.type === "income"
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            <span>{item.type === "income" ? "+" : "-"}</span>
            <span>{Number(item.amount).toFixed(2)}</span>
            <DollarSign className="h-4 w-4" />
          </div>

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                edit(true);
                oneitem(item);
              }}
              className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-secondary"
              aria-label="Edit expense"
            >
              <EditIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => del(true)}
              className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              aria-label="Delete expense"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
