import { tv } from "tailwind-variants";
import { BaseFormProps } from "../types";

const formControlStyles = tv({
  slots: {
    container: "relative w-full block text-sm text-neutral-900 ",
    label: "font-medium",
    error: "flex items-start gap-1 text-sm text-error-300",
  },
});

export type FormControlProps = BaseFormProps & {
  children?: React.ReactNode;
};

export const FormControl = ({ name, error, label, children, isRequired }: FormControlProps) => {
  const {
    container: containerStyles,
    label: labelStyles,
    error: errorStyles,
  } = formControlStyles();

  return (
    <div className={containerStyles()}>
      {label && (
        <div>
          <label className={labelStyles()} htmlFor={name}>
            {label} {isRequired && <span className="text-error-300">*</span>}
          </label>
        </div>
      )}
      {children}
      {error && <div className={errorStyles()}>{error}</div>}
    </div>
  );
};
