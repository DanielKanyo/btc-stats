import { useEffect, useMemo, useState } from "react";

import { AreaChart, ChartTooltipProps, getFilteredChartTooltipPayload } from "@mantine/charts";
import { Flex, Group, Paper, SegmentedControl, Skeleton, Text } from "@mantine/core";
import { IconArrowDownRight, IconArrowUpRight } from "@tabler/icons-react";

import { fetchBtcChartData } from "../../services/service";
import { Price } from "../../types/Data";
import classes from "./style.module.css";

enum INTERVALS {
    ONE_MONTH = "31",
    THREE_MONTHS = "91",
    SIX_MONTHS = "182",
    ONE_YEAR = "365",
}

function ChartTooltip({ label, payload }: ChartTooltipProps) {
    if (!payload) return null;

    const ts = label as number;

    const day = new Date(ts).getDate() < 10 ? `0${new Date(ts).getDate()}` : new Date(ts).getDate();
    const month = new Date(ts).getMonth() + 1 < 10 ? `0${new Date(ts).getMonth() + 1}` : new Date(ts).getMonth() + 1;
    const year = new Date(ts).getFullYear();

    return (
        <Paper px="md" py="sm" withBorder shadow="md" radius="md">
            <Text fw={500} mb={5}>
                {day}/{month}/{year}
            </Text>
            {getFilteredChartTooltipPayload(payload).map((item) => (
                <Text key={item.name} c={item.color} fz="lg">
                    ${new Intl.NumberFormat("en-US").format(item.value.toFixed(0))}
                </Text>
            ))}
        </Paper>
    );
}

function Chart() {
    const [data, setData] = useState<Price[]>([]);
    const [numberOfDays, setNumberOfDays] = useState<string>(INTERVALS.ONE_YEAR);
    const [change, setChange] = useState(0);

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            const prices = await fetchBtcChartData(numberOfDays);

            if (prices && prices.length) {
                const first = prices[0].v;
                const last = prices[prices.length - 1].v;

                setChange(((last - first) / first) * 100);
                setData(prices);
            }
        };

        fetchData();
    }, [numberOfDays]);

    const domains = useMemo(() => {
        const values = data.map((d) => d.v);

        return { min: Math.min(...values), max: Math.max(...values) };
    }, [data]);

    if (!data.length) {
        return (
            <>
                <Flex pb="xl" justify="flex-end" align="center">
                    <Group justify="space-between" w="100%">
                        <div>
                            <Skeleton height={14} mb={10} radius="md" w={100} />
                            <Skeleton height={18} radius="md" w={90} />
                        </div>
                        <Skeleton height={42} radius="md" w={180} />
                    </Group>
                </Flex>
                <Skeleton height={250} radius="md" w="100%" />
            </>
        );
    }

    return (
        <>
            <Flex pb="xl" justify="flex-end" align="center">
                <Group justify="space-between" w="100%">
                    <div>
                        <Text fz="sm" tt="uppercase" fw={600} lh={1} c="gray.6" mb={10}>
                            Price Chart
                        </Text>
                        <Text c={change > 0 ? "teal" : "red"} fz="lg" fw={500} lh={1} style={{ display: "flex", alignItems: "center" }}>
                            <span>{change.toFixed(2)}%</span>
                            {change > 0 ? <IconArrowUpRight size={16} stroke={1.5} /> : <IconArrowDownRight size={16} stroke={1.5} />}
                        </Text>
                    </div>
                    <SegmentedControl
                        w={190}
                        radius="md"
                        color="orange"
                        p={0}
                        bg="transparent"
                        withItemsBorders={false}
                        value={numberOfDays}
                        onChange={setNumberOfDays}
                        classNames={classes}
                        data={[
                            { label: "1M", value: INTERVALS.ONE_MONTH },
                            { label: "3M", value: INTERVALS.THREE_MONTHS },
                            { label: "6M", value: INTERVALS.SIX_MONTHS },
                            { label: "1Y", value: INTERVALS.ONE_YEAR },
                        ]}
                    />
                </Group>
            </Flex>
            <AreaChart
                h={250}
                data={data}
                dataKey="t"
                series={[{ name: "v", label: "Price", color: "orange" }]}
                curveType="natural"
                withXAxis={false}
                withYAxis={false}
                withDots={false}
                gridAxis="none"
                yAxisProps={{ domain: [domains.min, domains.max], padding: { bottom: 30, top: 10 } }}
                tooltipProps={{
                    content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                }}
            />
        </>
    );
}

export default Chart;
