import { InputField, InputFieldProps } from "./input-field";
import { useControl } from "../hooks/use-control";
import { BaseFormProps } from "../types";

export type FormInputFieldProps<TFieldKey extends string> = InputFieldProps &
  Omit<BaseFormProps<TFieldKey>, "error">;

export const FormInputField = <TFieldKey extends string>(props: FormInputFieldProps<TFieldKey>) => {
  const { error, field } = useControl({ name: props.name });

  return (
    <InputField
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
