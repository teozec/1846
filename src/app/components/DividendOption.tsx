import type { DividendOption } from "../../game/operating-round";

type DividendOptionProps = {
    players: string[];
    option: DividendOption;
};

export function DividendOption({ players, option }: DividendOptionProps) {
    const { label, perShare, witheld, company, playerAmounts, indexChange } = option;

    return (
        <div style={{ display: "flex", flexDirection: "column", border: "1px solid #ccc", borderRadius: "8px", padding: "1rem", minWidth: "10rem" }}>
            <h2>{label}</h2>
            <div>Per Share: {perShare}</div>
            <div>Witheld: {witheld}</div>
            <div>Total company amount: {company}</div>
            {playerAmounts.map((amount, index) => (
                <div key={index}>{players[index]}: {amount}</div>
            ))}
            <div>Stock price change: {getIndexChange(indexChange)}</div>
        </div>
    )
}

function getIndexChange(indexChange: -1 | 0 | 1 | 2 | 3): string {
    switch (indexChange) {
        case -1: return "Decrease";
        case 0: return "No change";
        case 1: return "Jump";
        case 2: return "Double jump";
        case 3: return "Triple jump";
    }
}