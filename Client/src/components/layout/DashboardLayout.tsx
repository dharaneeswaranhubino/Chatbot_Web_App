import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const DashboardLayout = () => {
  return (
    <>
      <Topbar />
      <div className="flex h-screen pt-16">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <main className="flex-1 p-6 bg-gray-100 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
