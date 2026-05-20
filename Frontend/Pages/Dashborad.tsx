"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { TokenChecker } from "@/Backend/Server/TokenChecker";
export default function Dashborad() {
  const routes = useRouter();

  useEffect(() => {
    const check = async () => {
      const testusers = await TokenChecker();
      if (testusers?.error) {
        routes.push("/");
      }
    };
    check();
  }, [routes]);
  return <div></div>;
}
