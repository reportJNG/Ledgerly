"use client";
import About from "../components/Myui/About";
import Topbar from "../components/Myui/Topbar";
import { useState } from "react";
export default function Expenses() {
  const [settings, setSettings] = useState<boolean>(false);
  const [terms, setTerms] = useState<boolean>(false);
  return (
    <>
      <header>
        <Topbar
          closeSettings={() => setSettings((prev) => !prev)}
          closeTerms={() => setTerms((prev) => !prev)}
          active="Management"
        />
      </header>

      <main></main>

      <footer>
        <About />
      </footer>
    </>
  );
}
