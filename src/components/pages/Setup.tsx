import { useState } from "react";
import { NumberInput } from "../NumberInput";
import { useNavigate } from "react-router";
import { ROUTES } from "../../routes";
import { flushSync } from "react-dom";

type SetupProps = {
    startGame: (players: string[]) => void;
}


export function Setup({ startGame }: SetupProps) {
    const [numPlayers, setNumPlayers] = useState(3);
    let players: string[] = [];
    const navigate = useNavigate();

    const handleStartGame = () => {
        flushSync(() => {
            startGame(players.slice(0, numPlayers));
        });
        navigate(ROUTES.STOCK);
    }

    return (
        <>
            <h1>New Game</h1>

            <label htmlFor="num-players">Number of Players</label>
            <NumberInput id="num-players" value={numPlayers} onChange={setNumPlayers} />

            {[...Array(numPlayers)].map((_, index) => (
                <div key={index}>
                    <label htmlFor={`player-${index}`}>Player {index + 1} Name</label>
                    <input
                        id={`player-${index}`}
                        type="text"
                        onChange={(e) => { players[index] = e.target.value; }}
                    />
                </div>
            ))}


            <button onClick={handleStartGame}>Start Game</button>
        </>
    )
}