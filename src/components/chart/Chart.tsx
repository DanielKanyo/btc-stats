import { useEffect, useMemo, useState } from "react";

import { AreaChart } from "@mantine/charts";
import { Flex, Group, SegmentedControl, Skeleton, Text } from "@mantine/core";
import { IconArrowDownRight, IconArrowUpRight } from "@tabler/icons-react";

import { fetchBtcChartData } from "../../services/service";
import { Price } from "../../types/Data";
import classes from "./style.module.css";

function Chart() {
    const [data, setData] = useState<Price[]>([]);
    const [numberOfDays, setNumberOfDays] = useState<string>("365");
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
                        w={180}
                        radius="md"
                        color="orange"
                        p={0}
                        bg="transparent"
                        withItemsBorders={false}
                        value={numberOfDays}
                        onChange={setNumberOfDays}
                        classNames={classes}
                        data={[
                            { label: "1M", value: "31" },
                            { label: "3M", value: "91" },
                            { label: "6M", value: "182" },
                            { label: "1Y", value: "365" },
                        ]}
                    />
                </Group>
            </Flex>
            <AreaChart
                h={250}
                data={data}
                dataKey="t"
                series={[{ name: "v", color: "orange" }]}
                curveType="natural"
                withXAxis={false}
                withYAxis={false}
                withDots={false}
                gridAxis="none"
                yAxisProps={{ domain: [domains.min, domains.max], padding: { bottom: 30, top: 10 } }}
            />
        </>
    );
}

export default Chart;
