import { PencilIcon } from "@heroicons/react/20/solid";
import { z } from "zod";
import { useAuthenticatedUser } from "@/providers/authenticated-user-provider";
import { Button } from "@/design-system/forms/button";
import { Form } from "@/design-system/forms";
import { UpdateProfileDTO } from "@/services/api-client";
import { useUpdateProfile } from "../../hooks/use-update-profile";
import { FormDrawer } from "@/design-system/forms/form-drawer";
import { FormInputField } from "@/design-system/forms/input-field";
import { FormTextAreaField } from "@/design-system/forms/textarea-field";

const schema = z.object({
  email: z.string().min(1, "Required"),
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  bio: z.string(),
});

type FormKeys = keyof z.infer<typeof schema>;

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
        <Form
          id="update-profile"
          onSubmit={async (values) => {
            updateProfile(values, { onSuccess: close });
          }}
          defaultValues={{
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
            bio: user?.bio,
          }}
          schema={schema}
        >
          <FormInputField<FormKeys> label="First Name" name="firstName" />
          <FormInputField<FormKeys> label="Last Name" name="lastName" />
          <FormInputField<FormKeys> label="Email Address" type="email" name="email" />
          <FormTextAreaField<FormKeys> label="Bio" name="bio" />
        </Form>
      )}
    </FormDrawer>
  );
};
