import { cn } from "@/design-system/utils/cn";
import { ComponentProps, forwardRef } from "react";

export type BaseInputFieldProps = ComponentProps<"input"> & {
  className?: string;
};

const _BaseInputField = (
  { className, ...props }: BaseInputFieldProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) => {
  return (
    <input
      ref={ref}
      className={cn(
        "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6",
        className,
      )}
      {...props}
    />
  );
};

_BaseInputField.displayName = "BaseInputField";

export const BaseInputField = forwardRef(_BaseInputField);
