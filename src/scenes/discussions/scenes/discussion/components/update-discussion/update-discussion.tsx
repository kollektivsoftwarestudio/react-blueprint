import { Authorization } from "@/components/authorization";
import { Button } from "@/design-system/forms/button";
import { Form, FormDrawer, InputField, TextAreaField } from "@/design-system/forms";
import { ROLES } from "@/lib/authz/authz";
import { UpdateDiscussionDTO } from "@/services/conversations-api-client/types";
import { PencilIcon } from "@heroicons/react/20/solid";
import { z } from "zod";
import { useGetDiscussion } from "../../hooks/use-get-discussion";
import { useUpdateDiscussion } from "../../hooks/use-update-discussion";

type UpdateDiscussionProps = {
  discussionId: string;
};

const schema = z.object({
  title: z.string().min(1, "Required"),
  body: z.string().min(1, "Required"),
});

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
          <Form<UpdateDiscussionDTO>
            id="update-discussion"
            onSubmit={async (values) => {
              await updateDiscussion({ ...values, discussionId });
              close();
            }}
            options={{
              defaultValues: {
                title: discussion?.title,
                body: discussion?.body,
              },
            }}
            schema={schema}
          >
            {({ register, formState }) => (
              <>
                <InputField
                  label="Title"
                  error={formState.errors.title}
                  registration={register("title")}
                />
                <TextAreaField
                  label="Body"
                  error={formState.errors.body}
                  registration={register("body")}
                />
              </>
            )}
          </Form>
        )}
      </FormDrawer>
    </Authorization>
  );
};
