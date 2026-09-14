"use server";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";

export async function updateGuest(formData) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");

  const nationalityValue = formData.get("nationality");

  console.log("nationalityValue:", nationalityValue);
  console.log("guestId:", session.user.guestId);
  console.log("nationalID:", nationalID);

  const [nationality, countryFlag] = nationalityValue.split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error("Please provide a valid nationalID");
  }

  const updateData = {
    nationality,
    countryFlag,
    nationalID,
  };

  console.log("updateData:", updateData);

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId)
    .select()
    .single();

  if (error) {
    console.log("SUPABASE ERROR:", error);
    throw new Error(error.message);
  }

  console.log("UPDATED GUEST:", data);
}
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
