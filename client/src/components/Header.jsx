import {FaSignInAlt, FaUser, FaSignOutAlt} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectAuthUser} from "../redux/slices/authSlice/authSlice";
import {logoutUser} from "../redux/slices/authSlice/authAPI";
import {resetUser} from "../redux/slices/authSlice/authSlice";

const Header = () => {

    const {user} = useSelector(selectAuthUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutUser());
        dispatch(resetUser());
        navigate("/");
    }

    return (
        <header className={"py-4 pt-10 flex items-center justify-between"}>
            <Link to={"/"}><p className={"font-semibold text-gray-500"}>Support Desk</p></Link>

            {user ?
                <div className={"flex items-center px-3 py-1 rounded-md bg-black text-gray-400 gap-2"} onClick={handleLogout}>
                    <FaSignOutAlt/>
                    <p>Logout</p>
                </div> :
                <div className={"flex items-center gap-4"}>
                    <Link to={"/login"}>
                        <div className={"flex items-center gap-2 text-gray-500"}>
                            <FaSignInAlt/>
                            <span>Login</span>
                        </div>
                    </Link>

                    <Link to={"/register"}>
                        <div className={"flex items-center gap-2 text-gray-500"}>
                            <FaUser/>
                            <span>Register</span>
                        </div>
                    </Link>

                </div>}
        </header>
    );
};

export default Header;