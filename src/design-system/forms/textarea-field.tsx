import { UseFormRegisterReturn } from "react-hook-form";
import { cn } from "../utils/cn";
import { FieldWrapper, FieldWrapperPassThroughProps } from "./field-wrapper";

type TextAreaFieldProps = FieldWrapperPassThroughProps & {
  className?: string;
  registration: Partial<UseFormRegisterReturn>;
};

export const TextAreaField = (props: TextAreaFieldProps) => {
  const { label, className, registration, error } = props;
  return (
    <FieldWrapper label={label} error={error}>
      <textarea
        className={cn(
          "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",
          className,
        )}
        {...registration}
      />
    </FieldWrapper>
  );
};
