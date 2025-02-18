export interface PriceDto {
    prices: [number, number][];
}

export interface Price {
    t: number;
    v: number;
}

interface CurrentPriceDto {
    usd: number;
}
interface MarketDataDto {
    current_price: CurrentPriceDto;
    price_change_percentage_24h: number;
    max_supply: number;
    total_supply: number;
}

export interface CoinGeckoStatsDto {
    market_data: MarketDataDto;
}

interface Data {
    best_block_height: number;
    blocks_24h: number;
}

export interface BlockChairStatsDto {
    data: Data;
}

export interface Stats {
    currentPriceUsd: number;
    priceChangePercentage24h: number;
    bestBlockheight: number;
    blocks24h: number;
    maxSupply: number;
    totalSupply: number;
}
