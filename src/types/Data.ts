interface Data {
    market_price_usd: number;
    best_block_height: number;
    circulation: number;
    blocks_24h: number;
    market_price_usd_change_24h_percentage: number;
}

export interface StatsDto {
    data: Data;
}

export interface PriceDto {
    prices: [number, number][];
}

export interface Price {
    t: number;
    v: number;
}

export function mapPriceDtoToPrice(data: PriceDto): Price[] {
    return data.prices.map(([timestamp, value]) => ({ t: timestamp, v: value }));
}
