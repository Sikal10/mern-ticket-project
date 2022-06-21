import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectAuthUser} from "../redux/slices/authSlice/authSlice";

export const useAuthStatus = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);
    const [userRole, setUserRole] = useState(false);

    const {user} = useSelector(selectAuthUser);

    useEffect(() => {
        if (user) {
            setIsAuthenticated(true);
            setUserRole(user.isAdmin);
        } else {
            setIsAuthenticated(false);
            setUserRole(false);
        }
        setCheckingStatus(false);
    }, [user]);

    return {isAuthenticated, checkingStatus, userRole}
}
