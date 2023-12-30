type TdProps = {
  children: React.ReactNode;
  isLast?: boolean;
  isFirst?: boolean;
};

export const Td = ({ children, isLast, isFirst }: TdProps) => {
  if (isFirst) {
    return (
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
        {children}
      </td>
    );
  }

  if (isLast) {
    return (
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
        {children}
      </td>
    );
  }
  return <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{children}</td>;
};
