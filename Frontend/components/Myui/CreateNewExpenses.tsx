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
import { Save, SaveOff } from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateNewExpenses() {
  const { ...METHODS } = useForm<ExpenesesType>({
    resolver: zodResolver(ExpensesSchema),
    defaultValues: {
      name: "",
      amount: 0,
      type: "income",
      category: "",
      description: "",
    },
  });
  return (
    <Form {...METHODS}>
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name Item</FormLabel>
                <FormControl>
                  <Input
                    type="text"
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name Item</FormLabel>
                <FormControl>
                  <Input
                    type="text"
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name Item</FormLabel>
                <FormControl>
                  <Input
                    type="text"
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
        </div>

        {/**button field */}
        <div>
          <button type="submit" aria-label="Add" title="Add">
            <Save />
          </button>
          <button aria-label="Cancel" title="Cancel">
            <SaveOff />
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
