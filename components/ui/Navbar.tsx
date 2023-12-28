import AuthButton from "@/components/ui/AuthButton";
import DeployButton from "@/components/ui/DeployButton";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <DeployButton />
          <AuthButton />
        </div>
      </nav>
  )
}