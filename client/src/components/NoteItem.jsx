import React from 'react';
import {useSelector} from "react-redux";
import {selectAuthUser} from "../redux/slices/authSlice/authSlice";

const NoteItem = ({note}) => {
    const {user} = useSelector(selectAuthUser);
    return (
        <div style={{background: note.isStaff && "rgba(0,0,0,.7)", color: note.isStaff && "white"}} className={"flex rounded-md bg-slate-100 border mt-4 justify-between px-3 py-3"}>
            <div>
                <h2 className={"font-semibold text-[18px]"}>Note from {note.isStaff ? <span>Staff</span> : <span>{user.name}</span>}</h2>
                <p>{note.note}</p>
            </div>

            <div>{new Date(note.createdAt).toLocaleString("en-US")}</div>
        </div>
    );
};

export default NoteItem;