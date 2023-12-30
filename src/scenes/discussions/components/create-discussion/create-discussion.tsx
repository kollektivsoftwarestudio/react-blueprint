import { Button } from "@/design-system/forms/button";
import { Form, FormDrawer, InputField, TextAreaField } from "@/design-system/forms";
import { CreateDiscussionDTO } from "@/services/conversations-api-client";
import { PlusIcon } from "@heroicons/react/24/outline";
import { z } from "zod";
import { useCreateDiscussion } from "../../hooks/use-create-discussion";
import { Authorization } from "@/components/authorization";
import { ROLES } from "@/lib/authz/authz";

const schema = z.object({
  title: z.string().min(1, "Required"),
  body: z.string().min(1, "Required"),
});

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
          <Form<CreateDiscussionDTO>
            id="create-discussion"
            onSubmit={async (values) => {
              await createDiscussion(values);
              close();
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
