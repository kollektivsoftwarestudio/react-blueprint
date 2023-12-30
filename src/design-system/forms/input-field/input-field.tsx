import { forwardRef } from "react";
import type { BaseFormProps } from "../types";
import { BaseInputField, BaseInputFieldProps } from "./base-input-field";
import { useFormControlProps } from "../hooks/use-form-control-props";
import { FormControl } from "../form-control";

export type InputFieldProps = Omit<BaseInputFieldProps, "name"> & BaseFormProps;

const _InputField = (props: InputFieldProps, ref: React.ForwardedRef<HTMLInputElement>) => {
  const { formControlProps, errorAria, baseProps: inputFieldProps } = useFormControlProps(props);

  return (
    <FormControl {...formControlProps}>
      <BaseInputField {...inputFieldProps} {...errorAria} ref={ref} />
    </FormControl>
  );
};

_InputField.displayName = "Input";

export const InputField = forwardRef(_InputField);
