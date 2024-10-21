import { clsx } from "clsx";
import { Field, FieldError } from "react-hook-form";

interface InputProps {
  field: Field;
  error: FieldError;
  placeholder?: string;
  disabled?: boolean;
}

export const Input = ({
  field,
  error,
  placeholder,
  disabled = false,
}: InputProps) => {
  return (
    <input
      {...field}
      placeholder={placeholder ?? ""}
      disabled={disabled}
      className={clsx(
        "font-pretendard text-xl border p-[10px] font-normal text-md placeholder-gray-500 outline-none hover:text-font hover:ring-[0.5px] hover:ring-solid border-solid",
        error?.message ? "border-red-500" : "border-black",
        disabled ? "bg-bg-200 opacity-60 placeholder-gray-500" : "",
      )}
    />
  );
};
