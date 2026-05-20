"use client";
import About from "../components/Myui/About";
import CreateNewExpenses from "../components/Myui/CreateNewExpenses";
import Searchexpenses from "../components/Myui/SearchExpenses";
import Settings from "../components/Myui/Settings";
import Terms from "../components/Myui/Terms";
import Topbar from "../components/Myui/Topbar";
import { useState } from "react";
import { expenses, users } from "@/lib/generated/prisma";
import { useEffect } from "react";
import { GetInfoUser } from "@/Backend/Server/GetInfoUser";
import { useRouter } from "next/navigation";
import { Eye, EyeClosedIcon, PenSquareIcon } from "lucide-react";
import Expense from "@/Frontend/components/Myui/Expense";
import { GetAllExpenses } from "@/Backend/Server/GetAllExpenses";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import Delete from "../components/Myui/Delete";

export default function Expenses() {
  const [settings, setSettings] = useState<boolean>(false);
  const [terms, setTerms] = useState<boolean>(false);
  const [NewExpenses, setNewExpenses] = useState<boolean>(false);
  const routes = useRouter();
  const [hiddenitems, SetHiddenitems] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [user, setUser] = useState<users>({
    id: "",
    name: "",
    email: "",
    password: "",
    created_at: null,
  });

  useEffect(() => {
    const call = async () => {
      const result = await GetInfoUser();
      if (result.error) {
        routes.push("/");
      }
      if (result.success) setUser(result.success);
    };
    call();
  }, [routes]);

  const [Allexpenses, SetAllExpenses] = useState<expenses[]>([]);
  useEffect(() => {
    if (!user.id) return;
    const timeouts = setTimeout(async () => {
      try {
        const data = await GetAllExpenses(user?.id, text);
        if (!data) {
          toast.error("Failed to load expenses");
        }
        SetAllExpenses(data);
      } catch {
        toast.error("Failed to load expenses");
      }
    }, 1000);
    return () => clearTimeout(timeouts);
  }, [text, user?.id]);

  const [deltetingexpense, setDeletingExpense] = useState<boolean>(false);
  const deleting = async () => {};

  const [editing, setEditingExpense] = useState<boolean>(false);
  const [oneitem, setOneItem] = useState<expenses | undefined>();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <Topbar
          closeSettings={() => setSettings((prev) => !prev)}
          closeTerms={() => setTerms((prev) => !prev)}
          active="Management"
        />
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4 py-6 relative">
        {!NewExpenses && (
          <div className="space-y-6">
            {/* Search Engine */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <Searchexpenses name={text} UseName={setText} />
              </div>
              <Button
                onClick={() => setNewExpenses(true)}
                className="gap-2 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                size="lg"
              >
                <PenSquareIcon className="h-5 w-5" />
                <span className="hidden sm:inline">New Expense</span>
              </Button>
            </div>

            {/* All Expenses Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-foreground">
                  All Expenses
                </h1>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => SetHiddenitems((prev) => !prev)}
                  className="h-9 w-9"
                  aria-label={hiddenitems ? "Show expenses" : "Hide expenses"}
                >
                  {hiddenitems ? (
                    <EyeClosedIcon className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {/* Expenses List */}
              {!hiddenitems && Allexpenses && Allexpenses.length > 0 && (
                <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {Allexpenses.map((item) => (
                    <Expense
                      key={item.id}
                      oneitem={setOneItem}
                      item={item}
                      edit={setEditingExpense}
                      del={setDeletingExpense}
                    />
                  ))}
                </div>
              )}

              {/* Empty State */}
              {!hiddenitems && (!Allexpenses || Allexpenses.length === 0) && (
                <div className="flex flex-col items-center justify-center py-16 text-center rounded-lg border border-dashed border-border bg-card/50">
                  <div className="rounded-full bg-muted p-4 mb-4">
                    <EyeClosedIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No expenses found
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Start tracking your expenses by creating a new one.
                  </p>
                </div>
              )}

              {/* Hidden State */}
              {hiddenitems && (
                <div className="flex items-center justify-center py-16 rounded-lg border border-border bg-muted/30">
                  <div className="text-center">
                    <EyeClosedIcon className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <strong className="text-muted-foreground text-lg">
                      Expenses Hidden
                    </strong>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Create New Expense View */}
        {NewExpenses && (
          <CreateNewExpenses
            close={() => setNewExpenses(false)}
            idUser={user.id}
            isnew={true}
            data={null}
          />
        )}

        {/* Delete Dialog */}
        {deltetingexpense && (
          <Delete close={setDeletingExpense} del={deleting} />
        )}

        {/* Edit Dialog */}
        {editing && (
          <CreateNewExpenses
            close={() => setEditingExpense(false)}
            idUser={user.id}
            isnew={false}
            data={oneitem || null}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-8">
        <About />
      </footer>

      {/* Modals */}
      {settings && <Settings close={() => setSettings(false)} />}
      {terms && <Terms close={() => setTerms(false)} />}
    </div>
  );
}
