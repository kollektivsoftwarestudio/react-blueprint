import { SelectField, SelectFieldProps } from "./select-field";
import { useControl } from "../hooks/use-control";
import { BaseFormProps } from "../types";

export type FormSelectFieldProps<TFieldKey extends string> = SelectFieldProps &
  Omit<BaseFormProps<TFieldKey>, "error">;

export const FormSelectField = <TFieldKey extends string>(
  props: FormSelectFieldProps<TFieldKey>,
) => {
  const { error, field } = useControl({ name: props.name });

  return (
    <SelectField
      {...props}
      error={error}
      {...field}
      onBlur={(e) => {
        field.onBlur();
        props.onBlur?.(e);
      }}
      value={field.value ?? ""}
      onChange={(e) => {
        field.onChange(e);
        props.onChange?.(e);
      }}
    />
  );
};
