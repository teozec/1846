import type { COMPANY_NAMES } from "./constants";

export type CompanyName = typeof COMPANY_NAMES[number];

export type Player = {
    name: string;
    shares: Record<string, number>;
}

export type GameConfig = {
    players: readonly string[];
    companies: readonly CompanyName[];
}


type FloatedInfo = {
    state: "floated";
    valueIndex: number;
    shares: number;
    president: string;
}
type NotFloatedInfo = { state: "not_floated" }
type DelistedInfo = { state: "delisted" }
export type Company = { name: CompanyName } & (NotFloatedInfo | DelistedInfo | FloatedInfo);

export type GameState = {
    players: Player[];
    companies: Company[];
}