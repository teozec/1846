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
