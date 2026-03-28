import { Link, useNavigate } from "react-router";
import { ROUTES } from "../routes";
import type { GameState } from "../../game/types";
import type { GameAction } from "../reducers/gameReducer";

type HomeProps = {
    state: GameState | undefined;
    dispatch: React.Dispatch<GameAction>;
}

export function Home({ state, dispatch }: HomeProps) {
    const navigate = useNavigate();

    const handleNewGame = () => {
        dispatch({ type: "RESET_GAME" });
        navigate(ROUTES.SETUP);
    };

    return (
        <>
            <h1>1846</h1>
            {state ? (
                <>
                    <Link to={ROUTES.STOCK}>Continue Game</Link>
                    <button onClick={handleNewGame}>New Game</button>
                </>
            ) : (
                <Link to={ROUTES.SETUP}>New Game</Link>
            )}
        </>
    )
}