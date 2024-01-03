"use client";

import { useSession } from "next-auth/react";
import Login from "../components/Login";
import { Session } from "../components/Navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { data } = useSession();
  const session = data as Session;
  const router = useRouter();

  // useEffect(() => {
  //   if (session?.user) {
  //     router.replace("/");
  //   }
  // }, [session]);
  return (
    <>
      <Login />
    </>
  );
}
