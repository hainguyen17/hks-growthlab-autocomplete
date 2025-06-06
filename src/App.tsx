import { Route, Routes } from "react-router";
import { AutocompletePage } from "./pages/AutocompletePage";
import { ProductSpacePage } from "./pages/ProductSpacePage";

function App() {
    return (
        <div className="h-screen w-screen">
            <div className="h-full w-full flex flex-col items-center justify-center">
                <div className="flex row gap-4">
                    <a href="/">Autocomplete</a>
                    <a href="/product-space">Product Space</a>
                </div>
                <Routes>
                    <Route path="/" element={<AutocompletePage />} />
                    <Route
                        path="/product-space"
                        element={<ProductSpacePage />}
                    />
                </Routes>
            </div>
        </div>
    );
}

export default App;
