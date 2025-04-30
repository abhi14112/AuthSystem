import React from "react";
import Navbar from "../components/Navbar";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="grid grid-cols-6 h-screen w-screen  overflow-y-hidden">
      <div className="col-span-1  h-screen">
        <LeftSidebar />
      </div>
      <div className="col-span-5">
        <div className="sticky top-0">
          <Navbar />
        </div>
        <div className="overflow-y-scroll pb-16 max-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default AdminLayout;
