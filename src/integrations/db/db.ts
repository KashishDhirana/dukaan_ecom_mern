import { createServerOnlyFn } from "@tanstack/react-start";
import mongoose, { type Mongoose } from "mongoose";
import { env } from "@/utils/env";

/**
 * Global cache type
 */
type MongooseGlobalCache = {
	conn: Mongoose | null;
	promise: Promise<Mongoose> | null;
};

/**
 * Extend globalThis safely
 */
declare global {
	var __mongoose__: MongooseGlobalCache | undefined;
}

/**
 * Initialize cache
 */
const globalCache = globalThis.__mongoose__ ?? {
	conn: null,
	promise: null,
};

globalThis.__mongoose__ = globalCache;

/**
 * MongoDB connection (server-only)
 */
export const connectMongoose = createServerOnlyFn(
	async (): Promise<Mongoose> => {
		if (globalCache.conn) {
			return globalCache.conn;
		}

		if (!globalCache.promise) {
			globalCache.promise = mongoose
				.connect(env.MONGODB_URI, {
					autoIndex: process.env.NODE_ENV !== "production",
				})
				.then((m) => {
					console.log("[mongoose] Connected to MongoDB");
					return m;
				})
				.catch((err) => {
					globalCache.promise = null;
					console.error("[mongoose] MongoDB connection error:", err);
					throw err;
				});
		}

		globalCache.conn = await globalCache.promise;
		return globalCache.conn;
	},
);
