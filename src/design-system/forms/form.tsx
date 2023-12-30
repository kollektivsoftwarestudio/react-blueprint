import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldValues,
  SubmitHandler,
  UseFormProps,
  UseFormReturn,
  useForm,
} from "react-hook-form";
import { ZodSchema } from "zod";
import { cn } from "../utils/cn";
import { FormError } from "./form-error";

type FormProps<TFormValues extends FieldValues> = {
  className?: string;
  onSubmit: SubmitHandler<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  options?: UseFormProps<TFormValues>;
  id?: string;
  schema?: ZodSchema<unknown>;
  errorMessage?: string;
};

export const Form = <
  TFormValues extends Record<string, unknown> = Record<string, unknown>
>({
  onSubmit,
  children,
  className,
  options,
  id,
  schema,
  errorMessage,
}: FormProps<TFormValues>) => {
  const methods = useForm<TFormValues>({
    ...options,
    resolver: schema && zodResolver(schema),
  });
  return (
    <form
      className={cn("space-y-6", className)}
      onSubmit={methods.handleSubmit(onSubmit)}
      id={id}
    >
      {errorMessage && <FormError error={errorMessage} />}
      {children(methods)}
    </form>
  );
};
