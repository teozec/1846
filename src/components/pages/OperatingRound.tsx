import { useState } from "react";
import { NumberInput } from "../NumberInput";
import { DividendOption } from "../DividendOption";
import { Link } from "react-router";
import { ROUTES } from "../../routes";

function calculateDividendOptions(revenue: number) {
    return [
        {
            label: "Pay all dividends",
            perShare: revenue * 0.1,
            witheld: 0,
        },
        {
            label: "Pay half dividends",
            perShare: Math.floor(revenue * 0.05),
            witheld: Math.ceil(revenue * 0.05) * 10,
        },
        {
            label: "Pay no dividends",
            perShare: 0,
            witheld: revenue,
        },
    ]
}

export function OperatingRound({ companies, playerShares }: { companies: string[], playerShares: number[][] }) {
    const [revenue, setRevenue] = useState(0);
    const [selectedCompany, setSelectedCompany] = useState(0);

    const sharesForSelected = playerShares[selectedCompany] ?? [];

    return (
        <>
            <h1>Operating Round</h1>

            <Link to={ROUTES.STOCK}>Go to Stock Round</Link>

            <div>
                <label htmlFor="company-select">Company</label>
                <select id="company-select" value={selectedCompany} onChange={(e) => setSelectedCompany(Number(e.target.value))}>
                    {companies.map((c, i) => <option key={i} value={i}>{c || `Company ${i + 1}`}</option>)}
                </select>
            </div>

            <div>
                <label htmlFor="revenue">Revenue</label>
                <NumberInput id="revenue" value={revenue} onChange={setRevenue} />
            </div>

            <>
                {calculateDividendOptions(revenue).map((option, index) => (
                    <DividendOption
                        key={index}
                        label={option.label}
                        perShare={option.perShare}
                        witheld={option.witheld}
                        playerAmounts={sharesForSelected.map(shares => shares * option.perShare)}
                    />
                ))}
            </>
        </>
    )
}