import { Link, useNavigate } from "react-router";
import { ROUTES } from "../../routes";

type HomeProps = {
    isOngoing: boolean;
    resetGame: () => void;
}

export function Home({ isOngoing, resetGame }: HomeProps) {
    const navigate = useNavigate();

    const handleNewGame = () => {
        resetGame();
        navigate(ROUTES.SETUP);
    };

    return (
        <>
            <h1>1846</h1>
            {isOngoing ? (
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