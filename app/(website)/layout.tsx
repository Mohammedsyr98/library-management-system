import Navbar from "@/components/website/Navbar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="background min-h-screen ">
      <Navbar />
      <main className="mt-10 px-5 md:px-10 lg:px-24 py-10 md:py-14 lg:py-16">
        {children}
      </main>
    </div>
  );
};

export default layout;
