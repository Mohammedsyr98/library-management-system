"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useGetCurrentUser, useSignOut } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { LogOut, Menu, X } from "lucide-react";
import whiteLogo from "@/public/images/white-logo.svg";
import { useQueryClient } from "@tanstack/react-query";
import ProfileInitials from "../ProfileInitials";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const pathname = usePathname();
  const { showToast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: userData, isLoading } = useGetCurrentUser();
  const { mutate: signOut, isPending: isSigningOut } = useSignOut();

  // Scroll listener to toggle background
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fullName = userData?.data?.full_name || "";
  const firstName = fullName.split(" ")[0] || "";

  const handleSignOut = () => {
    signOut(undefined, {
      onSuccess: (data) => {
        showToast(data.message, "success");
        router.push("/");
        setTimeout(() => {
          queryClient.clear();
        }, 500);
      },
      onError: () => showToast(`Sign out failed`, "error"),
    });
  };

  const navLinks = [
    { name: "Home", href: "/home" },
    { name: "Search", href: "/search" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300  ${
        hasScrolled
          ? "py-3 bg-[#0F172A]/80 backdrop-blur-md border-b border-white/10 shadow-lg"
          : "py-5 bg-transparent border-b border-transparent"
      }`}>
      <div className="flex items-center justify-between px-5 md:px-10 lg:px-24">
        {/* Logo */}
        <Link href="/home" className="flex items-center gap-x-2 shrink-0">
          <Image
            src={whiteLogo}
            alt="Book-wise"
            width={40}
            height={32}
            priority
          />
          <p className="text-white text-2xl font-bold tracking-tight">
            BookWise
          </p>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-x-8">
          <ul className="flex items-center gap-x-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative py-1 text-sm transition-colors hover:text-[#EED1AC] ${
                    pathname === link.href
                      ? "text-[#EED1AC] font-semibold"
                      : "text-[#D6E0FF]"
                  }`}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {isLoading ? (
            <NavProfileSkeleton />
          ) : (
            <div className="flex items-center gap-x-4 border-l border-white/20 pl-8 transition-all duration-500 ease-in-out">
              <Link href="/profile" className="flex items-center gap-x-3 group">
                <ProfileInitials userFullName={fullName} />
                <p className="hidden lg:block text-white font-medium text-sm group-hover:text-[#EED1AC] transition-colors">
                  {firstName}
                </p>
              </Link>

              <button
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="p-2 hover:bg-red-500/10 rounded-full transition-all group shrink-0">
                <LogOut className={`size-5 text-red-500 ...`} />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#0F172A] border-b border-white/10 flex flex-col p-6 gap-6 md:hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-lg ${pathname === link.href ? "text-[#EED1AC]" : "text-white"}`}>
              {link.name}
            </Link>
          ))}
          <hr className="border-white/10" />
          <button
            onClick={handleSignOut}
            className="text-red-500 flex items-center gap-2 font-medium">
            <LogOut size={20} /> Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

const NavProfileSkeleton = () => (
  <div className="flex items-center gap-x-4 border-l border-white/20 pl-8 animate-pulse">
    <div className="flex items-center gap-x-3">
      {/* Circle for ProfileInitials */}
      <div className="size-9 rounded-full bg-white/50" />
      {/* Width for firstName */}
      <div className="hidden lg:block h-4 w-12 bg-white/50 rounded" />
    </div>
    {/* Logout Icon placeholder */}
    <div className="p-2">
      <div className="size-5 rounded-full bg-white/25" />
    </div>
  </div>
);
