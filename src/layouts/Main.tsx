import { useMemo } from "react";

import { Card, Grid, Group, NumberFormatter, Progress, Text } from "@mantine/core";

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

    const coinsLeft = useMemo(() => {
        if (stats && stats.totalSupply && stats.maxSupply) {
            return 100 - ((stats.maxSupply - stats.totalSupply) / stats.totalSupply) * 100;
        }

        return 0;
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
                    <Grid.Col span={6}>
                        <Card shadow="xl" p="xl" radius="lg">
                            <Text fz="sm" tt="uppercase" fw={600} lh={1} mb={12} c="gray.6">
                                Circulation
                            </Text>
                            <Group align="baseline">
                                <Text fz={42} fw={500} lh={1}>
                                    <NumberFormatter value={stats?.totalSupply} thousandSeparator />
                                </Text>
                                <Text fz={26} fw={500} lh={1} c="gray.6">
                                    / <NumberFormatter value={stats?.maxSupply} thousandSeparator />
                                </Text>
                            </Group>
                            <Progress value={coinsLeft} mt="xl" size="md" radius="xl" color="yellow" />
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Card shadow="xl" p="xl" radius="lg">
                            b
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
