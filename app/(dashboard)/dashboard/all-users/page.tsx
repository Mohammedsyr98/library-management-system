import PageHead from "@/components/dashboard/PageHead";
import UsersDataTable from "@/components/dashboard/users/UsersDataTable";
import { Suspense } from "react";

const AllUsers = () => {
  const data: IUsers[] = [
    {
      id: "01254",
      fullName: "Mohamed Ali",
      email: "mohamed.ali@example.com",
      created_at: "2024-11-01T10:23:00Z",
      role: "ADMIN",
      books_borrowed: [
        { title: "Clean Code", borrowed_at: "2024-11-10" },
        { title: "JavaScript: The Good Parts", borrowed_at: "2024-11-15" },
      ],
      university_id: 101,
    },
    {
      id: "013254",
      fullName: "Sara Ibrahim",
      email: "sara.ibrahim@example.com",
      created_at: "2024-10-20T09:10:00Z",
      role: "USER",
      books_borrowed: [],
      university_id: 102,
    },
    {
      id: "01tg254",
      fullName: "John Carter",
      email: "john.carter@example.com",
      created_at: "2024-09-28T14:55:00Z",
      role: "USER",
      books_borrowed: [{ title: "React Handbook", borrowed_at: "2024-10-02" }],
      university_id: 101,
    },
    {
      id: "01tg5554",
      fullName: "Lina Osman",
      email: "lina.osman@example.com",
      created_at: "2024-12-01T08:45:00Z",
      role: "ADMIN",
      books_borrowed: [],
      university_id: 103,
    },
  ];

  return (
    <div>
      <Suspense fallback={<div></div>}>
        <PageHead />
      </Suspense>
      <div className="bg-white mx-6 p-5 rounded-[14px] mt-10">
        <p className="text-[20px] font-semibold text-[#1E293B] mb-[23px]">
          All Users
        </p>
        <UsersDataTable data={data} />
      </div>
    </div>
  );
};

export default AllUsers;
