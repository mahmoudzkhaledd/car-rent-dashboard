import { Outlet, Route, Routes, Navigate, useResolvedPath, redirect, useNavigate } from 'react-router-dom';

import "./layout.css"
import Sidebar from './GeneralComponents/Sidebar/Sidebar';
import AdminMainPage from './Pages/MainPage/View/MainPage';
import RouteNotFound from './GeneralComponents/RouteNotFound/RouteNotFound';
import AdminLoginPage from './Auth/LoginPage/view/LoginPage';

import AdminProvider from '@/hooks/AdminRedux/AdminProvider';
import { adminAxios } from '@/Utils/AdminAxios';
import adminModel from '@/Models/AdminModel';
import { useDispatch } from 'react-redux';
import { setAdmin } from '@/hooks/AdminRedux/AdminModelSlice';
import Spinner from '@/GeneralElements/Spinner/Spinner';

import { QueryClientProvider, QueryClient, useQuery } from 'react-query';
import AdminUsersRouter from './Pages/Users/UsersRoutes';
import AdminsRouter from './Pages/Admins/AdminRoutes';
import AdminNavbar from './GeneralComponents/Navbar/AdminNavbar';
import SorryDiv from '@/GeneralComponents/SorryDiv/SorryDiv';
import { store } from '@/hooks/AdminRedux/AdminStore';
import PackagesRouter from './Pages/Packages/PackagesRoutes';

const protectedRoutes = [
    '/settings',
    "/verify-email",
]
function AuthWrapper() {
    const token = localStorage.getItem("a_token");
    const path = window.location.pathname;

    const disp = useDispatch();

    const { isLoading, error, data, refetch } = useQuery(
        "get-admin-by-token",
        () => adminAxios.post('login/token').then((d) => {
            const admin = adminModel.parse(d.data.admin);
            if (admin != null) {
                disp(setAdmin(d.data.admin));
            }
            return admin;
        }),
        {
            refetchOnWindowFocus: false,
            retry: 0,
            enabled: token != null,
        }
    );

    if (isLoading) {
        return <div className='w-screen h-screen flex flex-col items-center justify-center'>
            <Spinner className='text-2xl' />
        </div>;
    }

    if (data != null && token != null) {
        if (data.suspended) {
            localStorage.removeItem("a_token")
            window.location.href = "/login";
            return;
        }
        if (path == "/login") {
            window.location.href = "/"
            return;

        }
    } else {
        localStorage.removeItem("a_token")
        if (path != "/login") {
            window.location.href = "/login"
            return;
        } else {
            return <Outlet />;
        }
    }
    if (error != null) {

        if (error.response != null && error.response.status == 455) {
            localStorage.removeItem("a_token")
            window.location.href = "/login"
            return;
        }
        return <div className='w-screen h-screen flex flex-col justify-center items-center'>
            <SorryDiv message="يوجد مشكلة الرجاء المحاولة مرة اخرى" />
        </div>;
    }
    if (store.getState().admin.admin == null) {
        return <></>
    }
    return <Outlet />;
}
function AdminLayout() {
    const path = useResolvedPath();
    return (
        <div className="layout__container">
            <Sidebar selected={path.pathname == '/' ? "" : path.pathname.split('/')[1].split('/')[0]} className="layout__sidebar lg" />
            <div className="w-100 h-100 flex flex-col gap-5">
                <AdminNavbar />
                <div className='p-2 mb-6 md:p-6 h-screen'>

                    <Outlet />
                </div>
            </div>
        </div>
    )
}
const queryClient = new QueryClient();

export default function AdminRoutes() {
    return (
        <QueryClientProvider client={queryClient}>
            <AdminProvider>
                <Routes>
                    <Route element={<AuthWrapper />}>
                        <Route path='/login' element={<AdminLoginPage />} />
                        <Route element={<AdminLayout />} >
                            <Route path='/' element={<AdminMainPage />} />
                            <Route path='/packages/*' element={<PackagesRouter />} />
                            <Route path='/users/*' element={<AdminUsersRouter />} />
                            <Route path='/admins/*' element={<AdminsRouter />} />
                            <Route path='*' element={<RouteNotFound />} />
                        </Route>
                    </Route>
                </Routes>
            </AdminProvider>
        </QueryClientProvider>
    );
}
