import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldValues,
  FormProvider,
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
  children: ((methods: UseFormReturn<TFormValues>) => React.ReactNode) | React.ReactNode;
  options?: Omit<UseFormProps<TFormValues>, "defaultValues">;
  defaultValues?: UseFormProps<TFormValues>["defaultValues"];
  id?: string;
  schema?: ZodSchema<TFormValues>;
  errorMessage?: string;
};

export const Form = <TFormValues extends FieldValues>({
  onSubmit,
  children,
  className,
  options,
  defaultValues,
  id,
  schema,
  errorMessage,
}: FormProps<TFormValues>) => {
  const methods = useForm<TFormValues>({
    ...options,
    defaultValues,
    resolver: schema ? zodResolver(schema) : undefined,
  });

  return (
    <FormProvider {...methods}>
      <form
        className={cn("space-y-6", className)}
        onSubmit={methods.handleSubmit(onSubmit)}
        id={id}
      >
        {errorMessage && <FormError error={errorMessage} />}
        {typeof children === "function" ? children(methods) : children}
      </form>
    </FormProvider>
  );
};
