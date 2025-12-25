"use client";
import { useState } from "react";
import Image from "next/image";
import logo from "@/public/images/BlueBrandIcon.png";
import LogOutIcon from "@/public/images/signOut.png";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { navLinks } from "@/constants/constants";
import { Menu } from "lucide-react";

import { useGetCurrentUser, useSignOut } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ProfileInitials from "../ProfileInitials";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* MOBILE SIDEBAR */}
      <div className="lg:hidden absolute top-4 left-4 z-50">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="p-2 bg-white border rounded-md shadow-sm active:scale-95 transition-all">
              <Menu className="w-6 h-6 text-slate-700" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72">
            <SidebarContent closeMenu={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex flex-col w-72 sticky top-0 h-screen border-r bg-white">
        <SidebarContent />
      </aside>
    </>
  );
};

const SidebarContent = ({ closeMenu }: { closeMenu?: () => void }) => {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { data: userData } = useGetCurrentUser();
  const { mutate: signOut, isPending: isSigningOut } = useSignOut();

  const fullName = userData?.data?.full_name || "User";
  const email = userData?.data?.email || "";

  const handleSignOut = () => {
    signOut(undefined, {
      onSuccess: (data) => {
        showToast(data.message, "success");
        router.push("/");
        setTimeout(() => queryClient.clear(), 500);
      },
    });
  };

  return (
    <div className="flex flex-col justify-between h-full p-6">
      <div>
        <div className="flex items-center border-b border-dotted pb-6 mb-6">
          <Image src={logo} width={37} height={37} alt="Book-wise" />
          <p className="text-brand1 text-[28px] font-semibold ml-[5px]">
            BookWise
          </p>
        </div>

        <nav className="flex flex-col gap-2">
          {navLinks.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={closeMenu}
                className={`flex items-center gap-x-3 py-3 px-4 rounded-lg transition-all 
                  ${isActive ? "bg-brand1 text-white shadow-md" : "text-slate-600 hover:bg-brand1/10"}`}>
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto flex items-center border border-slate-100 rounded-full p-2 bg-slate-50/50">
        <ProfileInitials userFullName={fullName} />
        <div className="ml-3 flex-1 overflow-hidden">
          <p className="text-sm font-semibold truncate">{fullName}</p>
          <p className="text-xs text-slate-500 truncate">{email}</p>
        </div>
        <button
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="p-2 hover:bg-red-50 rounded-full transition-colors">
          <Image src={LogOutIcon} alt="logout" width={20} height={20} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
