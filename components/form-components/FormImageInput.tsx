import { useToast } from "@/hooks/useToast";
import { Dispatch, ReactNode, SetStateAction, useCallback } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  useController,
} from "react-hook-form";

interface FormImageInputProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  control: Control<T>;
  errors?: FieldErrors<T>;
  className?: string;
  labelClassName?: string;
  uploadTrigger: ReactNode;
  setImagePreview: Dispatch<SetStateAction<string | null | undefined>>;
}
const FormImageInput = <T extends FieldValues>({
  name,
  label,
  control,
  errors,
  className,
  labelClassName,
  uploadTrigger,
  setImagePreview,
}: FormImageInputProps<T>) => {
  const { showToast } = useToast();
  const { field } = useController({ control, name });

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,

    accept: {
      "image/*": [],
    },
    onDropRejected: (fileRejections) => {
      fileRejections.forEach((rejection) => {
        rejection.errors.forEach((error) => {
          if (error.code === "file-invalid-type") {
            showToast("Please upload a valid image file.", "error");
          } else if (error.code === "file-too-large") {
            showToast(
              "Image is too large. Please upload a smaller one.",
              "error"
            );
          } else {
            showToast("Image upload failed. Please try again.", "error");
          }
        });
      });
    },
    onDropAccepted: (files) => {
      field.onChange(files[0]);

      setImagePreview(URL.createObjectURL(files[0]));
    },
  });
  return (
    <div className={`${className} mb-4 relative `}>
      {label && (
        <label
          className={`block mb-2 font-medium text-[#D6E0FF] ${labelClassName}`}>
          {label}
        </label>
      )}
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {uploadTrigger}
        {/* <img src={preview} /> */}
      </div>
      {errors && errors[name] && (
        <p className="text-red-500 text-sm mt-1 absolute">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default FormImageInput;
