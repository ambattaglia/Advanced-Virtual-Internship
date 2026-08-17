import Sidebar from "@/components/Sidebar";
import Searchbar from "@/components/Searchbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-white w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 border-b border-gray-100 flex items-center px-6 md:px-10 justify-between shrink-0 sticky top-0 bg-white z-30">
          <Searchbar />
        </header>
        <main className="flex-1 p-6 md:p-10 max-w-[1070px] w-full mx-auto pb-24">
          {children}
        </main>
      </div>
    </div>
  );
}
