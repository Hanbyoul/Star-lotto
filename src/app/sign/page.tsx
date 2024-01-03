"use client";

import SignUp from "../components/SignUp";
import { useSession } from "next-auth/react";
import { Session } from "../components/Navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Sign() {
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
      <SignUp />
    </>
  );
}
