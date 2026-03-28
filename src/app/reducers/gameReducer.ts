import { newGame } from "../../game/game-actions";
import type { Company, CompanyName, GameConfig, GameState } from "../../game/types";

export type GameAction =
    | { type: "START_GAME"; config: GameConfig }
    | { type: "RESET_GAME" }
    | { type: "END_STOCK_ROUND"; playerShares: Record<string, Record<CompanyName, number>>; companies: Company[] }
    | { type: "UPDATE_COMPANY_SHARES"; companyName: CompanyName; shares: number }

export function gameReducer(state: GameState | undefined, action: GameAction): GameState | undefined {
    if (!state) {
        if (action.type === "START_GAME") {
            return newGame(action.config);
        } else {
            return undefined;
        }
    }

    switch (action.type) {
        case "RESET_GAME":
            return undefined;
        case "END_STOCK_ROUND":
            return {
                ...state,
                players: state.players.map(player => ({
                    ...player,
                    shares: action.playerShares[player.name] ?? player.shares,
                })),
                companies: action.companies,
            }
        case "UPDATE_COMPANY_SHARES":
            return {
                ...state,
                companies: state.companies.map(c =>
                    c.name === action.companyName && c.state === "floated"
                        ? { ...c, shares: action.shares }
                        : c
                ),
            };
        default:
            return state ?? { players: [], companies: [] };
    }
}