import clsx from "clsx";
import { Oval } from "react-loader-spinner";

type ColorVariants =
  | "lightOrange"
  | "blue"
  | "red"
  | "gray"
  | "brand1"
  | "white"
  | "green";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  labelWhenPending?: string;
  isPending?: boolean;
  prefixIcon?: React.ReactNode;
  variant: ColorVariants;
  height?: string;
}

export const Button = ({
  label,
  labelWhenPending,
  isPending,
  prefixIcon,
  variant,
  height,
  ...props
}: ButtonProps) => {
  const variantStyles = {
    lightOrange: clsx("bg-[#E7C9A5] text-black hover:bg-[#d4b08b]"),
    blue: clsx("bg-blue-600 text-white hover:bg-blue-700"),
    red: clsx("bg-brand5 text-white hover:bg-red-700"),
    gray: clsx("bg-gray-200 text-black hover:bg-gray-300"),
    brand1: clsx("bg-brand1 text-white hover:bg-[#1f2e70]"),
    white: clsx("bg-white text-black border border-gray-300 hover:bg-gray-100"),
    green: clsx("bg-[#4C7B62] text-white hover:bg-[#3f6652]"),
  };

  return (
    <button
      {...props}
      type="submit"
      disabled={props.disabled ?? isPending}
      className={clsx(
        variantStyles[variant],
        "w-full text-black rounded-[6px] font-bold mt-8 flex items-center justify-center gap-2 transition-colors",
        (props.disabled ?? isPending)
          ? "cursor-not-allowed! opacity-70"
          : "cursor-pointer",
        height ?? "h-14",
        props.className
      )}>
      {/* Prefix icon */}
      {prefixIcon && <span className="flex items-center">{prefixIcon}</span>}

      {/* Loader */}
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

      {isPending ? labelWhenPending || label : label}
    </button>
  );
};
