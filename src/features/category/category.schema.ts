import { z } from "zod";
import { MongooseBaseDocZodSchema } from "@/utils/zod.utils";
// import type { Category } from "./category.types";

// INFO example of categories and it's subcategories
// export const RootCategories = [
//   { name: "Fashion", slug: "fashion" },
//   { name: "Electronics", slug: "electronics" },
//   { name: "Home & Living", slug: "home_living" },
//   {
//     name: "Beauty & Personal Care",
//     slug: "beauty_personal_care",
//   },
//   { name: "Grocery & Essentials", slug: "grocery_essentials" },
//   { name: "Sports & Fitness", slug: "sports_fitness" },
// ] satisfies Array<Omit<Category, "id">>;

// export const SubCategories = [
//   // Fashion
//   { name: "Men", slug: "fashion_men", parentSlug: "fashion" },
//   { name: "Women", slug: "fashion_women", parentSlug: "fashion" },
//   { name: "Kids", slug: "fashion_kids", parentSlug: "fashion" },

//   // Electronics
//   { name: "Mobiles", slug: "electronics_mobiles", parentSlug: "electronics" },
//   { name: "Laptops", slug: "electronics_laptops", parentSlug: "electronics" },
//   {
//     name: "Accessories",
//     slug: "electronics_accessories",
//     parentSlug: "electronics",
//   },

//   // Home & Living
//   { name: "Furniture", slug: "home_furniture", parentSlug: "home_living" },
//   { name: "Kitchen", slug: "home_kitchen", parentSlug: "home_living" },

//   // Beauty
//   {
//     name: "Skincare",
//     slug: "beauty_skincare",
//     parentSlug: "beauty_personal_care",
//   },
//   {
//     name: "Haircare",
//     slug: "beauty_haircare",
//     parentSlug: "beauty_personal_care",
//   },

//   // Grocery
//   {
//     name: "Staples",
//     slug: "grocery_staples",
//     parentSlug: "grocery_essentials",
//   },
//   { name: "Snacks", slug: "grocery_snacks", parentSlug: "grocery_essentials" },

//   // Sports
//   {
//     name: "Fitness Equipment",
//     slug: "sports_fitness_equipment",
//     parentSlug: "sports_fitness",
//   },
//   { name: "Outdoor", slug: "sports_outdoor", parentSlug: "sports_fitness" },
// ];

export const CategoryZodSchema = z.object({
  ...MongooseBaseDocZodSchema.shape,
  name: z.string().min(1, "Category name is required"),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:_[a-z0-9]+)*$/, {
      message: "Slug must be lowercase and underscore-separated",
    }),
  parentId: MongooseBaseDocZodSchema.shape.id,
});
