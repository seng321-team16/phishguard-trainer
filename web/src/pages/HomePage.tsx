import { useQuery } from '@tanstack/react-query';
import { fetchHealth } from '../api/health';

/** Placeholder page of the skeleton. The real screens arrive with the app shell (T-69). */
export function HomePage() {
  const health = useQuery({ queryKey: ['health'], queryFn: fetchHealth });

  let apiStatus = 'checking…';
  if (health.isSuccess) apiStatus = health.data.status;
  if (health.isError) apiStatus = 'unreachable';

  return (
    <main>
      <h1>PhishGuard Trainer</h1>
      <p>Phishing-awareness simulator. The learner and admin screens are coming soon.</p>
      <p role="status">API status: {apiStatus}</p>
    </main>
  );
}
