import { STOCK_PRICE_CHART } from "./constants";

export type DividendOption = {
    label: string;
    perShare: number;
    witheld: number;
    company: number;
    playerAmounts: number[];
    indexChange: -1 | 0 | 1 | 2 | 3;
}

export function calculateDividendOptions(playerShares: number[], companyShares: number, companyValueIndex: number, revenue: number): DividendOption[] {
    const companyShareValue = STOCK_PRICE_CHART[companyValueIndex];

    return [
        calculatePayAllDividendOption(playerShares, companyShares, companyShareValue, revenue),
        calculatePayHalfDividendOption(playerShares, companyShares, companyShareValue, revenue),
        calculatePayNoDividendOption(playerShares, revenue),
    ]
}

function calculatePayAllDividendOption(playerShares: number[], companyShares: number, companyShareValue: number, revenue: number): DividendOption {
    const perShare = revenue * 0.1;
    return {
        label: "Pay all dividends",
        perShare,
        witheld: 0,
        company: companyShares * perShare,
        playerAmounts: playerShares.map(shares => shares * perShare),
        indexChange: calculateIndexChange(revenue, companyShareValue),
    }
}

function calculatePayHalfDividendOption(playerShares: number[], companyShares: number, companyShareValue: number, revenue: number): DividendOption {
    const perShare = Math.ceil(revenue * 0.05);
    const dividendsPaid = perShare * 10;
    const witheld = revenue - dividendsPaid;
    return {
        label: "Pay half dividends",
        perShare,
        witheld,
        company: witheld + companyShares * perShare,
        playerAmounts: playerShares.map(shares => shares * perShare),
        indexChange: calculateIndexChange(dividendsPaid, companyShareValue),
    }
}

function calculatePayNoDividendOption(playerShares: number[], revenue: number): DividendOption {
    return {
        label: "Pay no dividends",
        perShare: 0,
        witheld: revenue,
        company: revenue,
        playerAmounts: playerShares.map(_ => 0),
        indexChange: -1
    }
}



function calculateIndexChange(dividendsPaid: number, companyShareValue: number): -1 | 0 | 1 | 2 | 3 {
    const TRIPLE_JUMP_THRESHOLD = 165;
    if (dividendsPaid < companyShareValue / 2) {
        return -1;
    } else if (dividendsPaid < companyShareValue) {
        return 0;
    } else if (dividendsPaid < companyShareValue * 2) {
        return 1;
    } else if (dividendsPaid < companyShareValue * 3 || companyShareValue < TRIPLE_JUMP_THRESHOLD) {
        return 2;
    } else {
        return 3;
    }
}