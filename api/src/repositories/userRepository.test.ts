import type { PrismaClient, User } from '@prisma/client';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createUserRepository, normalizeEmail } from './userRepository.js';

const storedUser: User = {
  id: '3f2b8c1e-6d4a-4b7e-9c1f-2a5d8e7b6c4d',
  username: 'ada',
  email: 'ada@example.org',
  passwordHash: '$argon2id$v=19$m=19456,t=2,p=1$c2FsdA$aGFzaA',
  role: 'learner',
  createdAt: new Date('2026-11-15T10:00:00.000Z'),
  updatedAt: new Date('2026-11-15T10:00:00.000Z'),
};

const findUnique = vi.fn();
const create = vi.fn();
// Only the calls the repository makes are mocked; no database is involved.
const prisma = { user: { findUnique, create } } as unknown as Pick<PrismaClient, 'user'>;
const repository = createUserRepository(prisma);

beforeEach(() => {
  findUnique.mockReset();
  create.mockReset();
});

describe('normalizeEmail', () => {
  it('trims and lower-cases the address', () => {
    expect(normalizeEmail('  Ada@Example.ORG ')).toBe('ada@example.org');
  });
});

describe('userRepository.findByUsername', () => {
  it('looks the user up by the exact username', async () => {
    findUnique.mockResolvedValue(storedUser);

    await expect(repository.findByUsername('ada')).resolves.toEqual(storedUser);
    expect(findUnique).toHaveBeenCalledExactlyOnceWith({ where: { username: 'ada' } });
  });

  it('returns null when no user has that username', async () => {
    findUnique.mockResolvedValue(null);

    await expect(repository.findByUsername('nobody')).resolves.toBeNull();
  });
});

describe('userRepository.findByEmail', () => {
  it('looks the user up by the lower-cased email', async () => {
    findUnique.mockResolvedValue(storedUser);

    await expect(repository.findByEmail('Ada@Example.org')).resolves.toEqual(storedUser);
    expect(findUnique).toHaveBeenCalledExactlyOnceWith({ where: { email: 'ada@example.org' } });
  });

  it('returns null when no user has that email', async () => {
    findUnique.mockResolvedValue(null);

    await expect(repository.findByEmail('nobody@example.org')).resolves.toBeNull();
  });
});

describe('userRepository.create', () => {
  it('stores the email lower-cased and keeps the password hash as given', async () => {
    create.mockResolvedValue(storedUser);

    const created = await repository.create({
      username: 'ada',
      email: 'Ada@Example.ORG',
      passwordHash: storedUser.passwordHash,
    });

    expect(created).toEqual(storedUser);
    expect(create).toHaveBeenCalledExactlyOnceWith({
      data: {
        username: 'ada',
        email: 'ada@example.org',
        passwordHash: storedUser.passwordHash,
        role: undefined,
      },
    });
  });

  it('passes an explicit role through', async () => {
    create.mockResolvedValue({ ...storedUser, role: 'admin' });

    await repository.create({
      username: 'root',
      email: 'root@example.org',
      passwordHash: storedUser.passwordHash,
      role: 'admin',
    });

    expect(create).toHaveBeenCalledExactlyOnceWith({
      data: expect.objectContaining({ role: 'admin' }),
    });
  });

  it('lets database errors (for example a unique violation) reach the caller', async () => {
    create.mockRejectedValue(new Error('Unique constraint failed'));

    await expect(
      repository.create({ username: 'ada', email: 'ada@example.org', passwordHash: 'hash' }),
    ).rejects.toThrow('Unique constraint failed');
  });
});
