import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./output.css";
import App from "./App.tsx";
import { HeroUIProvider } from "@heroui/system";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <HeroUIProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </HeroUIProvider>
    </StrictMode>
);
