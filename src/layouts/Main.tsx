import { useMemo } from "react";

import { Card, Grid } from "@mantine/core";

import Chart from "../components/Chart/Chart";
import SimpleStatCard from "../components/SimpleStatCard";
import { StatsDto } from "../types/Data";

interface MainProps {
    stats: StatsDto | null;
}

function Main({ stats }: MainProps) {
    const data = stats?.data;

    // const circulation = useMemo(() => {
    //     return data?.circulation ? Math.round(data.circulation / 100000000) : 0;
    // }, [data]);

    const avgTimeBetweenBlocks = useMemo(() => {
        const tmp = 86400; // 24 hours in seconds

        if (data?.blocks_24h) {
            const seconds = tmp / data.blocks_24h;

            return `~${Math.floor(seconds / 60)}m ${Math.round(seconds % 60)}s`;
        }

        return undefined;
    }, [data]);

    return (
        <Grid>
            <Grid.Col span={9}>
                <Grid>
                    <Grid.Col span={4}>
                        <SimpleStatCard
                            label="Current Price"
                            value={data?.market_price_usd}
                            change={data?.market_price_usd_change_24h_percentage}
                            prefix="$"
                            format
                        />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <SimpleStatCard label="Latest Block" value={data?.best_block_height} format />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <SimpleStatCard label="Average time between blocks" value={avgTimeBetweenBlocks} />
                    </Grid.Col>
                    <Grid.Col>
                        <Card shadow="xl" p="xl" radius="lg">
                            <Chart />
                        </Card>
                    </Grid.Col>
                </Grid>
            </Grid.Col>
            <Grid.Col span="auto">
                <Grid>
                    <Grid.Col>
                        <Card shadow="xl" padding="lg" radius="lg">
                            1
                        </Card>
                    </Grid.Col>
                    <Grid.Col>
                        <Card shadow="xl" padding="lg" radius="lg">
                            2
                        </Card>
                    </Grid.Col>
                </Grid>
            </Grid.Col>
        </Grid>
    );
}

export default Main;
