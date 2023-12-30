import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "../utils/cn";

const loadingIndicator = tv({
  base: "animate-spin",
  variants: {
    size: {
      sm: "h-4 w-4",
      md: "h-8 w-8",
      lg: "h-16 w-16",
      xl: "h-24 w-24",
    },
    variant: {
      light: "text-white",
      primary: "text-blue-600",
    },
  },
});

export type LoadingIndicatorProps = {
  size?: VariantProps<typeof loadingIndicator>["size"];
  variant?: VariantProps<typeof loadingIndicator>["variant"];
  className?: string;
};

export const LoadingIndicator = ({
  size = "md",
  variant = "primary",
  className = "",
}: LoadingIndicatorProps) => {
  return (
    <>
      <svg
        className={cn(loadingIndicator({ size, variant }), className)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        data-testid="loading"
      >
        <title>loading...</title>
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span className="sr-only">Loading</span>
    </>
  );
};
