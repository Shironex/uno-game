import {
  boolean,
  index,
  integer,
  timestamp,
  varchar,
  pgTable,
  pgEnum
} from 'drizzle-orm/pg-core'

export const roleEnum = pgEnum('role', ['user', 'admin']);

export const users = pgTable(
  'users',
  {
    id: varchar('id', { length: 21 }).primaryKey(),
    email: varchar('email', { length: 255 }).unique().notNull(),
    name: varchar('name', { length: 255 }).unique().notNull(),
    emailVerified: boolean('email_verified').default(false).notNull(),
    hashedPassword: varchar('hashed_password', { length: 255 }),
    role: roleEnum('user').notNull(),
    avatar: varchar('avatar', { length: 255 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at'),
  },
  (t) => ({
    emailIdx: index('email_idx').on(t.email),
  })
)

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type SafeUser = Omit<
  User,
  'hashedPassword' | 'createdAt' | 'updatedAt' | 'emailVerified' | 'id'
>

export const sessions = pgTable(
  'sessions',
  {
    id: varchar('id', { length: 255 }).primaryKey(),
    userId: varchar('user_id', { length: 21 }).notNull(),
    expiresAt: timestamp('expires_at').notNull(),
  },
  (t) => ({
    userIdx: index('user_ses_idx').on(t.userId),
  })
)

export const emailVerificationCodes = pgTable(
  'email_verification_codes',
  {
    id: integer('id').primaryKey(),
    userId: varchar('user_id', { length: 21 }).unique().notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    code: varchar('code', { length: 8 }).notNull(),
    expiresAt: timestamp('expires_at').notNull(),
  },
  (t) => ({
    userIdx: index('user_idx').on(t.userId),
    emailIdx: index('email_ver_idx').on(t.email),
  })
)