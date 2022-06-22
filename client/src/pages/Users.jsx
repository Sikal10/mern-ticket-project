import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser} from "../redux/slices/userSlice/userSlice";
import {getAllUsers} from "../redux/slices/userSlice/userAPI";
import {selectAuthUser} from "../redux/slices/authSlice/authSlice";
import {toast} from "react-toastify";
import Spinner from "../components/Spinner";


const Users = () => {
    const {loading} = useSelector(selectAuthUser);
    const {errorMsg, users} = useSelector(selectCurrentUser);
    const dispatch = useDispatch();

    useEffect(() => {
        if (errorMsg) {
            toast.error(errorMsg)
        }

        dispatch(getAllUsers());
    }, [errorMsg]);

    if (loading === "loading") return <Spinner />

    return (
        <div>
            <div className={"user-list-heading"}>
                <div>ID</div>
                <div>Name</div>
                <div>Email</div>
                <div>isAdmin</div>
            </div>

            {users.map((user) => <div className={"user-list"} key={user._id}>
                <p>{user._id}</p>
                <p>{user.name}</p>
                <p>{user.email}</p>
                {user.isAdmin ? <p>Admin</p> : <p>User</p>}
            </div>)}

        </div>
    );
};

export default Users;