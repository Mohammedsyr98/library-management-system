import PageHead from "@/components/dashboard/PageHead";
import { Suspense } from "react";

const AllUsers = () => {
  return (
    <div>
      <Suspense fallback={<div></div>}>
        {" "}
        <PageHead />
      </Suspense>
    </div>
  );
};

export default AllUsers;
