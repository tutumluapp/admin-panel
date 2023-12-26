import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import Sidebar from "@/components/ui/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <div className="p-5 min-h-screen border-r border-r-foreground/10">
        <Sidebar />
      </div>
      <div className="p-5 items-center space-y-4 flex-grow">
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  );
}
