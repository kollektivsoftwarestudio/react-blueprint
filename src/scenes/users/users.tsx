import { ContentLayout } from "@/components/layouts/content-layout";
import { UsersList } from "./components/users-list";
import { ROLES } from "@/lib/authz/authz";
import { Authorization } from "@/components/authorization";

export const Users = () => {
  return (
    <ContentLayout title="Users">
      <div className="mt-4">
        <Authorization
          forbiddenFallback={<div>Only admins can view this.</div>}
          allowedRoles={[ROLES.ADMIN]}
        >
          <UsersList />
        </Authorization>
      </div>
    </ContentLayout>
  );
};
