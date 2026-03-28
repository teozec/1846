import type { GameConfig, GameState } from "./types.ts"

export function newGame({ players, companies }: GameConfig): GameState {
    return {
        players: players.map(name => ({ name, shares: {} })),
        companies: companies.map(name => ({ name, state: "not_floated" })),
    };
}
