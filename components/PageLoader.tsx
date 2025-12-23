"use client";
import { FallingLines } from "react-loader-spinner";

const PageLoader = ({
  textColor = "text-brand1",
  linesColor = "#25388c",
}: {
  textColor?: string;
  linesColor?: string;
}) => {
  return (
    <div
      className="w-full min-h-screen flex items-center justify-center"
      role="status"
      aria-live="polite">
      <div className="flex items-center gap-2">
        <FallingLines
          color={linesColor}
          width="100"
          visible
          ariaLabel="loading"
        />
        <p className={`${textColor} text-[28px] font-semibold`}>BookWise</p>
      </div>
    </div>
  );
};

export default PageLoader;
