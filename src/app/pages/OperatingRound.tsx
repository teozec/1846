import { useState, useEffect } from "react";
import { NumberInput } from "../components/NumberInput";
import { DividendOption } from "../components/DividendOption";
import { Link } from "react-router";
import { ROUTES } from "../routes";
import { calculateDividendOptions } from "../../game/operating-round";
import type { GameState } from "../../game/types";
import type { GameAction } from "../reducers/gameReducer";
import { getStockMarketShares } from "../../game/stock-round";

type OperatingRoundProps = {
    state: GameState;
    dispatch: React.Dispatch<GameAction>;
};

export function OperatingRound({ state: { players, companies }, dispatch }: OperatingRoundProps) {
    if (companies.every(c => c.state !== "floated")) {
        return (
            <>
                <h1>Operating Round</h1>
                <p>No companies have floated yet. Please go to the stock round.</p>
                <Link to={ROUTES.STOCK}>Go to Stock Round</Link>
            </>
        )
    }

    const [revenue, setRevenue] = useState(0);
    const [selectedCompany, setSelectedCompany] = useState(0);

    const floatedCompanies = companies.filter(c => c.state === "floated");
    const companyName = floatedCompanies[selectedCompany].name;
    const sharesForSelected = players.map(player => player.shares[companyName] ?? 0);
    const companyShares = floatedCompanies[selectedCompany].shares;

    const [localShares, setLocalShares] = useState(companyShares);
    const localCompanies = companies.map(c => c.name === companyName ? { ...c, shares: localShares } : c)

    useEffect(() => { setLocalShares(companyShares); }, [selectedCompany]);

    return (
        <>
            <h1>Operating Round</h1>

            <Link to={ROUTES.STOCK}>Go to Stock Round</Link>

            <div>
                <label htmlFor="company-select">Company</label>
                <select id="company-select" value={selectedCompany} onChange={(e) => setSelectedCompany(Number(e.target.value))}>
                    {floatedCompanies.map((c, i) => <option key={i} value={i}>{c.name}</option>)}
                </select>
            </div>

            <div>
                <p>President: {floatedCompanies[selectedCompany].president}</p>
                <div>
                    <label htmlFor="company-shares">Company shares: </label>
                    <NumberInput id="company-shares" value={localShares} onChange={setLocalShares} />
                    <button
                        onClick={() => dispatch({ type: "UPDATE_COMPANY_SHARES", companyName, shares: localShares })}
                        disabled={localShares === companyShares}
                    >Save</button>
                </div>
                <div>Stock market shares: {getStockMarketShares({ companies: localCompanies, players })[companyName]}</div>
                <label htmlFor="revenue">Revenue</label>
                <NumberInput id="revenue" value={revenue} onChange={setRevenue} />
            </div>

            <>
                {calculateDividendOptions(sharesForSelected, localShares, revenue).map((option, index) => (
                    <DividendOption
                        players={players.map(p => p.name)}
                        key={index}
                        option={option}
                    />
                ))}
            </>
        </>
    )
}