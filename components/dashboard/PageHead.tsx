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

  const firstName = userData?.data?.full_name?.split(" ")[0] ?? "";

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = createQueryString("search", e.target.value);
    router.replace(`?${newQuery}`);
  };
  return (
    <div className="p-5 flex items-center justify-between">
      <div>
        <p className="text-2xl font-semibold">Welcome, {firstName}</p>
        <p className="text-[#8D8D8D]">
          Monitor all of your projects and tasks here
        </p>
      </div>
      <div className="flex items-center border border-[#CBD5E1] p-2 w-[400px]">
        <Image src={searchIcon} alt="search-icon" />{" "}
        <input
          onChange={handleSearchChange}
          placeholder="Search..."
          className="focus:outline-0 w-full pl-2"
          defaultValue={searchParams.get("search") ?? ""}
        />
      </div>
    </div>
  );
};

export default PageHead;
