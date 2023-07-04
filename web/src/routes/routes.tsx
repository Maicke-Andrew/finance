import { GoogleOAuthProvider } from '@react-oauth/google'
import { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import { AuthProvider } from '../Contexts/Auth/AuthProvider'
import { NotRequireAuth, RequireAuth } from '../Contexts/Auth/RequireAuth'
import Home from '../pages/Home'
import FeedBack from '../pages/FeedBack'
import ChangePassword from '../pages/UserPages/ChangePassword'
import Login from '../pages/UserPages/Login'
import NewPassword from '../pages/UserPages/NewPassword'
import Register from '../pages/UserPages/Register'
import ValidateEmailToRegister from '../pages/UserPages/ValidateEmailToRegister'

const RouteUpdateListener = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        if (pathname !== '/') {
            localStorage.setItem('lastVisitedRoute', pathname);
        }
    }, [pathname]);

    return null;
};

const AllRoutes = () => {

    return (
        <GoogleOAuthProvider clientId='356906246768-10osjvud1smfba7a2vnc6clv1j3kujiq.apps.googleusercontent.com'>
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
                        <Route path="/" element={<NotRequireAuth><Login /></NotRequireAuth>} />
                        <Route path="/newpassword" element={<NotRequireAuth><NewPassword /></NotRequireAuth>} />
                        <Route path="/validatemail" element={<NotRequireAuth><ValidateEmailToRegister /></NotRequireAuth>} />
                        <Route path="/register" element={<NotRequireAuth><Register /></NotRequireAuth>} />
                        <Route path="/createNewPassword" element={<NotRequireAuth><ChangePassword /></NotRequireAuth>} />
                        <Route path="/feedback" element={<RequireAuth><FeedBack /></RequireAuth>} />
                    </Routes>
                    <RouteUpdateListener />
                </Router>
            </AuthProvider>
        </GoogleOAuthProvider>
    )
}

export default AllRoutes