"use client";
import About from "../components/Myui/About";
import CreateNewExpenses from "../components/Myui/CreateNewExpenses";
import Searchexpenses from "../components/Myui/SearchExpenses";
import Settings from "../components/Myui/Settings";
import Terms from "../components/Myui/Terms";
import Topbar from "../components/Myui/Topbar";
import { useState } from "react";
export default function Expenses() {
  const [settings, setSettings] = useState<boolean>(false);
  const [terms, setTerms] = useState<boolean>(false);
  const [NewExpenses, setNewExpenses] = useState<boolean>(false);
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
              <Searchexpenses />
            </div>

            {/**all expenses*/}
            <div></div>
            {/**button creation */}
          </>
        )}
        {NewExpenses && (
          <CreateNewExpenses close={() => setNewExpenses((prev) => !prev)} />
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
