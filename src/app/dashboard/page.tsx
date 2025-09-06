import { redirect } from "next/navigation";

export default function Page() {
  redirect("/dashboard/boards");
  return null;
}