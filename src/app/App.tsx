import './App.css'
import { Navigate, Routes, Route } from 'react-router'
import { OperatingRound } from './pages/OperatingRound'
import { StockRound } from './pages/StockRound';
import { ROUTES } from './routes';
import { Setup } from './pages/Setup';
import { Home } from './pages/Home';
import { useLocalStorageReducer } from './hooks/useLocalStorageReducer';
import { gameReducer, type GameAction } from './reducers/gameReducer';
import type { GameState } from '../game/types'



function App() {
  const [gameState, dispatch] = useLocalStorageReducer<GameState | undefined, GameAction>('gameState', gameReducer, undefined);

  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home state={gameState} dispatch={dispatch} />} />
      <Route path={ROUTES.SETUP} element={
        gameState
          ? <Navigate to={ROUTES.HOME} replace />
          : <Setup dispatch={dispatch} />
      } />
      <Route path={ROUTES.OPERATING} element={
        gameState
          ? <OperatingRound state={gameState} dispatch={dispatch} />
          : <Navigate to={ROUTES.HOME} replace />
      } />
      <Route path={ROUTES.STOCK} element={
        gameState
          ? <StockRound state={gameState} dispatch={dispatch} />
          : <Navigate to={ROUTES.HOME} replace />
      } />
    </Routes>
  )
}

export default App
