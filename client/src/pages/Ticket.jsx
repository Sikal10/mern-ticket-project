import BackButton from "../components/BackButton";
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {resetTicket, selectUserTicket} from "../redux/slices/ticketSlice/ticketSlice";
import Spinner from "../components/Spinner";
import {toast} from "react-toastify";
import {getTicket} from "../redux/slices/ticketSlice/ticketAPI";
import {useParams} from "react-router-dom";

const Ticket = () => {
    const {loading, errorMsg, ticket, success} = useSelector(selectUserTicket);

    /** get the ID from the url using useParams */
    const {ticketId} = useParams();

    const dispatch = useDispatch();


    useEffect(() => {

        if (errorMsg) {
            toast.error(errorMsg);
        }

        dispatch(getTicket(ticketId));
    }, [ticketId, dispatch, errorMsg])

    if (loading === "loading") {
        console.log("hi")
        return <Spinner/>;
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
                <hr className={"mt-2 mb-4"}/>

                <div className={"bg-slate-200 space-y-2 px-4 py-2 rounded-md"}>
                    <h2 className={"text-[18px] font-semibold"}>Description of issue</h2>
                    <p>{ticket.description}</p>
                </div>
            </div>
        </>
    );
};

export default Ticket;