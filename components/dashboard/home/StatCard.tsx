const StatCard = ({ title, count }: { title: string; count: number }) => {
  return (
    <div className="bg-white p-5 rounded-[14px] w-full">
      <p className="text-[16px] text-[#64748B]">{title}</p>
      <p className="text-[28px] font-semibold text-[#1E293B]">{count}</p>
    </div>
  );
};

export default StatCard;
