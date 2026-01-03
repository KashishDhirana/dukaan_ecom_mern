import { createServerFn, createServerOnlyFn } from "@tanstack/react-start";

const flag = createServerOnlyFn(() => {
	return Math.round(Math.random());
});

export const alertMessage = createServerFn({ method: "GET" }).handler(() => {
	const chance = flag();
	console.log(chance);
	return chance ? "This is serious alert" : null;
});
