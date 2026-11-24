import type { PrismaClient, Role, User } from '@prisma/client';

/** The fields needed to store a new user. The password is already hashed by the service. */
export interface CreateUserInput {
  username: string;
  email: string;
  passwordHash: string;
  /** Defaults to `learner` (database default) when omitted. */
  role?: Role;
}

export interface UserRepository {
  findByUsername(username: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(input: CreateUserInput): Promise<User>;
}

/**
 * Emails are compared and stored in one canonical form (trimmed, lower-cased), so
 * "Ada@Example.org" and "ada@example.org" are the same account.
 */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Data access for the `users` table. This is the only layer that talks to Prisma;
 * the returned rows include `passwordHash`, so services must map them to the public
 * `User` shape of the contract before anything is sent to a client.
 */
export function createUserRepository(prisma: Pick<PrismaClient, 'user'>): UserRepository {
  return {
    findByUsername(username) {
      return prisma.user.findUnique({ where: { username } });
    },

    findByEmail(email) {
      return prisma.user.findUnique({ where: { email: normalizeEmail(email) } });
    },

    create({ username, email, passwordHash, role }) {
      return prisma.user.create({
        data: { username, email: normalizeEmail(email), passwordHash, role },
      });
    },
  };
}
