import { useLink } from "react-aria";
import { cn } from "../../utils/cn";
import React, { HTMLAttributeAnchorTarget } from "react";

type LinkProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  target?: HTMLAttributeAnchorTarget;
};

export const Link = ({ className, children, ...props }: LinkProps) => {
  const ref = React.useRef<HTMLAnchorElement>(null);
  const { linkProps } = useLink(props, ref);

  return (
    <a
      {...linkProps}
      ref={ref}
      className={cn("text-blue-600 hover:text-blue-900 font-medium", className)}
    >
      {children}
    </a>
  );
};
