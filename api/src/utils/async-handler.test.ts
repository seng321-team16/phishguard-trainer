import type { NextFunction, Request, Response } from 'express';
import { describe, expect, it, vi } from 'vitest';
import { asyncHandler } from './async-handler.js';

describe('asyncHandler', () => {
  it('forwards a rejected promise to next()', async () => {
    const error = new Error('boom');
    const next = vi.fn();
    const handler = asyncHandler(() => Promise.reject(error));

    handler({} as Request, {} as Response, next as NextFunction);
    await Promise.resolve();
    await Promise.resolve();

    expect(next).toHaveBeenCalledWith(error);
  });

  it('does not call next() when the handler succeeds', async () => {
    const next = vi.fn();
    const handler = asyncHandler(() => Promise.resolve());

    handler({} as Request, {} as Response, next as NextFunction);
    await Promise.resolve();
    await Promise.resolve();

    expect(next).not.toHaveBeenCalled();
  });
});
