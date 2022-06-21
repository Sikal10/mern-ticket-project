import React from 'react';
import {Link} from "react-router-dom";
import {MdLock} from "react-icons/md";

const AccessDenied = () => {
    return (
        <div className={"grid place-items-center"}>
            <p><MdLock className={"text-9xl text-gray-400"} /></p>
            <p className={"font-semibold text-[20px] text-gray-600 mt-5"}>Access Denied! You are not authorized to view this page!</p>
            <br/>
            <Link className={"px-10 mt-2 py-3 bg-gray-400 text-white border-0 rounded-md 0"} to={"/"}>Go Back</Link>
        </div>
    );
};

export default AccessDenied;