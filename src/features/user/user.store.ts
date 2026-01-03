import { Store } from "@tanstack/store";
import type { UserZodType } from "@/features/user/types";

type UserStoreType = Pick<
  UserZodType,
  "address" | "avatar" | "email" | "gender" | "name" | "permissions"
>;

export const userStore = new Store<UserStoreType>({
  address: undefined,
  avatar: undefined,
  email: "",
  gender: undefined,
  name: "",
  permissions: [],
});

// TODO: Setup proper cart store type with products and order models
export const userCartStore = new Store(0);
