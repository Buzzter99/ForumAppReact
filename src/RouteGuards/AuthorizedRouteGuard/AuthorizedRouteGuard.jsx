import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router';
import userService from '../../Services/userService';
const AuthorizedRouteGuard = () => {
    const [user, setUser] = useState({});
    useEffect(() => {
        userService.isAuthenticated()
            .then((data) => {
                setUser(data);
            })
            .catch(() => {
                setUser({});
            });
    }, []);
    if (user.statusCode && user.statusCode === 200) {
        return <Navigate to={"/home"} replace />;
    }
    return <Outlet />;
};
export default AuthorizedRouteGuard;