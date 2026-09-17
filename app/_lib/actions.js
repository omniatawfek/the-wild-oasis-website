"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

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

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  revalidatePath("/account/profile");
}

export async function updateReservation(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const bookingId = Number(formData.get("bookingId"));
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsId = guestBookings.map((booking) => booking.id);
  if (!guestBookingsId.includes(bookingId))
    throw new Error("you are not allowed to update this booking");

  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    throw new Error("Booking could not be updated");
  }
  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect("/account/reservations");
}

export async function deleteResevation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsId = guestBookings.map((booking) => booking.id);
  if (!guestBookingsId.includes(bookingId))
    throw new Error("you are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    throw new Error("Booking could not be deleted");
  }
  revalidatePath("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
