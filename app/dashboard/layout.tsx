import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import Sidebar from "@/components/ui/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen border border-foreground/10">
      <div className="p-5 border-r border-r-foreground/10">
        <Sidebar />
      </div>
      <div className="flex-grow p-5 items-center space-y-4">
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  );
}
