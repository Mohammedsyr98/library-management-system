import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="background">
      <div>nav</div>
      {children}
    </div>
  );
};

export default layout;
