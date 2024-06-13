import React from "react";
import UserSideBar from "@/components/dashboard/UserSideBar";
import UserNavBar from "@/components/dashboard/UserNavBar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full bg-zinc-900">
      <div className="w-full h-full flex justify-center items-center p-0">
        <UserSideBar />
        <div className="flex-1 flex flex-col h-screen">
          <UserNavBar />
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
