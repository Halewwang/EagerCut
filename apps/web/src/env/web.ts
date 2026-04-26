import { z } from "zod";

const webEnvSchema = z.object({
	// Node
	NODE_ENV: z.enum(["development", "production", "test"]),
	ANALYZE: z.string().optional(),
	NEXT_RUNTIME: z.enum(["nodejs", "edge"]).optional(),

	// Public
	NEXT_PUBLIC_SITE_URL: z.url().default("http://localhost:3000"),
	NEXT_PUBLIC_MARBLE_API_URL: z.url().default("https://api.marblecms.com"),

	// Server
	DATABASE_URL: z
		.string()
		.refine(
			(url) =>
				url.startsWith("postgres://") || url.startsWith("postgresql://"),
			"DATABASE_URL must be a postgres:// or postgresql:// URL",
		)
		.default("postgresql://opencut:opencut@localhost:5432/opencut"),
	BETTER_AUTH_SECRET: z
		.string()
		.default("build-time-secret-build-time-secret"),
	UPSTASH_REDIS_REST_URL: z.url().default("http://localhost:8079"),
	UPSTASH_REDIS_REST_TOKEN: z.string().default("example_token"),
	MARBLE_WORKSPACE_KEY: z.string().default("cmd4iw9mm0006l804kwqv0k46"),
	FREESOUND_CLIENT_ID: z.string().optional(),
	FREESOUND_API_KEY: z.string().optional(),
	CLOUDFLARE_ACCOUNT_ID: z.string().optional(),
	R2_ACCESS_KEY_ID: z.string().optional(),
	R2_SECRET_ACCESS_KEY: z.string().optional(),
	R2_BUCKET_NAME: z.string().optional(),
	MODAL_TRANSCRIPTION_URL: z.url().optional(),
});

export type WebEnv = z.infer<typeof webEnvSchema>;

export const webEnv = webEnvSchema.parse(process.env);
