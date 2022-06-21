import BackButton from "../components/BackButton";
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {selectUserTicket} from "../redux/slices/ticketSlice/ticketSlice";
import Spinner from "../components/Spinner";
import {toast} from "react-toastify";
import {getTicket, closeTicket} from "../redux/slices/ticketSlice/ticketAPI";
import {useParams, useNavigate} from "react-router-dom";

const Ticket = () => {
    const {loading, errorMsg, ticket} = useSelector(selectUserTicket);

    /** get the ID from the url using useParams */
    const {ticketId} = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (errorMsg) {
            toast.error(errorMsg);
        }

        dispatch(getTicket(ticketId));
    }, [ticketId, dispatch, errorMsg])

    if (loading === "loading") {
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

                {ticket.status !== "closed" && <button onClick={handleCloseTicket} className={"mt-5 w-full bg-red-700 text-white py-2 rounded-md border-0"}>Close Ticket</button>}
            </div>
        </>
    );
};

export default Ticket;