import { useState } from "react";
import { NumberInput } from "../components/NumberInput";
import { DividendOption } from "../components/DividendOption";
import { Link } from "react-router";
import { ROUTES } from "../routes";
import { calculateDividendOptions } from "../../game/operating-round";
import type { GameState } from "../../game/types";
import type { GameAction } from "../reducers/gameReducer";

type OperatingRoundProps = {
    state: GameState;
    dispatch: React.Dispatch<GameAction>;
};

export function OperatingRound({ state: { players, companies } }: OperatingRoundProps) {
    const [revenue, setRevenue] = useState(0);
    const [selectedCompany, setSelectedCompany] = useState(0);

    const companyName = companies[selectedCompany]?.name;
    const sharesForSelected = players.map(player => player.shares[companyName] ?? 0);

    return (
        <>
            <h1>Operating Round</h1>

            <Link to={ROUTES.STOCK}>Go to Stock Round</Link>

            <div>
                <label htmlFor="company-select">Company</label>
                <select id="company-select" value={selectedCompany} onChange={(e) => setSelectedCompany(Number(e.target.value))}>
                    {companies.map((c, i) => <option key={i} value={i}>{c.name}</option>)}
                </select>
            </div>

            <div>
                <label htmlFor="revenue">Revenue</label>
                <NumberInput id="revenue" value={revenue} onChange={setRevenue} />
            </div>

            <>
                {calculateDividendOptions(sharesForSelected, revenue).map((option, index) => (
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