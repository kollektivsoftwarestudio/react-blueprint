type ThProps = {
  children: React.ReactNode;
  isLast?: boolean;
  isFirst?: boolean;
};

export const Th = ({ children, isLast, isFirst }: ThProps) => {
  if (isFirst) {
    return (
      <th
        scope="col"
        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
      >
        {children}
      </th>
    );
  }

  if (isLast) {
    return (
      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
        {children}
      </th>
    );
  }
  return (
    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
      {children}
    </th>
  );
};
