import createDOMPurify from "dompurify";
import { parse } from "marked";

const DOMPurify = createDOMPurify(window);

export type MDPreviewProps = {
  value: string;
};

export const MDPreview = ({ value = "" }: MDPreviewProps) => {
  return (
    <div
      className="p-2 w-full prose prose-indigo"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(parse(value).toString()),
      }}
    />
  );
};
