import React from "react";
import UserSideBar from "@/components/dashboard/UserSideBar";
import UserNavBar from "@/components/dashboard/UserNavBar";

const SubscriptionLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    
        <div className="flex-1 overflow-auto mb-20">
          {children}
        </div>
  );
};

export default SubscriptionLayout;
