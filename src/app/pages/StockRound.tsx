import { useNavigate } from "react-router";
import { NumberInput } from "../components/NumberInput";
import { ROUTES } from "../routes";
import { useState } from 'react';
import type { GameState, CompanyName } from "../../game/types";
import type { GameAction } from "../reducers/gameReducer";


type StockRoundProps = {
    state: GameState;
    dispatch: React.Dispatch<GameAction>;
}

export function StockRound({ state: { companies, players }, dispatch }: StockRoundProps) {
    const activeCompanies = companies.filter(c => c.state !== "delisted");

    const [playerShares, setPlayerShares] = useState(() => Object.fromEntries(players.map(player => [player.name, { ...player.shares } as Record<CompanyName, number>])));
    const navigate = useNavigate();

    function updateShare(playerName: string, companyName: CompanyName, value: number) {
        setPlayerShares(prev => ({
            ...prev,
            [playerName]: {
                ...prev[playerName],
                [companyName]: value,
            }
        }));
    }

    function handleEndStockRound() {
        dispatch({ type: "END_STOCK_ROUND", playerShares });
        navigate(ROUTES.OPERATING);
    }

    return (
        <>
            <h1>Stock Round</h1>

            {players.map((player) => (
                <section key={player.name}>
                    <h2>{player.name}</h2>
                    {activeCompanies.map((company) => (
                        <div key={company.name}>
                            <label htmlFor={`${player.name}-${company.name}`}>
                                {company.name}
                            </label>
                            <NumberInput
                                id={`${player.name}-${company.name}`}
                                value={playerShares[player.name]?.[company.name] ?? 0}
                                onChange={(value) => updateShare(player.name, company.name, value)}
                            />
                        </div>
                    ))}
                </section>
            ))}

            <button onClick={handleEndStockRound}>End Stock Round</button>
        </>
    )
}