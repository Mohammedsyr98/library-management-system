import BookIcon from "@/public/tsx-icons/BookIcon";
import BorrowRequestIcon from "@/public/tsx-icons/BorrowRequestIcon";
import HomeIcon from "@/public/tsx-icons/HomeIcon";
import PersonIcon from "@/public/tsx-icons/PersonIcon";
import UsersIcon from "@/public/tsx-icons/UsersIcon";

export const navLinks = [
  {
    label: "Home",
    icon: HomeIcon,
    path: "/dashboard/home",
  },
  {
    label: "All Users",
    icon: UsersIcon,
    path: "/dashboard/all-users",
  },
  {
    label: "All Books",
    icon: BookIcon,
    path: "/dashboard/all-books",
  },
  {
    label: "Borrow Requests",
    icon: BorrowRequestIcon,
    path: "/dashboard/borrow-requests",
  },
  {
    label: "Account Requests",
    icon: PersonIcon,
    path: "/dashboard/account-requests",
  },
];
