import Link from "next/link";
import ViewAllButton from "./ViewAllButton";

interface SectionHeaderProps {
  title: string;
  href: string;
}

const SectionHeader = ({ title, href }: SectionHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <p className="text-[20px] font-semibold text-[#1E293B]">{title}</p>
      <Link href={href}>
        <ViewAllButton />
      </Link>
    </div>
  );
};

export default SectionHeader;
