import { BlockChairStatsDto, CoinGeckoStatsDto, Price, PriceDto, Stats } from "../types/Data";

const COINGECKO_STATS_ENDPOINT = "https://api.coingecko.com/api/v3/coins/bitcoin";
const BLOCKCHAIR_STATS_ENDPOINT = "https://api.blockchair.com/bitcoin/stats";
const COINGECKO_CHART_DATA_ENDPOINT = "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&interval=daily";

function mapStatsDtoToStats(cg: CoinGeckoStatsDto, bc: BlockChairStatsDto): Stats {
    return {
        currentPriceUsd: cg.market_data.current_price.usd,
        priceChangePercentage24h: cg.market_data.price_change_percentage_24h,
        bestBlockheight: bc.data.best_block_height,
        blocks24h: bc.data.blocks_24h,
        maxSupply: cg.market_data.max_supply,
        totalSupply: cg.market_data.total_supply,
    };
}

function mapPriceDtoToPrice(data: PriceDto): Price[] {
    return data.prices.map(([timestamp, value]) => ({ t: timestamp, v: value }));
}

export const fetchBtcStats = async (): Promise<Stats | null> => {
    try {
        const coinGeckoResponse = await fetch(COINGECKO_STATS_ENDPOINT);
        const blockChairResponse = await fetch(BLOCKCHAIR_STATS_ENDPOINT);

        const result1: CoinGeckoStatsDto = await coinGeckoResponse.json();
        const result2: BlockChairStatsDto = await blockChairResponse.json();

        console.log(result1);

        return mapStatsDtoToStats(result1, result2);
    } catch (error) {
        console.error(error);
    }

    return null;
};

export const fetchBtcChartData = async (numberOfDays: string): Promise<Price[] | null> => {
    try {
        const response = await fetch(`${COINGECKO_CHART_DATA_ENDPOINT}&days=${numberOfDays}`);
        const result: PriceDto = await response.json();

        return mapPriceDtoToPrice(result);
    } catch (error) {
        console.error(error);
    }

    return null;
};
