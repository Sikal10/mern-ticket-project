import React from 'react';
import {useSelector} from "react-redux";
import {selectAuthUser} from "../redux/slices/authSlice/authSlice";

const UserProfile = () => {
    const {user} = useSelector(selectAuthUser);

    return (
        <div>
            This is the user profile page
        </div>
    );
};

export default UserProfile;