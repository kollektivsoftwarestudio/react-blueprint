import { Helmet } from "react-helmet-async";

type HeadProps = {
  title?: string;
  description?: string;
};

export const Head = ({ title = "", description = "" }: HeadProps = {}) => {
  return (
    <Helmet
      title={title ? `${title} | react-blueprint` : undefined}
      defaultTitle="react-blueprint"
    >
      <meta name="description" content={description} />
    </Helmet>
  );
};
