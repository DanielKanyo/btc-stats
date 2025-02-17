import { Card, Text, NumberFormatter } from "@mantine/core";

interface StatCardPops {
    label: string;
    value: string | number | undefined;
    prefix?: string;
    format?: boolean;
}

function SimpleStatCard({ label, value, prefix, format }: StatCardPops) {
    return (
        <Card shadow="xl" padding="xl" radius="lg">
            <Text fz="sm" tt="uppercase" fw={600} lh={1} mb={12} c="gray.6">
                {label}
            </Text>
            <Text fz={45} fw={500} lh={1}>
                {format ? <NumberFormatter prefix={prefix} value={value} thousandSeparator /> : value}
            </Text>
        </Card>
    );
}

export default SimpleStatCard;
