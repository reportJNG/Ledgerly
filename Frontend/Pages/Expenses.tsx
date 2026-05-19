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
export default function Expenses() {
  const [settings, setSettings] = useState<boolean>(false);
  const [terms, setTerms] = useState<boolean>(false);
  //create new expenses here
  const [NewExpenses, setNewExpenses] = useState<boolean>(false);
  const routes = useRouter();
  const [hiddenitems, SetHiddenitems] = useState<boolean>(false);
  //handling logic for searching
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
  //logic to handle the each expene
  const [Allexpenses, SetAllExpenses] = useState<expenses[]>([]);
  //deleting the expenses
  const [deltetingexpense, setDeletingExpense] = useState<boolean>(false);
  //editing new expense
  const [editing, setEditingExpense] = useState<boolean>(false);

  return (
    <>
      <header>
        <Topbar
          closeSettings={() => setSettings((prev) => !prev)}
          closeTerms={() => setTerms((prev) => !prev)}
          active="Management"
        />
      </header>

      <main>
        {!NewExpenses && (
          <>
            {/**search engine */}
            <div>
              <Searchexpenses name={text} UseName={setText} />
            </div>

            {/**all expenses*/}
            <div>
              <h1 className="text-2xl font-bold mb-4">All Expenses</h1>
              <div>
                <button onClick={() => SetHiddenitems((prev) => !prev)}>
                  {hiddenitems ? <EyeClosedIcon /> : <Eye />}
                </button>
              </div>
              {Allexpenses &&
                Allexpenses.map((item) => (
                  <div key={item.id}>
                    <Expense
                      item={item}
                      edit={setEditingExpense}
                      del={setDeletingExpense}
                    />
                  </div>
                ))}
            </div>
            {/**button creation this should be right stick in top for ui clean  */}
            <button onClick={() => setNewExpenses((prev) => !prev)}>
              <PenSquareIcon />
            </button>
          </>
        )}
        {NewExpenses && (
          <CreateNewExpenses
            close={() => setNewExpenses((prev) => !prev)}
            idUser={user.id}
          />
        )}
      </main>

      <footer>
        <About />
      </footer>

      {settings && <Settings close={() => setSettings((prev) => !prev)} />}
      {terms && <Terms close={() => setTerms((prev) => !prev)} />}
    </>
  );
}
