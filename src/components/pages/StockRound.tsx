import { Link } from "react-router";
import { NumberInput } from "../NumberInput";
import { ROUTES } from "../../routes";
import { useState } from 'react';


export function StockRound({ companies, players, playerShares, setPlayerShares }: { companies: string[], players: string[], playerShares: number[][], setPlayerShares: React.Dispatch<React.SetStateAction<number[][]>> }) {
    const [selectedCompany, setSelectedCompany] = useState(0);
    const sharesForSelected = playerShares[selectedCompany] ?? Array(players.length).fill(0);

    return (
        <>
            <h1>Stock Round</h1>

            <Link to={ROUTES.OPERATING}>Go to Operating Round</Link>

            <div>
                <label htmlFor="company-select">Company</label>
                <select id="company-select" value={selectedCompany} onChange={(e) => setSelectedCompany(Number(e.target.value))}>
                    {companies.map((c, i) => <option key={i} value={i}>{c || `Company ${i + 1}`}</option>)}
                </select>
            </div>

            {players.map((player, index) => (
                <div key={index}>
                    <label htmlFor={`player-${index}`}>{player} Shares</label>
                    <NumberInput id={`player-${index}`} value={sharesForSelected[index] ?? 0} onChange={(value) => {
                        const next = playerShares.map(row => [...row]);
                        while (next.length <= selectedCompany) next.push(Array(players.length).fill(0));
                        if (!next[selectedCompany]) next[selectedCompany] = Array(players.length).fill(0);
                        next[selectedCompany][index] = value;
                        setPlayerShares(next);
                    }} />
                </div>
            ))}

        </>
    )
}