import { z } from "zod";
import { Button } from "@/design-system/forms/button";
import { Form } from "@/design-system/forms";
import { AuthLayout } from "../components/auth-layout/auth-layout";
import { useAuth } from "@/providers/auth-provider";
import { AuthCard } from "../components/auth-card";
import { routes } from "@/routes/routes";
import { Link } from "@/design-system/navigation/link";
import { FormInputField } from "@/design-system/forms/input-field";

const schema = z.object({
  email: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
});

type FormKeys = keyof z.infer<typeof schema>;

type LoginProps = {
  onSuccess: () => void;
};

export const Login = ({ onSuccess }: LoginProps) => {
  const { login, isAuthenticating, loginError } = useAuth();

  return (
    <AuthLayout title="Log in to your account">
      <AuthCard>
        <Form
          onSubmit={async (values) => {
            await login(values);
            onSuccess();
          }}
          schema={schema}
          errorMessage={loginError}
        >
          <FormInputField<FormKeys> type="email" label="Email Address" name="email" />
          <FormInputField<FormKeys> type="password" label="Password" name="password" />
          <div>
            <Button isLoading={isAuthenticating} type="submit" className="w-full">
              Log in
            </Button>
          </div>
        </Form>
      </AuthCard>
      <p className="mt-10 text-center text-sm text-gray-500">
        Not a member? <Link href={routes.auth.register()}>Sign Up</Link>
      </p>
    </AuthLayout>
  );
};
