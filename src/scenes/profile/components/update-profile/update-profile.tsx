import { PencilIcon } from "@heroicons/react/20/solid";
import { z } from "zod";
import { useAuthenticatedUser } from "@/providers/authenticated-user-provider";
import { Button } from "@/design-system/forms/button";
import { Form, FormDrawer, InputField, TextAreaField } from "@/design-system/forms";
import { UpdateProfileDTO } from "@/services/api-client";
import { useUpdateProfile } from "../../hooks/use-update-profile";

const schema = z.object({
  email: z.string().min(1, "Required"),
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  bio: z.string(),
});

export const UpdateProfile = () => {
  const { user } = useAuthenticatedUser();
  const { isPending, updateProfile } = useUpdateProfile();

  return (
    <FormDrawer
      triggerButton={
        <Button startIcon={<PencilIcon className="h-4 w-4" />} size="sm">
          Update Profile
        </Button>
      }
      title="Update Profile"
      submitButton={
        <Button form="update-profile" type="submit" size="sm" isLoading={isPending}>
          Submit
        </Button>
      }
    >
      {({ close }) => (
        <Form<UpdateProfileDTO>
          id="update-profile"
          onSubmit={async (values) => {
            updateProfile(values, { onSuccess: close });
          }}
          options={{
            defaultValues: {
              firstName: user?.firstName,
              lastName: user?.lastName,
              email: user?.email,
              bio: user?.bio,
            },
          }}
          schema={schema}
        >
          {({ register, formState }) => (
            <>
              <InputField
                label="First Name"
                error={formState.errors.firstName}
                registration={register("firstName")}
              />
              <InputField
                label="Last Name"
                error={formState.errors.lastName}
                registration={register("lastName")}
              />
              <InputField
                label="Email Address"
                type="email"
                error={formState.errors.email}
                registration={register("email")}
              />
              <TextAreaField
                label="Bio"
                error={formState.errors.bio}
                registration={register("bio")}
              />
            </>
          )}
        </Form>
      )}
    </FormDrawer>
  );
};
