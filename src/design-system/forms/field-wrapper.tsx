import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { cn } from "../utils/cn";

type FieldWrapperProps = {
  label?: string;
  className?: string;
  children: React.ReactNode;
  // biome-ignore lint/suspicious/noExplicitAny: TODO: we just want the message as string, we don t need fielderror
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  description?: string;
};

export type FieldWrapperPassThroughProps = Omit<FieldWrapperProps, "className" | "children">;

export const FieldWrapper = (props: FieldWrapperProps) => {
  const { label, className, error, children } = props;
  return (
    <div>
      <label className={cn("block text-sm font-medium text-gray-700", className)}>
        {label}
        <div className="mt-1">{children}</div>
      </label>
      {error?.message && (
        <div
          role="alert"
          aria-label={error.message as string}
          className="text-sm font-semibold text-red-500"
        >
          {error.message as string}
        </div>
      )}
    </div>
  );
};
