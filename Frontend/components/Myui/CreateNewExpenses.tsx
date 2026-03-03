import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { ExpenesesType, ExpensesSchema } from "@/Frontend/Schemas/NewExpenses";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleDollarSign, Save, Send, X } from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Frontend/components/ui/select";
import { CreatingNewExpensesAction } from "@/Backend/Server/CreateNewExpenses";
import { toast } from "sonner";
import { Button } from "../ui/button";

interface CreateExpensesprops {
  idUser: string;
  close: () => void;
}

export default function CreateNewExpenses({
  close,
  idUser,
}: CreateExpensesprops) {
  const { ...METHODS } = useForm<ExpenesesType>({
    resolver: zodResolver(ExpensesSchema),
    defaultValues: {
      name: "",
      amount: 0,
      type: "income",
      category: "",
      description: "",
      date: new Date() ?? "yyyy-MM-dd",
    },
  });

  const Creating = async (data: ExpenesesType) => {
    const result = await CreatingNewExpensesAction(idUser, data);
    if (result?.error) {
      toast.error(result.error);
      METHODS.reset();
    } else if (result?.success) {
      toast.success(result.success);
      METHODS.reset();
      close();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-background shadow-2xl">
        <Button
          variant="ghost"
          size="icon"
          onClick={close}
          className="absolute right-4 top-4 z-10 rounded-full hover:bg-muted cursor-pointer"
          aria-label="Close"
        >
          <X className="h-4 w-4 " />
        </Button>

        <Form {...METHODS}>
          <form
            onSubmit={METHODS.handleSubmit(Creating)}
            className="space-y-8 p-8"
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Create New Transaction
              </h1>
              <p className="text-sm text-muted-foreground">
                Keep track of your finances by adding your income or expenses
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <FormField
                  control={METHODS.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Item Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="e.g., Groceries, Salary, Rent..."
                          required
                          className="h-11 transition-all duration-200 focus:ring-2 focus:ring-ring"
                          {...field}
                          onChange={(e) => {
                            e.target.value = e.target.value.replace(
                              /[^a-zA-Z0-9\s]/g,
                              "",
                            );
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-destructive" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={METHODS.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Transaction Type{" "}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      required
                    >
                      <FormControl>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem
                          value="income"
                          className="text-emerald-600 dark:text-emerald-400"
                        >
                          <CircleDollarSign className="h-4 w-4" />
                          <span>Income</span>{" "}
                        </SelectItem>
                        <SelectItem
                          value="expense"
                          className="text-rose-600 dark:text-rose-400"
                        >
                          <Send className="h-4 w-4 " />
                          <span>Expense</span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={METHODS.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Amount
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          $
                        </span>
                        <Input
                          type="number"
                          placeholder="0.00"
                          required
                          className="h-11 pl-8 transition-all duration-200 focus:ring-2 focus:ring-ring"
                          {...field}
                          onChange={(e) => {
                            e.target.value = e.target.value.replace(
                              /[^0-9.]/g,
                              "",
                            );
                            field.onChange(e ? parseFloat(e.target.value) : "");
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={METHODS.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Category <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        required
                        placeholder="e.g., Food, Transport, Bills..."
                        className="h-11 transition-all duration-200 focus:ring-2 focus:ring-ring"
                        {...field}
                        onChange={(e) => {
                          e.target.value = e.target.value.replace(
                            /[^a-zA-Z\s]/g,
                            "",
                          );
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-destructive" />
                  </FormItem>
                )}
              />

              <FormField
                control={METHODS.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Date <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        className="h-11 transition-all duration-200 focus:ring-2 focus:ring-ring"
                        value={
                          field.value
                            ? new Date(field.value).toISOString().split("T")[0]
                            : ""
                        }
                        onChange={(e) =>
                          field.onChange(new Date(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-destructive" />
                  </FormItem>
                )}
              />

              <div className="md:col-span-2">
                <FormField
                  control={METHODS.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Description
                      </FormLabel>
                      <FormControl>
                        <textarea
                          placeholder="Add any additional notes or details about this transaction..."
                          className="flex min-h-30 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                          {...field}
                          onChange={(e) => {
                            e.target.value = e.target.value.replace(
                              /[^a-zA-Z0-9\s.,!?'"()-]/g,
                              "",
                            );
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-destructive" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t">
              <Button
                type="submit"
                className="flex-1 h-11 bg-linear-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-300 cursor-pointer"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Transaction
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={close}
                className="flex-1 h-11 border-2 hover:bg-destructive/10 hover:border-destructive/50 hover:text-destructive transition-all duration-300 cursor-pointer"
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>

            <div className="text-center text-xs text-muted-foreground">
              <p>
                © 2026 • Organize and structure your data in your safe place
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
