import { z } from "zod";

// Define the schema to validate the environment variables
const envSchema = z.object({
  API_URL: z.string(),
});

// Create an object to allow (potentially) mapping environment variables with different names
const mappedEnv = {
  API_URL: import.meta.env.VITE_API_URL,
};

const _env = envSchema.safeParse(mappedEnv);

if (!_env.success) {
  console.error(
    "❌ Invalid environment variables after mapping:",
    _env.error.format(),
  );
  // Log the mappedEnv for easier debugging of what Zod received
  console.error("Mapped environment data passed to Zod:", mappedEnv);
  process.exit(1);
}

export const env = _env.data;
