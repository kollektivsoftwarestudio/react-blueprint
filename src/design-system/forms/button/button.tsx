import * as React from "react";
import { cn } from "../../utils/cn";
import { LoadingIndicator } from "../../loading-indicator";
import { VariantProps, tv } from "tailwind-variants";

const button = tv({
  base: "flex justify-center items-center border border-gray-300 disabled:opacity-70 disabled:cursor-not-allowed rounded-md shadow-sm font-medium focus:outline-none hover:opacity-80",
  variants: {
    variant: {
      primary: "bg-blue-700 text-white",
      inverse: "bg-white text-blue-700",
      danger: "bg-red-600 text-white",
    },
    size: {
      sm: "py-1.5 px-2.5 text-sm",
      md: "py-2 px-3 text-md",
      lg: "py-2.5 px-3.5 text-lg",
    },
  },
});

type IconProps =
  | { startIcon: React.ReactElement; endIcon?: never }
  | { endIcon: React.ReactElement; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined };

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: VariantProps<typeof button>["size"];
  variant?: VariantProps<typeof button>["variant"];
  isLoading?: boolean;
} & IconProps;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			type = "button",
			className = "",
			variant = "primary",
			size = "md",
			isLoading = false,
			startIcon,
			endIcon,
			...props
		},
		ref,
	) => {
		return (
			<button
				ref={ref}
				type={type}
				className={cn(
					button({size, variant}), className)	
				}
				{...props}
			>
				{isLoading && <LoadingIndicator size="sm" className="text-current" />}
				{!isLoading && startIcon}
				<span className="mx-2">{props.children}</span> {!isLoading && endIcon}
			</button>
		);
	},
);

Button.displayName = "Button";
