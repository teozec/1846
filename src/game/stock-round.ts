import type { CompanyName, GameState } from "./types";

export function updatePlayerShare(
    playerShares: number[][],
    companyIndex: number,
    playerIndex: number,
    value: number,
    playersCount: number
): number[][] {
    const next = playerShares.map(row => [...row]);

    // Ensure company row exists
    while (next.length <= companyIndex) {
        next.push(Array(playersCount).fill(0));
    }

    // Set the value
    next[companyIndex][playerIndex] = value;

    return next;
}

export function getStockMarketShares(state: GameState): Record<CompanyName, number> {
    return Object.fromEntries(state.companies.map(company => {
        const playerShares = state.players.map(player => player.shares[company.name] ?? 0);
        const companyShares = company.state === "floated" ? company.shares : 0;
        return [company.name, 10 - companyShares - playerShares.reduce((a, b) => a + b, 0)]
    })) as Record<CompanyName, number>
}