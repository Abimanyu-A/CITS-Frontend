import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 min-h-screen p-4 md:p-6 md:ml-64">
        {children}
      </main>
    </div>
  );
}