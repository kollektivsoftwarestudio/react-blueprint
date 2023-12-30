import { useControl } from "../hooks/use-control";
import { BaseFormProps } from "../types";
import { TextAreaField, TextAreaFieldProps } from "./textarea-field";

export type FormTextAreaFieldProps<TFieldKey extends string> = TextAreaFieldProps &
  Omit<BaseFormProps<TFieldKey>, "error">;

export const FormTextAreaField = <TFieldKey extends string>(
  props: FormTextAreaFieldProps<TFieldKey>,
) => {
  const { error, field } = useControl({ name: props.name });

  return (
    <TextAreaField
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
