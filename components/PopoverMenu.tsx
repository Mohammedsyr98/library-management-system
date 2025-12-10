import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ReactNode } from "react";
import { AiOutlineCheck } from "react-icons/ai";

interface PopoverMenuProps<T> {
  trigger: ReactNode;
  value: T;
  options: T[];
  onUpdate: (value: T) => void;
}

export function PopoverMenu<T>({
  trigger,
  value,
  options,
  onUpdate,
}: PopoverMenuProps<T>) {
  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>

      <PopoverContent align="start" className="w-44 p-2">
        <div className="flex flex-col gap-1">
          {options.map((option) => {
            const isActive = value === option;

            return (
              <button
                key={String(option)}
                onClick={() => !isActive && onUpdate(option)}
                className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm
                  hover:bg-gray-100 transition
                  ${isActive ? "font-semibold" : "text-gray-700"}`}>
                {String(option)}

                {isActive && (
                  <AiOutlineCheck className="w-4 h-4 text-green-600 font-bold" />
                )}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
