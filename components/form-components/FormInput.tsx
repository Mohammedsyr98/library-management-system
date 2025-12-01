import React, { useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  type?: string;
  placeholder?: string;
  control: Control<T>;
  errors?: FieldErrors<T>;
  className?: string;
}

function FormInput<T extends FieldValues>({
  name,
  label,
  type = "text",
  placeholder,
  control,
  errors,
  className,
}: FormInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className={`${className} mb-4 relative `}>
      {label && (
        <label className="block mb-2 font-medium text-[#D6E0FF]">{label}</label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type={inputType}
            placeholder={placeholder}
            className={`w-full  bg-[#232839] rounded px-5 py-4 focus:outline-none border ${
              errors && errors[name] ? "border-red-500 " : "border-transparent "
            }`}
          />
        )}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[50px] text-gray-500"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible size={20} />
          ) : (
            <AiOutlineEye size={20} />
          )}
        </button>
      )}
      {errors && errors[name] && (
        <p className="text-red-500 text-sm mt-1 absolute">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
}

export default FormInput;
