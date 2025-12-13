import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";

interface FormTextareaProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  type?: string;
  placeholder?: string;
  control: Control<T>;
  errors?: FieldErrors<T>;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
}

function FormTextarea<T extends FieldValues>({
  name,
  label,
  placeholder,
  control,
  errors,
  className,
  inputClassName,
  labelClassName,
}: FormTextareaProps<T>) {
  return (
    <div className={`${className} mb-4 relative `}>
      {label && (
        <label
          className={`block mb-2 font-medium text-[#D6E0FF] ${labelClassName}`}>
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <textarea
            {...field}
            placeholder={placeholder}
            className={`w-full bg-[#232839] rounded px-5 py-4 focus:outline-none border ${
              errors && errors[name]
                ? "border-red-500! "
                : "border-transparent "
            } ${inputClassName}`}
          />
        )}
      />
      {errors && errors[name] && (
        <p className="text-red-500 text-sm mt-1 absolute">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
}

export default FormTextarea;
