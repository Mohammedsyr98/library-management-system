import { X } from "lucide-react";
import Image from "next/image";
import React from "react";

interface FormImagePreviewProps {
  onRemove: () => void;
  src: string | null;
  containerClassName?: string;
}
const FormImagePreview = ({
  onRemove,
  src,
  containerClassName,
}: FormImagePreviewProps) => {
  return (
    <div
      className={`relative w-full mt-5 max-w-[120px] h-32 rounded-sm border overflow-hidden ${containerClassName}`}>
      {" "}
      {src && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-1 right-1 z-20 p-1 bg-white/80 hover:bg-white rounded-full shadow"
          aria-label="Remove image">
          <X className="size-4 text-red-600" />
        </button>
      )}
      {src ? (
        <Image
          src={src}
          alt="Book cover preview"
          fill
          className="object-contain p-1"
        />
      ) : (
        <p className="flex h-full items-center justify-center text-xs text-gray-500 text-center px-2">
          No image uploaded yet
        </p>
      )}
    </div>
  );
};

export default FormImagePreview;
