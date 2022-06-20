import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {selectAuthUser} from "../redux/slices/authSlice/authSlice";
import {createTicket} from "../redux/slices/ticketSlice/ticketAPI";
import {resetTicket, selectUserTicket} from "../redux/slices/ticketSlice/ticketSlice";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const NewTicket = () => {
    const {user} = useSelector(selectAuthUser);
    const {loading, errorMsg, success} = useSelector(selectUserTicket);

    const [name] = useState(user?.name);
    const [email] = useState(user?.email);
    const [product, setProduct] = useState("");
    const [description, setDescription] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (errorMsg) {
            toast.error(errorMsg)
        }

        if (success) {
            dispatch(resetTicket());
            navigate("/ticket");
        }

        dispatch(resetTicket());
    }, [errorMsg, success, dispatch, navigate]);

    const handleCreateTicket = (e) => {
        e.preventDefault();
        dispatch(createTicket({product, description}));
    }

    if (loading === "loading") return <Spinner />

    return (
        <div>
            <BackButton url={"/"} />

            <section className={"space-y-2"}>
                <h1 className={"font-semibold text-gray-600 text-center text-2xl"}>Create New Ticket</h1>
                <p className={"text-gray-600 text-center text-[18px]"}>Please fill out the form below</p>
            </section>

            <section className={"space-y-3"}>
                <div className={"space-y-1"}>
                    <label htmlFor="">Customer Name</label>
                    <input style={{border: "1px solid lightgray"}} className={"signup-input rounded-md px-2 py-2"} type="text" value={name} disabled />
                </div>

                <div className={"space-y-1"}>
                    <label htmlFor="">Customer Email</label>
                    <input style={{border: "1px solid lightgray"}} className={"signup-input rounded-md px-2 py-2"} type="text" value={email} disabled />
                </div>

                <form className={"space-y-2"} action="">
                    <div className={"space-y-1"}>
                        <label htmlFor="">Product</label>
                        <select style={{border: "1px solid lightgray"}} className={"signup-input rounded-md px-2 py-2"} name="product" id="product" value={product} onChange={e => setProduct(e.target.value)}>
                            <option value="iPhone">iPhone</option>
                            <option value="Macbook Pro">Macbook Pro</option>
                            <option value="iMac">iMac</option>
                            <option value="iPad">iPad</option>
                        </select>
                    </div>

                    <div className={"space-y-1"}>
                        <label htmlFor="">Description of the issue</label>
                        <textarea style={{border: "1px solid lightgray"}} className={"signup-input rounded-md px-2 py-2"} name={"description"} placeholder={"Description"} value={description} onChange={e => setDescription(e.target.value)}>
                        </textarea>
                    </div>

                    <button onClick={handleCreateTicket} className="w-full py-2.5 text-center bg-black border text-white border-gray-500 rounded-md">Submit</button>
                </form>

            </section>

        </div>
    );
};

export default NewTicket;