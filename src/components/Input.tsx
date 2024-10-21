import { clsx } from "clsx";
import { Field, FieldError } from "react-hook-form";
import { Typography } from "./Typography.tsx";

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
    <div className="font-pretendard flex flex-col gap-1">
      <input
        {...field}
        placeholder={placeholder ?? ""}
        disabled={disabled}
        className={clsx(
          "duration-200 text-xl border p-[10px] font-normal text-md placeholder-gray-500 outline-none hover:text-font hover:ring-[0.5px] hover:ring-solid border-solid",
          error?.message ? "border-bg-500" : "border-black",
          disabled ? "bg-bg-200 opacity-60 placeholder-gray-500" : "",
        )}
      />
      {error?.message && (
        <Typography variant="errorText" color="text-bg-500">
          {error?.message}
        </Typography>
      )}
    </div>
  );
};
