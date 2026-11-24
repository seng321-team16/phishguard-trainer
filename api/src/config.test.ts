import { describe, expect, it } from 'vitest';
import { loadConfig } from './config.js';

describe('loadConfig', () => {
  it('applies defaults when nothing is set', () => {
    const config = loadConfig({});

    expect(config.PORT).toBe(3000);
    expect(config.NODE_ENV).toBe('development');
    expect(config.LOGIN_RATE_LIMIT_PER_MINUTE).toBe(5);
  });

  it('coerces numeric variables', () => {
    expect(loadConfig({ PORT: '4000' }).PORT).toBe(4000);
  });

  it('rejects an invalid port and names the variable', () => {
    expect(() => loadConfig({ PORT: 'not-a-port' })).toThrow(/PORT/);
  });

  it('does not leak the rejected value', () => {
    expect(() => loadConfig({ JWT_SECRET: 'short' })).toThrow(/JWT_SECRET/);
    expect(() => loadConfig({ JWT_SECRET: 'short' })).not.toThrow(/short/);
  });
});
