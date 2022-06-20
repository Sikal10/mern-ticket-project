import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectAuthUser} from "../redux/slices/authSlice/authSlice";

export const useAuthStatus = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);

    const {user} = useSelector(selectAuthUser);

    useEffect(() => {
        if (user) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
        setCheckingStatus(false);
    }, [user, isAuthenticated]);

    return {isAuthenticated, checkingStatus}
}
