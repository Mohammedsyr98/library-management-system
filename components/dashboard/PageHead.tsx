"use client";
import Image from "next/image";
import searchIcon from "@/public/images/searchIcon.png";
import { useGetCurrentUser } from "@/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const PageHead = () => {
  const { data: userData } = useGetCurrentUser();
  const searchParams = useSearchParams();
  const router = useRouter();

  const firstName = userData?.data?.full_name?.split(" ")[0] ?? "User";

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(name, value);
      else params.delete(name); // Clean up URL if search is empty
      return params.toString();
    },
    [searchParams]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = createQueryString("search", e.target.value);
    router.replace(`?${newQuery}`, { scroll: false });
  };

  return (
    <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 pt-16 md:pt-5">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold">
          Welcome, {firstName}
        </h1>
        <p className="text-sm md:text-base text-[#8D8D8D]">
          Everything you need to stay on top of your work.
        </p>
      </div>
      <div className="flex items-center border border-[#CBD5E1] p-2 w-full md:w-[300px] lg:w-[400px] bg-white rounded-md">
        <Image src={searchIcon} alt="search-icon" width={20} height={20} />
        <input
          onChange={handleSearchChange}
          placeholder="Search..."
          className="focus:outline-0 w-full pl-2 bg-transparent text-sm"
          defaultValue={searchParams.get("search") ?? ""}
        />
      </div>
    </div>
  );
};

export default PageHead;
