import {
  UserIcon,
  BarcodeIcon,
  ShoppingCartIcon,
  DollarSignIcon,
  RowsIcon,
  Building2Icon,
} from "lucide-react";

export default function Sidebar() {
  const tables = [
    { title: "Users", href: "/dashboard/users", icon: <UserIcon /> },
    { title: "Scans", href: "/dashboard/scans", icon: <BarcodeIcon /> },
    { title: "Products", href: "/dashboard/products", icon: <ShoppingCartIcon /> }, // prettier-ignore
    { title: "Prices", href: "/dashboard/prices", icon: <DollarSignIcon /> },
    { title: "Categories", href: "/dashboard/categories", icon: <RowsIcon /> },
    { title: "Markets", href: "/dashboard/markets", icon: <Building2Icon /> },
  ];
  return (
    <div className="sticky px-10 top-4">
      <div className="flex flex-col items-center justify-center border-b border-b-foreground/10 h-16">
        <a href="/dashboard" className="text-2xl font-bold">Tutumlu</a>
        </div>
      <div className="flex flex-col items-center border border-red-600">
        {tables.map((table) => (
          <a
            key={table.title}
            href={table.href}
            className="flex items-center justify-start w-20 h-12 gap-2 border border-red-300 rounded-xl hover:bg-gray-200"
          > 
            <div className="flex-1 border items-center justify-center">
              {table.icon}
            </div>
            <span className="flex-1 border text-m">{table.title}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
