import clsx from "clsx";
import { Oval } from "react-loader-spinner";

type ColorVariants = "lightOrange" | "blue";
export const Button = ({
  label,
  labelWhenPending,
  isPending,
  variant,
  ...props
}: {
  label: string;
  labelWhenPending?: string;
  isPending?: boolean;
  variant: ColorVariants;
}) => {
  const variantStyles = {
    lightOrange: clsx("bg-[#E7C9A5] text-black hover:bg-[#d4b08b]"),
    blue: clsx("bg-blue-600 text-white hover:bg-blue-700"),
  };
  return (
    <button
      {...props}
      type="submit"
      disabled={isPending}
      className={` ${
        variantStyles[variant]
      } w-full text-black h-14 rounded-[6px] font-bold mt-8 
              flex items-center justify-center gap-2
               transition-colors
              ${
                isPending ? "cursor-not-allowed opacity-70" : "cursor-pointer"
              }`}>
      {isPending ? (
        <Oval
          height={20}
          width={20}
          color="#4fa94d"
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      ) : null}
      {isPending ? (labelWhenPending ? labelWhenPending : label) : label}
    </button>
  );
};
