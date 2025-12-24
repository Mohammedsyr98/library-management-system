"use client";
import { useRouter, useSearchParams } from "next/navigation";
import searchIcon from "@/public/images/searchIcon.png";
import Image from "next/image";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = createQueryString("search", e.target.value);
    router.replace(`?${newQuery}`);
  };

  return (
    <div className="flex items-center p-3 md:p-5 w-full max-w-[630px] bg-[#232839] rounded-[10px] mt-8 mx-auto">
      <div className="shrink-0 w-5 h-5 md:w-6 md:h-6 relative">
        <Image
          src={searchIcon}
          alt="search-icon"
          fill
          className="object-contain"
        />
      </div>
      <input
        onChange={handleSearchChange}
        placeholder="Search..."
        className="focus:outline-0 w-full pl-3 bg-transparent text-white placeholder:text-white/70 text-sm md:text-base"
        defaultValue={searchParams.get("search") ?? ""}
      />
    </div>
  );
};

export default SearchBar;
