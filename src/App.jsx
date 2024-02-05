import { BrowserRouter, Navigate, Outlet, Route, Routes, useNavigate, } from 'react-router-dom';

import AdminRoutes from './Features/Admin/AdminRoutes';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

import UserProvider from './hooks/UserRedux/UserProvider';




const queryClient = new QueryClient();
function App() {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path='/*' element={<AdminRoutes />} />
            <Route path='*' element={<></>} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </UserProvider>
  )
}

export default App
