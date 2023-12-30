import { ContentLayout } from "@/components/layouts/content-layout";
import { useAuthenticatedUser } from "@/providers/authenticated-user-provider";
import { Entry } from "./components/entry";
import { UpdateProfile } from "./components/update-profile";

export const Profile = () => {
  const { user } = useAuthenticatedUser();

  return (
    <ContentLayout title="Profile">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <div className="flex justify-between">
            <h3 className="text-lg leading-6 font-medium text-gray-900">User Information</h3>
            <UpdateProfile />
          </div>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details of the user.</p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <Entry label="First Name" value={user.firstName} />
            <Entry label="Last Name" value={user.lastName} />
            <Entry label="Email Address" value={user.email} />
            <Entry label="Role" value={user.role} />
            <Entry label="Bio" value={user.bio} />
          </dl>
        </div>
      </div>
    </ContentLayout>
  );
};
