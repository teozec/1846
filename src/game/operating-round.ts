export type DividendOption = {
    label: string;
    perShare: number;
    witheld: number;
    playerAmounts: number[];
}

export function calculateDividendOptions(playerShares: number[], revenue: number) {

    return [
        {
            label: "Pay all dividends",
            perShare: revenue * 0.1,
            witheld: 0,
            playerAmounts: playerShares.map(shares => shares * revenue * 0.1),
        },
        {
            label: "Pay half dividends",
            perShare: Math.floor(revenue * 0.05),
            witheld: Math.ceil(revenue * 0.05) * 10,
            playerAmounts: playerShares.map(shares => shares * Math.floor(revenue * 0.05)),
        },
        {
            label: "Pay no dividends",
            perShare: 0,
            witheld: revenue,
            playerAmounts: playerShares.map(_ => 0),
        },
    ]
}