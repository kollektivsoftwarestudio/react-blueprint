import { z } from "zod";
import { Button } from "@/design-system/forms/button";
import { Form, InputField } from "@/design-system/forms";
import { AuthLayout } from "../components/auth-layout/auth-layout";
import { useAuth } from "@/providers/auth-provider";
import { AuthCard } from "../components/auth-card";
import { routes } from "@/routes/routes";
import { Link } from "@/design-system/navigation/link";

const schema = z.object({
  email: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
});

type LoginValues = {
  email: string;
  password: string;
};

type LoginProps = {
  onSuccess: () => void;
};

export const Login = ({ onSuccess }: LoginProps) => {
  const { login, isAuthenticating, loginError } = useAuth();

  return (
    <AuthLayout title="Log in to your account">
      <AuthCard>
        <Form<LoginValues>
          onSubmit={async (values) => {
            await login(values);
            onSuccess();
          }}
          schema={schema}
          errorMessage={loginError}
        >
          {({ register, formState }) => (
            <>
              <InputField
                type="email"
                label="Email Address"
                error={formState.errors.email}
                registration={register("email")}
              />
              <InputField
                type="password"
                label="Password"
                error={formState.errors.password}
                registration={register("password")}
              />
              <div>
                <Button isLoading={isAuthenticating} type="submit" className="w-full">
                  Log in
                </Button>
              </div>
            </>
          )}
        </Form>
      </AuthCard>
      <p className="mt-10 text-center text-sm text-gray-500">
        Not a member? <Link href={routes.auth.register()}>Sign Up</Link>
      </p>
    </AuthLayout>
  );
};
