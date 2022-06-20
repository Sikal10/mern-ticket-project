import {Navigate, Outlet} from "react-router-dom";
import {useAuthStatus} from "../hooks/useAuthStatus";

const ProtectedRoute = () => {
    const {checkingStatus, isAuthenticated} = useAuthStatus();

    if (checkingStatus) {
        return <h2>Loading...</h2>
    }

    return isAuthenticated ? <Outlet /> : <Navigate to={"/login"} />

};

export default ProtectedRoute;