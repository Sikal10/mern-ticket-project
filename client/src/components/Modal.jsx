import React, {useState} from 'react';
import {IoMdCloseCircleOutline} from "react-icons/io";
import {useDispatch} from "react-redux";
import {createTicketNote} from "../redux/slices/noteSlice/noteAPI";

const Modal = ({onCloseModal, ticketId}) => {
    const [note, setNote] = useState("");

    const dispatch = useDispatch();

    const onNoteSubmit = (e) => {
        e.preventDefault();
        dispatch(createTicketNote({ticketId, note}));
        onCloseModal();
    }

    return (
        <div className={"fixed top-0 right-0 h-screen grid place-items-center w-screen bg-black bg-opacity-70"}>
            <div className={"bg-white relative rounded-xl w-[40vw] h-fit pb-[50px]"}>
                <button onClick={onCloseModal} className={"absolute top-4 text-2xl text-red-600 right-3"}><IoMdCloseCircleOutline /></button>
                <h2 className={"text-[20px] font-semibold px-5 mt-5 py-1.5 text-gray-600"}>Add Note</h2>

                <form className={"mx-5 mx-auto mt-2 space-y-3"}>
                    <textarea value={note} onChange={e => setNote(e.target.value)} className={"w-full text-gray-600 border h-[90px] p-3 outline-0 border-gray-500 rounded-md"} placeholder={"Add Note"}/>

                    <button type={"submit"} onClick={onNoteSubmit} className={"bg-black text-white px-5 py-2 rounded-md"}>Submit</button>
                </form>

            </div>
        </div>
    );
};

export default Modal;