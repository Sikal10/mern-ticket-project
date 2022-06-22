import BackButton from "../components/BackButton";
import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {selectUserTicket} from "../redux/slices/ticketSlice/ticketSlice";
import Spinner from "../components/Spinner";
import {toast} from "react-toastify";
import {getTicket, closeTicket} from "../redux/slices/ticketSlice/ticketAPI";
import {useParams, useNavigate} from "react-router-dom";
import {selectTicketNotes} from "../redux/slices/noteSlice/noteSlice";
import {getTicketNotes} from "../redux/slices/noteSlice/noteAPI";
import NoteItem from "../components/NoteItem";
import Modal from "../components/Modal";

const Ticket = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);

    const closeModal = () => setIsModalOpen(false);

    const {loading, errorMsg, ticket} = useSelector(selectUserTicket);
    const {loading: isNotesLoading, notes} = useSelector(selectTicketNotes);

    /** get the ID from the url using useParams */
    const {ticketId} = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (errorMsg) {
            toast.error(errorMsg);
        }

        dispatch(getTicket(ticketId));
        dispatch(getTicketNotes(ticketId));

    }, [ticketId, dispatch, errorMsg])

    if (loading === "loading" || isNotesLoading === "loading") {
        return <Spinner/>;
    }

    const handleCloseTicket = () => {
        dispatch(closeTicket(ticketId));
        toast.success("Ticket closed");
        setTimeout(() => {
            navigate("/tickets");
        }, 1500)
    }

    return (
        <>
            <div>
                <BackButton url={"/tickets"}/>

                <div className={"flex mt-5 mb-2 items-center justify-between"}>
                    <p>Ticket ID: {ticket._id}</p>
                    <p className={`status status-${ticket.status}`}>{ticket.status}</p>
                </div>
                <p>Date Submitted: {new Date(ticket.createdAt).toLocaleString("en-US")}</p>
                <p className={"mt-2 font-semibold"}>Product: {ticket.product}</p>
                <hr className={"mt-2 mb-4"}/>

                <div className={"bg-slate-200 space-y-2 px-4 py-2 rounded-md"}>
                    <h2 className={"text-[18px] font-semibold"}>Description of issue</h2>
                    <p>{ticket.description}</p>
                </div>

                <h2 className={"font-bold text-[19px] my-2"}>Notes</h2>

                {ticket.status !== "closed" && <button className={"bg-gray-600 text-white px-5 py-2 rounded-md"} onClick={openModal}> Add Note</button>}

                {notes.map((note) => <NoteItem key={note._id} note={note} />)}

                {isModalOpen && <Modal ticketId={ticketId} onCloseModal={closeModal} />}

                {ticket.status !== "closed" && <button onClick={handleCloseTicket} className={"mt-5 w-full bg-red-700 text-white py-2 rounded-md border-0"}>Close Ticket</button>}
            </div>
        </>
    );
};

export default Ticket;