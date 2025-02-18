import { useMemo } from "react";

import { Card, Grid } from "@mantine/core";

import Chart from "../components/Chart/Chart";
import SimpleStatCard from "../components/SimpleStatCard";
import { Stats } from "../types/Data";

interface MainProps {
    stats: Stats | null;
}

function Main({ stats }: MainProps) {
    const avgTimeBetweenBlocks = useMemo(() => {
        const tmp = 86400; // 24 hours in seconds

        if (stats?.blocks24h) {
            const seconds = tmp / stats.blocks24h;

            return `~${Math.floor(seconds / 60)}m ${Math.round(seconds % 60)}s`;
        }

        return undefined;
    }, [stats]);

    return (
        <Grid>
            <Grid.Col span={9}>
                <Grid>
                    <Grid.Col span={4}>
                        <SimpleStatCard
                            label="Current Price"
                            value={stats?.currentPriceUsd}
                            change={stats?.priceChangePercentage24h}
                            prefix="$"
                            format
                        />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <SimpleStatCard label="Latest Block" value={stats?.bestBlockheight} format />
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
