import { cn } from "@/design-system/utils/cn";
import { ComponentProps, forwardRef } from "react";

type Option = {
  label: React.ReactNode;
  value: string | number | string[];
};

export type BaseSelectFieldProps = ComponentProps<"select"> & {
  className?: string;
  options: Option[];
};

const _BaseSelectField = (
  { className, options, ...props }: BaseSelectFieldProps,
  ref: React.ForwardedRef<HTMLSelectElement>,
) => {
  return (
    <select
      ref={ref}
      className={cn(
        "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6",
        className,
      )}
      {...props}
    >
      {options.map(({ label, value }) => (
        <option key={label?.toString()} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};

_BaseSelectField.displayName = "BaseSelectField";

export const BaseSelectField = forwardRef(_BaseSelectField);
