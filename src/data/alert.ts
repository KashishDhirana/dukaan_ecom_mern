import { createServerFn, createServerOnlyFn } from "@tanstack/react-start";

const generateTrueFlag = createServerOnlyFn(() => {
  return Math.round(Math.random());
});

export const alertMessage = createServerFn().handler(() => {
  const chance = generateTrueFlag();
  console.log(chance);
  if (chance) {
    return "This is serious alert";
  }
  return null;
});
