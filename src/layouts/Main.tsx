import { useMemo } from "react";

import { Card, Grid, Group, NumberFormatter, Progress, Skeleton, Text } from "@mantine/core";

import SimpleStatCard from "../components/SimpleStatCard";
import Chart from "../components/chart/Chart";
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
        if (stats && stats.circulatingSupply && stats.maxSupply) {
            return 100 - ((stats.maxSupply - stats.circulatingSupply) / stats.circulatingSupply) * 100;
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
                        <Card shadow="xl" p="xl" radius="md">
                            <Chart />
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Card shadow="xl" p="xl" radius="md">
                            {stats?.circulatingSupply ? (
                                <>
                                    <Text fz="sm" tt="uppercase" fw={600} lh={1} mb={12} c="gray.6">
                                        Circulation
                                    </Text>
                                    <Group align="baseline">
                                        <Text fz={42} fw={500} lh={1}>
                                            <NumberFormatter value={stats?.circulatingSupply} thousandSeparator />
                                        </Text>
                                        <Text fz={26} fw={500} lh={1} c="gray.6">
                                            /
                                        </Text>
                                        <Text fz={26} fw={500} lh={1} c="gray.6">
                                            <NumberFormatter value={stats?.maxSupply} thousandSeparator />
                                        </Text>
                                    </Group>
                                    <Progress value={coinsLeft} mt="xl" size="sm" radius="md" color="orange" />
                                </>
                            ) : (
                                <>
                                    <Skeleton height={14} mb={12} radius="md" w="40%" />
                                    <Skeleton height={42} radius="md" w="80%" />
                                    <Skeleton height={5} radius="md" w="100%" mt="xl" />
                                </>
                            )}
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <SimpleStatCard
                            label="Market Dominance"
                            value={stats?.marketDominancePercentage}
                            suffix="%"
                            format
                            withProgress
                            progress={stats?.marketDominancePercentage}
                        />
                    </Grid.Col>
                </Grid>
            </Grid.Col>
            <Grid.Col span="auto">
                <Grid>
                    <Grid.Col>
                        <Card shadow="xl" padding="lg" radius="md">
                            1
                        </Card>
                    </Grid.Col>
                    <Grid.Col>
                        <Card shadow="xl" padding="lg" radius="md">
                            2
                        </Card>
                    </Grid.Col>
                </Grid>
            </Grid.Col>
        </Grid>
    );
}

export default Main;
