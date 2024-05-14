import { ParsedLocation, redirect } from "@tanstack/react-router";
import { supabaseClient } from "~/libs/core/supabaseClient";


export const authCheck = async (location: ParsedLocation) => {
  const { data } = await supabaseClient.auth.getSession();
  if (data.session) {
    throw redirect({
      to: "/user",
      search: {
        redirect: location.href,
      },
    });
  }
};
