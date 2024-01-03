import AuthButton from "@/components/ui/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";


export default async function Navbar() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <h2 className="text">Welcome {user?.email}!</h2>
          <AuthButton />
        </div>
      </nav>
  )
}