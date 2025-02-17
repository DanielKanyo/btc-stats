import { AppShell, Grid, Card } from "@mantine/core";
import { useHeadroom } from "@mantine/hooks";

import "./App.css";
import Header from "./components/Header";
import StatCard from "./components/StatCard";

function App() {
    const pinned = useHeadroom({ fixedAt: 120 });

    return (
        <AppShell header={{ height: 100, collapsed: !pinned, offset: false }} padding="md" withBorder={false}>
            <AppShell.Header>
                <Header />
            </AppShell.Header>

            <AppShell.Main pt={100}>
                <Grid>
                    <Grid.Col span={8}>
                        <Grid>
                            <Grid.Col span={4}>
                                <StatCard label="Current Price" value="$96,325" />
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <StatCard label="Latest Block" value="884,120" />
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <StatCard label="Average Time Between Blocks" value="10m 45s" />
                            </Grid.Col>
                            <Grid.Col>
                                <Card shadow="xl" padding="lg" radius="lg">
                                    d
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
            </AppShell.Main>
        </AppShell>
    );
}

export default App;
