import { useMemo } from "react";
import { BaseFormProps } from "../../types";

export const useFormControlProps = <T extends BaseFormProps>(props: T) => {
  const { name, error, label, isRequired, ...rest } = props;

  const errorId = useMemo(() => `${name}-error`, [name]);

  return {
    formControlProps: {
      name,
      error,
      label,
      isRequired,
    },
    errorAria: error
      ? {
          "aria-invalid": true,
          "aria-describedby": errorId,
        }
      : {},
    baseProps: {
      name,
      ...rest,
    },
  };
};
