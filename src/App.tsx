import { useEffect, useState } from "react";

import { AppShell } from "@mantine/core";
import { useHeadroom } from "@mantine/hooks";

import "./App.css";
import Header from "./layouts/Header";
import Main from "./layouts/Main";
import { fetchBtcStats } from "./services/service";
import { Stats } from "./types/Data";

function App() {
    const pinned = useHeadroom({ fixedAt: 120 });
    const [stats, setStats] = useState<Stats | null>(null);

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            setStats(await fetchBtcStats());
        };

        fetchData();
    }, []);

    return (
        <AppShell header={{ height: 100, collapsed: !pinned, offset: false }} padding="md" withBorder={false}>
            <AppShell.Header>
                <Header />
            </AppShell.Header>
            <AppShell.Main pt={100}>
                <Main stats={stats} />
            </AppShell.Main>
        </AppShell>
    );
}

export default App;
