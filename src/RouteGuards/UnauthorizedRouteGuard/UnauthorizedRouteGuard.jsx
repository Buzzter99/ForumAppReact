import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router';
import userService from '../../Services/userService';
const UnauthorizedRouteGuard = () => {
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
    if (user.statusCode !== 200) {
        return <Navigate to={"/404"} replace />;
    }
    return <Outlet />;
};
export default UnauthorizedRouteGuard;