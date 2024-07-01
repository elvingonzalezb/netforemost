import React from 'react';
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider
} from "react-router-dom";
import ProtectedRoute from "./protectedRoute";
import Dashboard from "@/components/app/dashboard";
import AuthLogin from '@/components/auth/AuthLogin';
import AuthRegister from '@/components/auth/AuthRegister';    
import AuthForgotPassword from '@/components/auth/AuthForgotPassword';
import NotFound from '@/components/message/NotFound';
import Article from '@/components/general/Article';
import Information from '@/components/general/Information';
import Load from '@/components/general/Load';

interface IndexProps {
    token: string | null | undefined;
}

const Index: React.FC<IndexProps> = ({ token }) => {  
    const router = createBrowserRouter(
        createRoutesFromElements(
        <Route path="/">
            <Route element={<ProtectedRoute token={token} />}>
                <Route index element={<Dashboard token={token}/>} /> 
                <Route path="articles" element={<Article token={token} />} />
                <Route path="information" element={<Information token={token} />} />
                <Route path="load" element={<Load token={token} />} />
            </Route>
            {/* Rutas publicas */ }
            <Route path="signin" element={<AuthLogin />} />
            <Route path="signup" element={<AuthRegister />} />
            <Route path="forgot" element={<AuthForgotPassword />} />
            <Route path="*" element={<NotFound />} />
        </Route>
        )
    );      
    return <RouterProvider router={router} />;
};

export default Index;
