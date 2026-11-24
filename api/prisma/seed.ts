/**
 * Database seed, run by `prisma db seed` (see "prisma.seed" in package.json) on every
 * start of the API container, right after the migrations.
 *
 * Intentionally empty for now: later tasks add the bootstrap administrator and the
 * starter scenarios here. Everything added must be idempotent (safe to run again).
 */
async function main(): Promise<void> {
  console.log('[seed] Nothing to seed yet');
}

main().catch((error: unknown) => {
  console.error('[seed] Failed', error);
  process.exit(1);
});
