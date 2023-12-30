import { forwardRef } from "react";
import type { BaseFormProps } from "../types";
import { BaseSelectField, BaseSelectFieldProps } from "./base-select-field";
import { useFormControlProps } from "../hooks/use-form-control-props";
import { FormControl } from "../form-control";

export type SelectFieldProps = Omit<BaseSelectFieldProps, "name"> & BaseFormProps;

const _SelectField = (props: SelectFieldProps, ref: React.ForwardedRef<HTMLSelectElement>) => {
  const { formControlProps, errorAria, baseProps: selectFieldProps } = useFormControlProps(props);

  return (
    <FormControl {...formControlProps}>
      <BaseSelectField {...selectFieldProps} {...errorAria} ref={ref} />
    </FormControl>
  );
};

_SelectField.displayName = "Input";

export const SelectField = forwardRef(_SelectField);
