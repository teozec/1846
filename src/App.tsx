import './App.css'
import { Navigate, Routes, Route } from 'react-router'
import { OperatingRound } from './components/pages/OperatingRound'
import { useEffect } from 'react';
import { StockRound } from './components/pages/StockRound';
import { ROUTES } from './routes';
import { Setup } from './components/pages/Setup';
import { Home } from './components/pages/Home';
import { useLocalStorage } from './hooks/useLocalStorage';

// Predetermined companies (hardcoded)
const DEFAULT_COMPANIES = ['Company 1', 'Company 2', 'Company 3'];

function App() {
  const [players, setPlayers] = useLocalStorage<string[]>('players', []);
  const [companies, setCompanies] = useLocalStorage<string[]>('companies', DEFAULT_COMPANIES);
  const [playerShares, setPlayerShares] = useLocalStorage<number[][]>('playerShares', DEFAULT_COMPANIES.map(() => []));
  const [isOngoing, setIsOngoing] = useLocalStorage<boolean>('isOngoing', false);

  // keep playerShares dimensions in sync with players & companies (pad/truncate)
  useEffect(() => {
    // ensure outer array length === companies.length
    let next = playerShares.slice(0, companies.length);

    // pad missing company rows
    while (next.length < companies.length) {
      next.push(Array(players.length).fill(0));
    }

    // ensure each company row has correct players length
    next = next.map(row => {
      const r = row.slice(0, players.length);
      while (r.length < players.length) r.push(0);
      return r;
    });

    // update only if shape changed
    const shapeChanged = next.length !== playerShares.length || next.some((r, i) => r.length !== (playerShares[i]?.length ?? 0));
    if (shapeChanged) setPlayerShares(next);
  }, [players, companies, playerShares, setPlayerShares]);

  const startGame = (playersArr: string[]) => {
    setPlayers(playersArr);
    setCompanies(DEFAULT_COMPANIES);
    setPlayerShares(Array.from({ length: DEFAULT_COMPANIES.length }, () => Array(playersArr.length).fill(0)));
    setIsOngoing(true);
  };

  const resetGame = () => {
    setPlayers([]);
    setCompanies(DEFAULT_COMPANIES);
    setPlayerShares([]);
    setIsOngoing(false);
  };

  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home isOngoing={isOngoing} resetGame={resetGame} />} />
      <Route path={ROUTES.SETUP} element={
        !isOngoing
          ? <Setup startGame={startGame} />
          : <Navigate to={ROUTES.HOME} replace />
      } />
      <Route path={ROUTES.OPERATING} element={
        isOngoing
          ? <OperatingRound companies={companies} playerShares={playerShares} />
          : <Navigate to={ROUTES.HOME} replace />
      } />
      <Route path={ROUTES.STOCK} element={
        isOngoing
          ? <StockRound companies={companies} players={players} playerShares={playerShares} setPlayerShares={setPlayerShares} />
          : <Navigate to={ROUTES.HOME} replace />
      } />
    </Routes>
  )
}

export default App
