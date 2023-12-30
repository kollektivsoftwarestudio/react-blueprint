type AuthCardProps = {
  children: React.ReactNode;
};

export const AuthCard = ({ children }: AuthCardProps) => {
  return <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">{children}</div>;
};
