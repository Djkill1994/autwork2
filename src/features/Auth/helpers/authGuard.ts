import { ParsedLocation, redirect } from "@tanstack/react-router";
import { supabaseClient } from "~/libs/core";

export const authGuard = async (location: ParsedLocation) => {
  const { data: session } = await supabaseClient.auth.getSession();

  if (!session || !session.session) {
    throw redirect({
      to: "/",
      search: {
        redirect: location.href,
      },
    });
  }

  const userId = session.session.user.id;
  const { data: userData } = await supabaseClient
    .from("users")
    .select("role")
    .eq("id", userId)
    .single();

  if (!userData || !userData.role) {
    console.error("Role not found for user:", userData);
    return;
  }

  const role = userData.role;
  const redirectTo = role === "admin" ? "/admin" : "/user";

  throw redirect({
    to: redirectTo,
    search: { redirect: location.href },
  });
};
