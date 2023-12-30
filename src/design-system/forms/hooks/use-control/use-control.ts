import {
  ControllerRenderProps,
  FieldValues,
  useController,
  useFormContext,
} from "react-hook-form";

interface IReturn {
  error: string | undefined;
  field: ControllerRenderProps<FieldValues, string>;
}

interface IProps {
  name: string;
}

export const useControl = ({ name }: IProps): IReturn => {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({ control, name });

  return { error: error?.message, field };
};
