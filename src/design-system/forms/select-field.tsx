import { UseFormRegisterReturn } from "react-hook-form";
import { FieldWrapper, FieldWrapperPassThroughProps } from "./field-wrapper";
import { cn } from "../utils/cn";

type Option = {
	label: React.ReactNode;
	value: string | number | string[];
};

type SelectFieldProps = FieldWrapperPassThroughProps & {
	options: Option[];
	className?: string;
	defaultValue?: string;
	registration: Partial<UseFormRegisterReturn>;
};

export const SelectField = (props: SelectFieldProps) => {
	const { label, options, error, className, defaultValue, registration } = props;
	return (
		<FieldWrapper label={label} error={error}>
			<select
				name="location"
				className={cn(
					"mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md",
					className,
				)}
				defaultValue={defaultValue}
				{...registration}
			>
				{options.map(({ label, value }) => (
					<option key={label?.toString()} value={value}>
						{label}
					</option>
				))}
			</select>
		</FieldWrapper>
	);
};
