import { Switch } from "@headlessui/react";
import { z } from "zod";
import { Form, InputField, SelectField } from "@/design-system/forms";
import { Button } from "@/design-system/forms/button";
import { useState } from "react";
import { useTeams } from "./hooks/use-teams";
import { useAuth } from "@/providers/auth-provider";
import { AuthLayout } from "../components/auth-layout";
import { AuthCard } from "../components/auth-card";
import { routes } from "@/routes/routes";
import { Link } from "@/design-system/navigation/link";

const schema = z
  .object({
    email: z.string().min(1, "Required"),
    firstName: z.string().min(1, "Required"),
    lastName: z.string().min(1, "Required"),
    password: z.string().min(1, "Required"),
  })
  .and(
    z
      .object({
        teamId: z.string().min(1, "Required"),
      })
      .or(z.object({ teamName: z.string().min(1, "Required") })),
  );

type RegisterValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  teamId?: string;
  teamName?: string;
};

type RegisterProps = {
  onSuccess: () => void;
};

export const Register = ({ onSuccess }: RegisterProps) => {
  const { register, isAuthenticating, registerError } = useAuth();
  const [chooseTeam, setChooseTeam] = useState(false);
  const { teams, isLoading } = useTeams();

  return (
    <AuthLayout title="Register an account">
      <AuthCard>
        <Form<RegisterValues>
          onSubmit={async (values) => {
            await register(values);
            onSuccess();
          }}
          schema={schema}
          errorMessage={registerError}
        >
          {({ register, formState }) => (
            <>
              <InputField
                type="text"
                label="First Name"
                error={formState.errors.firstName}
                registration={register("firstName")}
              />
              <InputField
                type="text"
                label="Last Name"
                error={formState.errors.lastName}
                registration={register("lastName")}
              />
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

              <Switch.Group>
                <div className="flex items-center">
                  <Switch
                    checked={chooseTeam}
                    onChange={setChooseTeam}
                    className={`${
                      chooseTeam ? "bg-blue-600" : "bg-gray-200"
                    } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  >
                    <span
                      className={`${
                        chooseTeam ? "translate-x-6" : "translate-x-1"
                      } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                    />
                  </Switch>
                  <Switch.Label className="ml-4">Join Existing Team</Switch.Label>
                </div>
              </Switch.Group>

              {chooseTeam && teams ? (
                <SelectField
                  label="Team"
                  error={formState.errors.teamId}
                  registration={register("teamId")}
                  options={teams?.map((team) => ({
                    label: team.name,
                    value: team.id,
                  }))}
                />
              ) : (
                <InputField
                  type="text"
                  label="Team Name"
                  error={formState.errors.teamName}
                  registration={register("teamName")}
                />
              )}
              <div>
                <Button isLoading={isAuthenticating} type="submit" className="w-full">
                  Register
                </Button>
              </div>
            </>
          )}
        </Form>
      </AuthCard>
      <p className="mt-10 text-center text-sm text-gray-500">
        Already a member? <Link href={routes.auth.login()}>Sign In</Link>
      </p>
    </AuthLayout>
  );
};
