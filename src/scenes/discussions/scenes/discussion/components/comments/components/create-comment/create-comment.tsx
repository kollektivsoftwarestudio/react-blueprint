import { z } from "zod";
import { useCreateComment } from "../../hooks/use-create-comment";
import { Form, FormDrawer, TextAreaField } from "@/design-system/forms";
import { Button } from "@/design-system/forms/button";
import { PlusIcon } from "@heroicons/react/24/outline";
import { CreateCommentDTO } from "@/services/conversations-api-client/types";

const schema = z.object({
  body: z.string().min(1, "Required"),
});

type CreateCommentProps = {
  discussionId: string;
};

export const CreateComment = ({ discussionId }: CreateCommentProps) => {
  const { isPending, createComment } = useCreateComment({ discussionId });
  return (
    <>
      <FormDrawer
        triggerButton={
          <Button size="sm" startIcon={<PlusIcon className="h-4 w-4" />}>
            Create Comment
          </Button>
        }
        title="Create Comment"
        submitButton={
          <Button
            isLoading={isPending}
            form="create-comment"
            type="submit"
            size="sm"
            disabled={isPending}
          >
            Submit
          </Button>
        }
      >
        {({ close }) => (
          <Form<CreateCommentDTO>
            id="create-comment"
            onSubmit={async (values) => {
              await createComment({
                body: values.body,
                discussionId,
              });
              close();
            }}
            schema={schema}
          >
            {({ register, formState }) => (
              <TextAreaField
                label="Body"
                error={formState.errors.body}
                registration={register("body")}
              />
            )}
          </Form>
        )}
      </FormDrawer>
    </>
  );
};
