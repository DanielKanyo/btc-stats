import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@mantine/charts/styles.css";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";

import App from "./App.tsx";
import "./index.css";

const theme = createTheme({
    /** Put your mantine theme override here */
});

createRoot(document.getElementById("root")!).render(
    <MantineProvider theme={theme} defaultColorScheme="dark">
        <StrictMode>
            <App />
        </StrictMode>
    </MantineProvider>
);
