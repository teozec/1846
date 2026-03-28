import { useState, type Dispatch } from "react";
import { NumberInput } from "../components/NumberInput";
import { useNavigate } from "react-router";
import { ROUTES } from "../routes";
import type { GameAction } from "../reducers/gameReducer";
import { COMPANY_NAMES } from "../../game/constants";
import type { CompanyName } from "../../game/types";

type SetupProps = { dispatch: Dispatch<GameAction> }

export function Setup({ dispatch }: SetupProps) {
    const [numPlayers, setNumPlayers] = useState(3);
    const [players, setPlayers] = useState<string[]>(Array(3).fill(''));
    const [selectedCompanies, setSelectedCompanies] = useState<Set<CompanyName>>(new Set(COMPANY_NAMES));
    const navigate = useNavigate();

    const toggleCompany = (name: CompanyName) => {
        setSelectedCompanies(prev => {
            const next = new Set(prev);
            if (next.has(name)) {
                next.delete(name);
            } else {
                next.add(name);
            }
            return next;
        });
    };

    const canStart = selectedCompanies.size > 0 && !players.slice(0, numPlayers).some(p => p.trim() === "");

    const handleStartGame = () => {
        if (!canStart) return;
        dispatch({ type: "START_GAME", config: { players: players.slice(0, numPlayers), companies: [...selectedCompanies] } });
        navigate(ROUTES.STOCK);
    }

    const handlePlayerNameChange = (index: number, name: string) => {
        const updated = [...players];
        updated[index] = name;
        setPlayers(updated);
    }

    const handleNumPlayersChange = (num: number) => {
        setNumPlayers(num);
        if (num > players.length) {
            setPlayers([...players, ...Array(num - players.length).fill('')]);
        }
    }

    return (
        <>
            <h1>New Game</h1>

            <label htmlFor="num-players">Number of Players</label>
            <NumberInput id="num-players" value={numPlayers} onChange={handleNumPlayersChange} />

            {[...Array(numPlayers)].map((_, index) => (
                <div key={index}>
                    <label htmlFor={`player-${index}`}>Player {index + 1} Name</label>
                    <input
                        id={`player-${index}`}
                        type="text"
                        value={players[index] || ''}
                        onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                    />
                </div>
            ))}

            <fieldset>
                <legend>Companies</legend>
                {COMPANY_NAMES.map((name) => (
                    <div key={name}>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedCompanies.has(name)}
                                onChange={() => toggleCompany(name)}
                            />
                            {name}
                        </label>
                    </div>
                ))}
            </fieldset>

            <button onClick={handleStartGame} disabled={!canStart}>Start Game</button>
        </>
    )
}