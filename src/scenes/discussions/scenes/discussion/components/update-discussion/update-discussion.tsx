import { Authorization } from "@/components/authorization";
import { Button } from "@/design-system/forms/button";
import { Form } from "@/design-system/forms";
import { ROLES } from "@/lib/authz/authz";
import { UpdateDiscussionDTO } from "@/services/conversations-api-client/types";
import { PencilIcon } from "@heroicons/react/20/solid";
import { z } from "zod";
import { useGetDiscussion } from "../../hooks/use-get-discussion";
import { useUpdateDiscussion } from "../../hooks/use-update-discussion";
import { FormDrawer } from "@/design-system/forms/form-drawer";
import { FormInputField } from "@/design-system/forms/input-field";
import { FormTextAreaField } from "@/design-system/forms/textarea-field";

type UpdateDiscussionProps = {
  discussionId: string;
};

const schema = z.object({
  title: z.string().min(1, "Required"),
  body: z.string().min(1, "Required"),
});

type FormKeys = keyof z.infer<typeof schema>;

export const UpdateDiscussion = ({ discussionId }: UpdateDiscussionProps) => {
  const { discussion } = useGetDiscussion({ discussionId });
  const { updateDiscussion, isPending } = useUpdateDiscussion();

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        triggerButton={
          <Button startIcon={<PencilIcon className="h-4 w-4" />} size="sm">
            Update Discussion
          </Button>
        }
        title="Update Discussion"
        submitButton={
          <Button form="update-discussion" type="submit" size="sm" isLoading={isPending}>
            Submit
          </Button>
        }
      >
        {({ close }) => (
          <Form
            id="update-discussion"
            onSubmit={async (values: z.infer<typeof schema>) => {
              await updateDiscussion({ ...values, discussionId });
              close();
            }}
            defaultValues={{
              title: discussion?.title,
              body: discussion?.body,
            }}
            schema={schema}
          >
            <FormInputField<FormKeys> label="Title" name="title" />
            <FormTextAreaField<FormKeys> label="Body" name="body" />
          </Form>
        )}
      </FormDrawer>
    </Authorization>
  );
};
