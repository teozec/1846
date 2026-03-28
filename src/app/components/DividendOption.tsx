import type { DividendOption } from "../../game/operating-round";

type DividendOptionProps = {
    players: string[];
    option: DividendOption;
};

export function DividendOption({ players, option }: DividendOptionProps) {
    const { label, perShare, witheld, company, playerAmounts } = option;

    return (
        <>
            <h2>{label}</h2>
            <div>Per Share: {perShare}</div>
            <div>Witheld: {witheld}</div>
            <div>Total company amount: {company}</div>
            {playerAmounts.map((amount, index) => (
                <div key={index}>{players[index]}: {amount}</div>
            ))}
        </>
    )
}