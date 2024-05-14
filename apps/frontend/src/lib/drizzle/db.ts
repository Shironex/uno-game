import { drizzle } from 'drizzle-orm/postgres-js'
import { env } from "@/env.mjs"
import postgres from 'postgres';
import * as schema from './schema'

console.log(env.DATABASE_URL)

const queryClient = postgres(env.DATABASE_URL, {
  debug: env.NODE_ENV === 'development',
  max: 10,
});

export const db = drizzle(queryClient, {
  logger: env.NODE_ENV === 'development',
  schema,
})
