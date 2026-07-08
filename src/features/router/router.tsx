import { createBrowserRouter } from "react-router-dom"
import SimulatorPage from "../pages/SimulatorPage"
import ProductPage from "../pages/ProductPage"
import SettingsPage from "../pages/SettingsPage"
import RootLayout from "../pages/RootLayout"

export const router = createBrowserRouter([
    { path: "/", element: <RootLayout />, children: [
        { index: true, element: <SimulatorPage />},
        { path: "/products", element: <ProductPage /> },
        { path: "/settings", element: <SettingsPage /> }
        
    ]}

])