import { env } from '@/env.mjs'
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle'
import { Lucia, TimeSpan } from 'lucia'
import { sessions, users, type User as DbUser } from '@/lib/drizzle/schema'
import { db } from '../../drizzle/db'

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users)

export const lucia = new Lucia(adapter, {
  getSessionAttributes: (/* attributes */) => {
    return {}
  },
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      email: attributes.email,
      name: attributes.name,
      emailVerified: attributes.emailVerified,
      avatar: attributes.avatar,
      role: attributes.role,
      createdAt: attributes.createdAt,
      updatedAt: attributes.updatedAt,
    }
  },
  sessionExpiresIn: new TimeSpan(30, 'd'),
  sessionCookie: {
    name: 'session',

    expires: false, // session cookies have very long lifespan (2 years)
    attributes: {
      secure: env.NODE_ENV === 'production',
      sameSite: env.NODE_ENV === 'production' ? 'strict' : 'lax',
    },
  },
})

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia
    DatabaseSessionAttributes: DatabaseSessionAttributes
    DatabaseUserAttributes: DatabaseUserAttributes
  }
}

interface DatabaseSessionAttributes {}
interface DatabaseUserAttributes extends Omit<DbUser, 'hashedPassword'> {}
