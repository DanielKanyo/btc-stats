import { AppShell } from "@mantine/core";
import { useHeadroom } from "@mantine/hooks";

import "./App.css";
import Header from "./components/Header";

function App() {
    const pinned = useHeadroom({ fixedAt: 120 });

    return (
        <AppShell header={{ height: 80, collapsed: !pinned, offset: false }} padding="md">
            <AppShell.Header>
                <Header />
            </AppShell.Header>

            <AppShell.Main pt={96}>Main</AppShell.Main>
        </AppShell>
    );
}

export default App;
