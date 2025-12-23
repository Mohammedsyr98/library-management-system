import Navbar from "@/components/website/Navbar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="background min-h-screen px-5 py-10 md:px-10 md:py-14 lg:px-24 lg:py-16">
      <Navbar />
      <main className="mt-10">{children}</main>
    </div>
  );
};

export default layout;
