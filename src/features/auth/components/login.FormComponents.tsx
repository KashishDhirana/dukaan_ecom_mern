import { Loader } from "lucide-react";
import type * as React from "react";
import { Button } from "@/shared/components/ui/button";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { useFieldContext, useFormContext } from "../hooks/login.form-context";

type FormControlProps = {
	label: string;
	description?: string;
};

type FormBaseProps = FormControlProps & {
	children: React.ReactNode;
	horizontal?: boolean;
	controlFirst?: boolean;
};

export const FormBase = ({
	label,
	description,
	children,
	controlFirst,
	horizontal,
}: FormBaseProps) => {
	const field = useFieldContext();
	const inValid = field.state.meta.isTouched && !field.state.meta.isValid;
	const labelElement = (
		<>
			<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
			<FieldDescription>{description}</FieldDescription>
		</>
	);
	const errorElement = inValid && (
		<FieldError>
			{field.state.meta.errors.map((err) => (
				<p key={err.code}>
					<em key={err.code}>* {err.message}</em>
				</p>
			))}
		</FieldError>
	);

	return (
		<Field
			aria-invalid={inValid}
			aria-orientation={horizontal ? "horizontal" : undefined}
		>
			{controlFirst ? (
				<>
					{children}
					<FieldContent>
						{labelElement}
						{errorElement}
					</FieldContent>
				</>
			) : (
				<>
					<FieldContent>{labelElement}</FieldContent>
					{children}
					{errorElement}
				</>
			)}
		</Field>
	);
};

export const FormInput = ({
	props,
	inputProps,
}: {
	props: FormControlProps;
	inputProps?: React.ComponentProps<typeof Input>;
}) => {
	const field = useFieldContext<string>();
	const inValid = field.state.meta.isTouched && !field.state.meta.isValid;

	return (
		<FormBase {...props}>
			<Input
				{...inputProps}
				id={field.name}
				name={field.name}
				value={field.state.value}
				onBlur={field.handleBlur}
				onChange={(e) => field.handleChange(e.target.value)}
				aria-invalid={inValid}
			/>
		</FormBase>
	);
};

export function SubscribeButton({ label }: { label: string }) {
	const form = useFormContext();
	return (
		<form.Subscribe selector={(state) => [state.isSubmitting]}>
			{([isSubmitting]) => (
				<Button
					type="submit"
					className="cursor-pointer"
					disabled={isSubmitting}
				>
					{isSubmitting ? <Loader className="animate-spin" /> : label}
				</Button>
			)}
		</form.Subscribe>
	);
}
