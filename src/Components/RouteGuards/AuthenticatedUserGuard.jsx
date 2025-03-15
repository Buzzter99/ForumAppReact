import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router';
import { isAuthenticated } from '../../Services/userService';
const AuthenticatedUserGuard = () => {
    const [user, setUser] = useState({});
    useEffect(() => {
        isAuthenticated()
            .then((data) => {
                setUser(data);
            })
            .catch(() => {
                setUser({});
            });
    }, []);
    if (user.statusCode === 200) {
        return <Navigate to={"/home"} replace />;
    }
    return <Outlet />;
};
export default AuthenticatedUserGuard;