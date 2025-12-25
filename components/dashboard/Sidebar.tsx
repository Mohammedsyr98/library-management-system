"use client";
import Image from "next/image";
import logo from "@/public/images/BlueBrandIcon.png";
import LogOutIcon from "@/public/images/signOut.png";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { navLinks } from "@/constants/constants";

import { useGetCurrentUser, useSignOut } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { showToast } = useToast();

  const { data: userData } = useGetCurrentUser();
  const { mutate: signOut, isPending: isSigningOut } = useSignOut();

  const fullName = userData?.data?.full_name || "";
  const email = userData?.data?.email || "";
  const initials = fullName
    ? fullName
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
    : "";

  const handleSignOut = () => {
    signOut(undefined, {
      onSuccess: (data) => {
        showToast(data.message, "success");
        router.push("/");
        setTimeout(() => {
          queryClient.clear();
        }, 500);
      },
      onError: () => {
        showToast(`Sign out failed`, "error");
      },
    });
  };
  return (
    <div className="flex flex-col justify-between w-1/5 p-4 min-h-screen">
      <div>
        {/* Logo */}
        <div className="flex items-center border-b border-dotted pb-6 mb-3">
          <Image src={logo} width={37} height={37} alt="Book-wise" />
          <p className="text-brand1 text-[28px] font-semibold ml-[5px]">
            BookWise
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-1">
          {navLinks.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`
                  flex items-center gap-x-2.5 py-3.5 px-3 rounded-lg transition-all 
                  ${isActive ? "bg-brand1 text-white" : "text-black hover:bg-brand1/10"}
                `}>
                <Icon
                  className={`${isActive ? "text-white" : "text-black"} w-5 h-5`}
                />
                <p className={`text-[16px] font-medium`}>{item.label}</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Account Info & Logout */}
      <div className="mt-6 flex items-center border border-[#EDF1F1] rounded-[62px] p-2">
        <div className="border rounded-[7px] w-max p-1 font-semibold text-green-600">
          {initials}
        </div>
        <div className="ml-2.5 flex-1 overflow-hidden">
          <p className="truncate">{fullName}</p>
          <p className="text-[14px] text-[#8D8D8D] truncate">{email}</p>
        </div>
        <Image
          src={LogOutIcon}
          className={`cursor-pointer ${isSigningOut ? "opacity-50 pointer-events-none" : ""}`}
          alt="log-out"
          width={24}
          height={24}
          onClick={handleSignOut}
        />
      </div>
    </div>
  );
};

export default Sidebar;
