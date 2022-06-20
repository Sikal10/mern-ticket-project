import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {resetTicket, selectUserTicket} from "../redux/slices/ticketSlice/ticketSlice";
import Spinner from "../components/Spinner";
import {getTickets} from "../redux/slices/ticketSlice/ticketAPI";
import BackButton from "../components/BackButton";
import TicketItem from "../components/TicketItem";

const Tickets = () => {

    const {loading, success, tickets} = useSelector(selectUserTicket);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            if (success) {
                dispatch(resetTicket());
            }
        }
    }, [success, dispatch]);

    useEffect(() => {
        dispatch(getTickets());
    }, [dispatch]);

    if (loading === "loading") return <Spinner />

    return (
        <div>
            <BackButton url={"/"} />

            <h2 className={"font-semibold text-3xl text-gray-600 text-center"}>Tickets</h2>

            <div className={"mt-3"}>
                <div className={"tickets-heading"}>
                    <div>Date</div>
                    <div>Product</div>
                    <div>Status</div>
                    <div>Actions</div>
                </div>

                {tickets?.map((ticket) => <TicketItem ticket={ticket} key={ticket._id} />)}

            </div>
        </div>
    );
};

export default Tickets;