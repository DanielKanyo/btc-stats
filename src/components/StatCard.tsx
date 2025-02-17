import { Card, Text } from "@mantine/core";

interface StatCardPops {
    label: string;
    value: string | number;
}

function StatCard({ label, value }: StatCardPops) {
    return (
        <Card shadow="xl" padding="xl" radius="lg">
            <Text fz="sm" tt="uppercase" fw={600} lh={1} mb={14}>
                {label}
            </Text>
            <Text fz={45} fw={500} lh={1}>
                {value}
            </Text>
        </Card>
    );
}

export default StatCard;
