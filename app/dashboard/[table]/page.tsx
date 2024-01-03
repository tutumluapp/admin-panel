import { redirect } from "next/navigation";

export default function Table({ params }: { params: { table: string } }) {
  redirect(`/dashboard/${params.table}/1`)
}