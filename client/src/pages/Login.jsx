import React from 'react';
import {FaUser} from "react-icons/fa";
import {loginUser} from "../redux/slices/authSlice/authAPI";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useDispatch} from "react-redux";
import * as yup from "yup";

/** yup schema for validation-- */
const schema = yup.object().shape({
    email: yup.string().email().required("Please enter a valid email address"),
    password: yup.string().min(5).max(32).required(),
});

const Login = () => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm({resolver: yupResolver(schema)});

    const dispatch = useDispatch();

    const handleLogin = (data) => {
        console.log("dispatch")
        dispatch(loginUser(data));
    }


    return (
        <div>
            <h2 className={"flex justify-center font-semibold text-gray-600 items-center gap-1"}>
                <FaUser />
                <span>Login</span>
            </h2>

            <p className={"mt-4 font-semibold text-center text-[22px] text-gray-600"}>Please log in to get support</p>

            <section className={"max-w-5xl mx-auto mt-12"}>
                <form onSubmit={handleSubmit(handleLogin)} className={"space-y-5"}>
                    <div className={"signup__input-container"}>
                        <input className={"signup-input"} name={"email"} {...register("email")} type="email" placeholder={"Email"}/>
                        <p className={"error-message"}>{errors.email?.message}</p>
                    </div>
                    <div className={"signup__input-container"}>
                        <input className={"signup-input"} name={"password"} {...register("password")} type="password" placeholder={"Password"}/>
                        <p className={"error-message"}>{errors.password?.message}</p>
                    </div>

                    <button className={"w-full bg-[#222] text-center text-white py-3 rounded-md"}>Submit</button>
                </form>
            </section>
        </div>
    );
};

export default Login;