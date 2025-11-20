import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div>nav</div>
      {children}
    </div>
  );
};

export default layout;
