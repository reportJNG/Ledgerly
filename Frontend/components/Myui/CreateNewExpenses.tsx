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
import { Save, SaveOff, X } from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CreateExpensesprops {
  create: () => void;
  close: () => void;
}

export default function CreateNewExpenses({
  create,
  close,
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
  return (
    <Form {...METHODS}>
      <X onClick={close} />
      {/**Overlay */}
      <form>
        <div>
          {/**title */}
          <h1>Create new expenses</h1>
          <p>where you be able to secure your self</p>
        </div>

        <div>
          {/** input fileds */}

          <FormField
            control={METHODS.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name Item</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Name Your Bill..."
                    required
                    {...field}
                    onChange={(e) => {
                      e.target.value = e.target.value.replace(
                        /[^a-zA-Z0-9]/g,
                        "",
                      );
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={METHODS.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  required
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={METHODS.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Amount..."
                    required
                    {...field}
                    onChange={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, "");
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={METHODS.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Item</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    required
                    {...field}
                    placeholder="Category..."
                    onChange={(e) => {
                      e.target.value = e.target.value.replace(/[^a-zA-Z]/g, "");
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={METHODS.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="What you used item for ?..."
                    {...field}
                    onChange={(e) => {
                      e.target.value = e.target.value.replace(
                        /[^a-zA-Z0-9]/g,
                        "",
                      );
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={METHODS.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    value={
                      field.value ? field.value.toISOString().split("T")[0] : ""
                    }
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/**button field */}
        <div>
          <button type="submit" aria-label="Add" title="Add" onClick={create}>
            <span>
              <Save />
            </span>
          </button>
          <button aria-label="Cancel" title="Cancel" onClick={close}>
            <span>
              <SaveOff />
            </span>
          </button>
        </div>

        {/**description field */}
        <div>
          <p>Organize and structure your data in your safe place </p>
        </div>
      </form>
    </Form>
  );
}
