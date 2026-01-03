import {
	createFormHook,
	createServerValidate,
	formOptions,
	getFormData,
	ServerValidateError,
} from "@tanstack/react-form-start";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { setResponseStatus } from "@tanstack/react-start/server";
import type { LoginZodType } from "@/features/user/types";
import { BaseUserModel } from "@/features/user/user.model";
import { LoginZodSchema } from "@/features/user/user.schema";
import { FormInput, SubscribeButton } from "../components/login.FormComponents";
import { fieldContext, formContext } from "./login.form-context";

export const formOpts = formOptions({
	defaultValues: {
		email: "",
		password: "",
	} satisfies LoginZodType,
});

const serverValidate = createServerValidate({
	...formOpts,
	onServerValidate: LoginZodSchema,
});

export const handleForm = createServerFn({ method: "POST" })
	.inputValidator((data) => {
		if (data instanceof FormData) {
			return data;
		}
		throw new Error("Invalid form data");
	})
	.handler(async ({ data }) => {
		try {
			const validateData = await serverValidate(data);
			console.log("Validate Data: ", validateData);
			const validUser = await BaseUserModel.find().byEmail(validateData.email);
			console.log(validUser || "No output");
			return redirect({
				to: "/",
				search: {
					success: true,
				},
			});
		} catch (e) {
			if (e instanceof ServerValidateError) {
				return e.response;
			}
			console.error("[Error]: ", e);
			setResponseStatus(500);
			return "There was an internal error";
		}
	});

export const getFormDataFromServer = createServerFn({
	method: "GET",
}).handler(async () => {
	return getFormData();
});

export const { useAppForm } = createFormHook({
	fieldComponents: {
		Input: FormInput,
	},
	formComponents: {
		SubscribeButton,
	},
	fieldContext,
	formContext,
});
