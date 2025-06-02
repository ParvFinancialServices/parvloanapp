"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  try {
    const cookieStore = cookies();
    cookieStore.set("jwt", "", {
      httpOnly: true,
      maxAge: 0,
    });
    cookieStore.set("role", "", {
      httpOnly: true,
      maxAge: 0,
    });

    redirect("/login");
  } catch (e) {
    console.log(e);
    redirect("/login");
  }
}
