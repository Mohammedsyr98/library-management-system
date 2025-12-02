import Sidebar from "@/components/dashboard/Sidebar";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-start bg-white  ">
      <Sidebar />
      <div className="bg-brand2 rounded-tl-xl rounded-bl-xl min-h-screen w-full border border-gray-100">
        {" "}
        {children}
      </div>
    </div>
  );
};

export default layout;
