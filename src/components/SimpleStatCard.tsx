import { Card, Text, NumberFormatter, Skeleton, Group } from "@mantine/core";
import { IconArrowDownRight, IconArrowUpRight } from "@tabler/icons-react";

interface StatCardProps {
    label: string;
    value: string | number | undefined;
    prefix?: string;
    format?: boolean;
    change?: number;
}

function SimpleStatCard({ label, value, prefix, format, change }: StatCardProps) {
    return (
        <Card shadow="xl" padding="xl" radius="lg">
            {value != null ? (
                <>
                    <Text fz="sm" tt="uppercase" fw={600} lh={1} mb={12} c="gray.6">
                        {label}
                    </Text>
                    <Group align="baseline" gap="xs">
                        <Text fz={42} fw={500} lh={1}>
                            {format ? <NumberFormatter prefix={prefix} value={value} thousandSeparator /> : value}
                        </Text>
                        {change ? (
                            <Text c={change > 0 ? "teal" : "red"} fz="sm" fw={500} lh={1} style={{ display: "flex", alignItems: "center" }}>
                                <span>{change.toFixed(2)}%</span>
                                {change > 0 ? <IconArrowUpRight size={16} stroke={1.5} /> : <IconArrowDownRight size={16} stroke={1.5} />}
                            </Text>
                        ) : null}
                    </Group>
                </>
            ) : (
                <>
                    <Skeleton height={14} mb={12} radius="lg" w="40%" />
                    <Skeleton height={42} radius="lg" w="80%" />
                </>
            )}
        </Card>
    );
}

export default SimpleStatCard;
