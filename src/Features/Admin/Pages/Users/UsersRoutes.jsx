import { Route, Routes } from "react-router-dom";
import UsersMainPage from "./pages/MainPage/view/MainPage";
import AdminUserPage from "./pages/UserPage/AdminUserPage";

export default function AdminUsersRouter() {
    return (
        <Routes>
            <Route path="/" element={<UsersMainPage />} />
            <Route path="/:id" element={<AdminUserPage />} />

        </Routes>
    ); 
}