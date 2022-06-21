import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {selectCurrentUser} from "../redux/slices/userSlice/userSlice";
import {toast} from "react-toastify";
import Spinner from "../components/Spinner";
import {getCurrentUser} from "../redux/slices/userSlice/userAPI";

const UserProfile = () => {
    const {loading, currentUser, errorMsg} = useSelector(selectCurrentUser);
    const dispatch = useDispatch();

    useEffect(() => {
        if (errorMsg) {
            toast.error(errorMsg);
        }

        dispatch(getCurrentUser());

    }, [errorMsg, dispatch]);

    if (loading === "loading") return <Spinner />

    return (
        <div>
            <h2 className={"text-3xl text-center font-semibold text-gray-600"}>Welcome {currentUser?.name}</h2>
        </div>
    );
};

export default UserProfile;