import BookIcon from "@/public/tsx-icons/BookIcon";
import BorrowRequestIcon from "@/public/tsx-icons/BorrowRequestIcon";
import HomeIcon from "@/public/tsx-icons/HomeIcon";
import PersonIcon from "@/public/tsx-icons/PersonIcon";
import UsersIcon from "@/public/tsx-icons/UsersIcon";
import { Database } from "@/type/database.types";

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
    path: "/dashboard/books",
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

export const ROLES = ["ADMIN", "USER"] as Database["public"]["Enums"]["role"][];
export const BORROW_STATUS_LABELS: Record<
  Database["public"]["Enums"]["borrow_status_enum"],
  string
> = {
  borrowed: "Borrowed",
  returned: "Returned",
  late_return: "Late return",
};
export const BORROW_STATUS_BY_LABEL: Record<
  string,
  Database["public"]["Enums"]["borrow_status_enum"]
> = Object.fromEntries(
  Object.entries(BORROW_STATUS_LABELS).map(([k, v]) => [v, k])
) as Record<string, Database["public"]["Enums"]["borrow_status_enum"]>;
