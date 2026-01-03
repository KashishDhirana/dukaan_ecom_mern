import { mergeForm, useStore, useTransform } from "@tanstack/react-form-start";
import { createFileRoute } from "@tanstack/react-router";
import {
	formOpts,
	handleForm,
	useAppForm,
} from "@/features/auth/hooks/login.form";
import { LoginZodSchema } from "@/features/user/user.schema";
import { ServerErrorResponse } from "@/shared/components/formComponents";
import { Card } from "@/shared/components/ui/card";
import { TypographyLarge } from "@/shared/components/ui/typography";
import { Route as loginRoute } from "./route";
import { toast } from "sonner";

export const Route = createFileRoute("/_authLayout/(auth)/login/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { state } = loginRoute.useLoaderData();
	const form = useAppForm({
		...formOpts,
		transform: useTransform((baseForm) => mergeForm(baseForm, state), [state]),
		validators: {
			onBlur: LoginZodSchema,
			onSubmit: LoginZodSchema,
		},
	});

	const formErrors = useStore(form.store, (formState) => formState.errors);
	return (
		<Card className="m-8 container max-w-xl relative mx-auto shadow-none">
			<TypographyLarge className="text-center">
				Welcome back, Nice to have you back
			</TypographyLarge>
			<form
				action={handleForm.url}
				method="post"
				encType={"multipart/form-data"}
				className="px-8 grid gap-4"
			>
				{/*Errors after checking from server*/}
				{import.meta.env.DEV && <ServerErrorResponse formErrors={formErrors} />}

				<form.AppField name="email">
					{(field) => (
						<field.Input
							props={{
								label: "Email",
							}}
							inputProps={{ className: "shadow-none" }}
						/>
					)}
				</form.AppField>

				<form.AppField name="password">
					{(field) => (
						<field.Input
							inputProps={{
								type: "password",
								className: "shadow-none",
							}}
							props={{ label: "Password" }}
						/>
					)}
				</form.AppField>

				<div className="flex justify-end col-span-full">
					<form.AppForm>
						<form.SubscribeButton label="Submit" />
					</form.AppForm>
				</div>
			</form>
		</Card>
	);
}
