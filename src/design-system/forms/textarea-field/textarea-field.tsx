import { forwardRef } from "react";
import type { BaseFormProps } from "../types";
import { useFormControlProps } from "../hooks/use-form-control-props";
import { FormControl } from "../form-control";
import { BaseTextAreaField, BaseTextAreaFieldProps } from "./base-textarea-field";

export type TextAreaFieldProps = Omit<BaseTextAreaFieldProps, "name"> & BaseFormProps;

const _TextAreaField = (
  props: TextAreaFieldProps,
  ref: React.ForwardedRef<HTMLTextAreaElement>,
) => {
  const { formControlProps, errorAria, baseProps: textAreaFieldProps } = useFormControlProps(props);

  return (
    <FormControl {...formControlProps}>
      <BaseTextAreaField {...textAreaFieldProps} {...errorAria} ref={ref} />
    </FormControl>
  );
};

_TextAreaField.displayName = "Input";

export const TextAreaField = forwardRef(_TextAreaField);
