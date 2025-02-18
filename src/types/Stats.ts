interface Data {
    market_price_usd: number;
    blocks: number;
    circulation: number;
    blocks_24h: number;
    market_price_usd_change_24h_percentage: number;
}

export interface Stats {
    data: Data;
}
