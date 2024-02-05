import { Route, Routes } from "react-router-dom";
import MainPage from "./Pages/MainPage/View/MainPage";
import AddNewPackage from "./Pages/AddNewPackage/view/AddNewPackage";
import PackagePage from "./Pages/PackagePage/PackagePage";

export default function PackagesRouter() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/:id" element={<PackagePage />} />
            <Route path="/add-package" element={<AddNewPackage />} />
        </Routes>
    );
}