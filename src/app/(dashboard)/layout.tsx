import Sidebar from "@/components/Sidebar";
import Searchbar from "@/components/Searchbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Sidebar />
      <div className="wrapper">
        <Searchbar />
        {children}
      </div>
    </div>
  );
}
