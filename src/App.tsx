import { useEffect, useState } from "react";

import { AppShell } from "@mantine/core";
import { useHeadroom } from "@mantine/hooks";

import "./App.css";
import Header from "./layouts/Header";
import Main from "./layouts/Main";
import { Stats } from "./types/Stats";

const BLOCKCHAIR_ENDPOINT = "https://api.blockchair.com/bitcoin/stats";

function App() {
    const pinned = useHeadroom({ fixedAt: 120 });
    const [stats, setStats] = useState<Stats | null>(null);

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                const response = await fetch(BLOCKCHAIR_ENDPOINT);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result: Stats = await response.json();
                setStats(result);
            } catch (err) {
                console.error(err);
            }
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
