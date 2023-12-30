import { Button } from "@/design-system/forms/button";
import { Form } from "@/design-system/forms";
import { PlusIcon } from "@heroicons/react/24/outline";
import { z } from "zod";
import { useCreateDiscussion } from "../../hooks/use-create-discussion";
import { Authorization } from "@/components/authorization";
import { ROLES } from "@/lib/authz/authz";
import { FormInputField } from "@/design-system/forms/input-field";
import { FormTextAreaField } from "@/design-system/forms/textarea-field";
import { FormDrawer } from "@/design-system/forms/form-drawer";

const schema = z.object({
  title: z.string().min(1, "Required"),
  body: z.string().min(1, "Required"),
});

type FormKeys = keyof z.infer<typeof schema>;

export const CreateDiscussion = () => {
  const { createDiscussion, isPending } = useCreateDiscussion();

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        triggerButton={
          <Button size="sm" startIcon={<PlusIcon className="h-4 w-4" />}>
            Create Discussion
          </Button>
        }
        title="Create Discussion"
        submitButton={
          <Button form="create-discussion" type="submit" size="sm" isLoading={isPending}>
            Submit
          </Button>
        }
      >
        {({ close }) => (
          <Form
            id="create-discussion"
            defaultValues={{ title: "", body: "" }}
            onSubmit={async (values) => {
              await createDiscussion(values);
              close();
            }}
            schema={schema}
          >
            <FormInputField<FormKeys> name="title" label="Title" />
            <FormTextAreaField<FormKeys> label="Body" name="body" />
          </Form>
        )}
      </FormDrawer>
    </Authorization>
  );
};
