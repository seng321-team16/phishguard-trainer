import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';

/** Route table. The router and query providers live in `main.tsx` so tests can supply their own. */
export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}
