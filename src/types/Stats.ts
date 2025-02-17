interface Data {
    market_price_usd: number;
    blocks: number;
    circulation: number;
}

export interface Stats {
    data: Data;
}
