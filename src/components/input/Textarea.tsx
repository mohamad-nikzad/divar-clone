import clsx from "clsx";
import { FC } from "react";
import { Control, useController } from "react-hook-form";

interface Props {
  name: string;
  control: Control<any>;
  label?: string;
  placeholder?: string;
  className?: string;
  containerClassName?: string;
  rows?: number;
  required?: boolean | string;
  requiredMark?: boolean;
  defaultValue?: any;
}

const Textarea: FC<Props> = ({
  name,
  control,
  label,
  placeholder,
  className,
  containerClassName,
  rows,
  required,
  requiredMark,
  defaultValue,
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: defaultValue,
    rules: { required: required },
  });

  return (
    <div className={clsx("form-control mt-2", containerClassName)}>
      {label && (
        <label htmlFor="address" className="label">
          <span
            className={clsx("text-sm font-medium md:text-base", {
              'after:mr-1 after:text-red-600 after:content-["*"]': requiredMark,
            })}
          >
            {label}
          </span>
        </label>
      )}
      <textarea
        {...field}
        placeholder={placeholder}
        rows={rows}
        name="address"
        className={clsx(
          "textarea textarea-bordered w-full placeholder:text-xs placeholder:text-salte-400",
          {
            "textarea-error": !!error,
          },
          className
        )}
      />
      {!!error && (
        <span className="mt-2 ml-1 flex items-center text-xs font-medium tracking-wide text-red-500">
          {error.message}
        </span>
      )}
    </div>
  );
};

export default Textarea;
