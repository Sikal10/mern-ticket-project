import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser} from "../redux/slices/userSlice/userSlice";
import {getAllUsers} from "../redux/slices/userSlice/userAPI";
import {selectAuthUser} from "../redux/slices/authSlice/authSlice";
import {toast} from "react-toastify";


const Users = () => {
    const {isAdmin, loading, success} = useSelector(selectAuthUser);
    const {errorMsg} = useSelector(selectCurrentUser);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsers());
    }, []);

    return (
        <div>
            This is a page for every user
        </div>
    );
};

export default Users;