"use client";
import { FallingLines } from "react-loader-spinner";

const PageLoader = () => {
  return (
    <div
      className="w-full min-h-screen flex items-center justify-center"
      role="status"
      aria-live="polite">
      <div className="flex items-center gap-2">
        <FallingLines color="#25388c" width="100" visible ariaLabel="loading" />
        <p className="text-brand1 text-[28px] font-semibold">BookWise</p>
      </div>
    </div>
  );
};

export default PageLoader;
