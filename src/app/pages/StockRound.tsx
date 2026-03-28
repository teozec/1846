import { useNavigate } from "react-router";
import { NumberInput } from "../components/NumberInput";
import { ROUTES } from "../routes";
import { useState } from 'react';
import type { Company, GameState, CompanyName } from "../../game/types";
import type { GameAction } from "../reducers/gameReducer";
import { STOCK_PRICE_CHART } from "../../game/constants";


type StockRoundProps = {
    state: GameState;
    dispatch: React.Dispatch<GameAction>;
}

export function StockRound({ state: { companies, players }, dispatch }: StockRoundProps) {
    const [playerShares, setPlayerShares] = useState(() => Object.fromEntries(players.map(player => [player.name, { ...player.shares } as Record<CompanyName, number>])));
    const [localCompanies, setLocalCompanies] = useState<Company[]>(() => companies)
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


    function updateCompanyState(companyName: CompanyName, state: "floated" | "not_floated" | "delisted") {
        setLocalCompanies(prev => prev.map(c => {
            if (c.name !== companyName) return c;
            if (state === "floated") return { name: c.name, state: "floated" as const, valueIndex: 0, shares: 10, president: players[0]?.name ?? "" };
            return { name: c.name, state } as Company;
        }));
    }

    function updateCompanyValue(companyName: CompanyName, value: number) {
        setLocalCompanies(prev => prev.map(c =>
            c.name === companyName && c.state === "floated" ? { ...c, valueIndex: value } : c
        ));
    }

    function updateCompanyPresident(companyName: CompanyName, president: string) {
        setLocalCompanies(prev => prev.map(c =>
            c.name === companyName && c.state === "floated" ? { ...c, president } : c
        ));
    }

    function updateCompanyShares(companyName: CompanyName, shares: number) {
        setLocalCompanies(prev => prev.map(c =>
            c.name === companyName && c.state === "floated" ? { ...c, shares } : c
        ));
    }

    function handleEndStockRound() {
        dispatch({ type: "END_STOCK_ROUND", playerShares, companies: localCompanies });
        navigate(ROUTES.OPERATING);
    }

    return (
        <>
            <h1>Stock Round</h1>

            {players.map((player) => (
                <section key={player.name}>
                    <h2>{player.name}</h2>
                    {localCompanies.filter(c => c.state === "floated").map((company) => (
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

            <section>
                <h2>Companies</h2>
                {localCompanies.map((company) => (
                    <div key={company.name} style={{ marginBottom: "0.5rem", padding: "0.5rem", border: "1px solid #ccc" }}>
                        <span>{company.name} - {company.state === "floated" ? "Floated" : company.state === "delisted" ? "Delisted" : "Non-Floated"}</span>
                        {company.state === "floated" && (
                            <>
                                <select
                                    id={`${company.name}-value`}
                                    value={company.valueIndex}
                                    onChange={(e) => updateCompanyValue(company.name, Number(e.target.value))}
                                >
                                    {STOCK_PRICE_CHART.map((price, i) => (
                                        <option key={i} value={i}>${price}</option>
                                    ))}
                                </select>
                                <label htmlFor={`${company.name}-president`}>President:</label>
                                <select
                                    id={`${company.name}-president`}
                                    value={company.president}
                                    onChange={(e) => updateCompanyPresident(company.name, e.target.value)}
                                >
                                    {players.map((player) => (
                                        <option key={player.name} value={player.name}>{player.name}</option>
                                    ))}
                                </select>
                                <label htmlFor={`${company.name}-shares`}>Shares:</label>
                                <NumberInput
                                    id={`${company.name}-shares`}
                                    value={company.shares}
                                    onChange={(value) => updateCompanyShares(company.name, value)}
                                />
                                <button onClick={() => updateCompanyState(company.name, "not_floated")}>Unfloat</button>
                                <button onClick={() => updateCompanyState(company.name, "delisted")}>Delist</button>
                            </>
                        )}
                        {company.state === "not_floated" && (
                            <>
                                <button onClick={() => updateCompanyState(company.name, "floated")}>Float</button>
                                <button onClick={() => updateCompanyState(company.name, "delisted")}>Delist</button>
                            </>
                        )}
                        {company.state === "delisted" && (
                            <button onClick={() => updateCompanyState(company.name, "not_floated")}>Restore</button>
                        )}
                    </div>
                ))}
            </section>

            <button onClick={handleEndStockRound}>End Stock Round</button>
        </>
    )
}