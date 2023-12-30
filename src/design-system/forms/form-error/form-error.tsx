import { XCircleIcon } from "@heroicons/react/24/outline";

export const FormError = ({ error }: { error: string }) => {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon
            className="h-5 w-5 stroke-2 text-red-700"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            Something went wrong
          </h3>
          <div className="mt-2 text-sm text-red-700">{error}</div>
        </div>
      </div>
    </div>
  );
};
