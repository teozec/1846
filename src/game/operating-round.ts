export type DividendOption = {
    label: string;
    perShare: number;
    witheld: number;
    company: number;
    playerAmounts: number[];
}

export function calculateDividendOptions(playerShares: number[], companyShares: number, revenue: number): DividendOption[] {

    return [
        {
            label: "Pay all dividends",
            perShare: revenue * 0.1,
            witheld: 0,
            company: companyShares * revenue * 0.1,
            playerAmounts: playerShares.map(shares => shares * revenue * 0.1),
        },
        {
            label: "Pay half dividends",
            perShare: Math.floor(revenue * 0.05),
            witheld: Math.ceil(revenue * 0.05) * 10,
            company: Math.ceil(revenue * 0.05) * 10 + companyShares * Math.floor(revenue * 0.05),
            playerAmounts: playerShares.map(shares => shares * Math.floor(revenue * 0.05)),
        },
        {
            label: "Pay no dividends",
            perShare: 0,
            witheld: revenue,
            company: revenue,
            playerAmounts: playerShares.map(_ => 0),
        },
    ]
}