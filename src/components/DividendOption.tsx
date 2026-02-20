type DividendOptionProps = {
    label: string;
    perShare: number;
    witheld: number;
    playerAmounts: number[];
};

export function DividendOption({ label, perShare, witheld, playerAmounts }: DividendOptionProps) {
    return (
        <>
            <h2>{label}</h2>
            <div>Per Share: {perShare}</div>
            <div>Witheld: {witheld}</div>
            {playerAmounts.map((amount, index) => (
                <div key={index}>Player {index + 1}: {amount}</div>
            ))}
        </>
    )
}