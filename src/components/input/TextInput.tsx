import { FC, ReactNode, useEffect } from "react";
import { useController } from "react-hook-form";
import type { Control } from "react-hook-form";
import cn from "clsx";

interface Props {
  name: string;
  label?: string;
  defaultValue?: string | number | string[];
  type?: "text" | "search" | "number" | "password" | "email" | "tel";
  className?: string;
  containerClassName?: string;
  loading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  autocomplete?: "on" | "off";
  control: Control<any>;
  maxLength?: number;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  requiredMark?: boolean;
  onChange?: any;
  required?: boolean | string;
}

const TextInput: FC<Props> = ({
  name,
  label,
  type,
  placeholder,
  className = "",
  containerClassName = "",
  disabled,
  loading,
  control,
  defaultValue,
  maxLength,
  autocomplete,
  leftElement,
  rightElement,
  onChange,
  requiredMark,
  required,
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: "",
    rules: { required: required },
  });

  useEffect(() => {
    if (defaultValue && defaultValue !== field.value)
      field.onChange(defaultValue);
  }, [defaultValue]);

  return (
    <div className={containerClassName}>
      {label && (
        <label
          htmlFor={name}
          className={cn("text-sm font-medium md:text-base", {
            'after:mr-1 after:text-red-600 after:content-["*"]': requiredMark,
          })}
        >
          {label}
        </label>
      )}
      {loading ? (
        <div>loading</div>
      ) : (
        <>
          <div className="relative mt-2">
            {leftElement && (
              <span
                className={`absolute inset-y-0 left-4 flex items-center justify-center ${
                  error?.message ? "text-rose-400" : ""
                }`}
              >
                {leftElement}
              </span>
            )}
            <input
              {...field}
              type={type}
              id={name}
              className={cn(
                "text-md w-full input placeholder:py-2",
                { "pl-12": leftElement },
                { "pr-12": rightElement },
                { "cursor-not-allowed input-disabled": disabled },
                { "input-error": error?.message },
                className
              )}
              disabled={disabled}
              placeholder={placeholder}
              maxLength={maxLength}
              autoComplete={autocomplete}
              {...(onChange ? (onChange = { onChange }) : "")}
            />
            {rightElement && (
              <span
                className={`absolute inset-y-0 right-4 inline-flex items-center ${
                  error?.message ? "text-rose-400" : ""
                }`}
              >
                {rightElement}
              </span>
            )}
          </div>
          {error?.message && (
            <span className="mt-2 ml-1 flex items-center text-xs font-medium tracking-wide text-red-500">
              {error?.message}
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default TextInput;
