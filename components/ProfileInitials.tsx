import { User } from "lucide-react";

const ProfileInitials = ({ userFullName }: { userFullName: string }) => {
  const fullName = userFullName || "";
  const initials = fullName ? (
    fullName
      .split(" ")
      .map((n: string) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase()
  ) : (
    <User size={16} />
  );
  return (
    <div className="flex items-center justify-center min-h-9 min-w-9 rounded-full bg-[#acddee] font-semibold text-black ring-2 ring-white/5">
      {initials}
    </div>
  );
};

export default ProfileInitials;
