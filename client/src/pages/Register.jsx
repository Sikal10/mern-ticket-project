import {FaUser} from "react-icons/fa";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useDispatch, useSelector} from "react-redux";
import {selectAuthUser} from "../redux/slices/authSlice/authSlice";
import {registerUser} from "../redux/slices/authSlice/authAPI";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {resetUser} from "../redux/slices/authSlice/authSlice";

/** yup schema for validation-- */
const schema = yup.object().shape({
    name: yup.string().trim().required("Name is Required"),
    email: yup.string().email().required("Please enter a valid email address"),
    password: yup.string().min(5).max(32).required(),
    confirmPassword: yup.string().required("Passwords do not match").oneOf([yup.ref("password"), null], "Passwords don't match")
});

const Register = () => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm({resolver: yupResolver(schema)});

    const {loading, success, user, errorMsg} = useSelector(selectAuthUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (errorMsg) {
            toast.error(errorMsg);
        }

        if (success || user) {
            navigate("/");
        }

        dispatch(resetUser());

    }, [errorMsg, success, user, dispatch, navigate]);

    const handleRegister = (data) => {
        dispatch(registerUser(data));
    }

    return (
        <div>
            <h2 className={"flex justify-center font-semibold text-gray-600 items-center gap-1"}>
                <FaUser />
                <span>Login</span>
            </h2>

            <p className={"mt-4 font-semibold text-center text-[22px] text-gray-600"}>Please create an account</p>

            <section className={"max-w-5xl mx-auto mt-12"}>
                <form onSubmit={handleSubmit(handleRegister)} className={"space-y-5"}>
                    <div className={"signup__input-container"}>
                        <input className={"signup-input"} name={"name"} {...register("name")} type="text" placeholder={"Name"}/>
                        <p className={"error-message"}>{errors.name?.message}</p>
                    </div>
                    <div className={"signup__input-container"}>
                        <input className={"signup-input"} name={"email"} {...register("email")} type="email" placeholder={"Email"}/>
                        <p className={"error-message"}>{errors.email?.message}</p>
                    </div>
                    <div className={"signup__input-container"}>
                        <input className={"signup-input"} name={"password"} {...register("password")} type="password" placeholder={"Password"}/>
                        <p className={"error-message"}>{errors.password?.message}</p>
                    </div>
                    <div className={"signup__input-container"}>
                        <input className={"signup-input"} name={"confirmPassword"} {...register("confirmPassword")} type="password" placeholder={"Confirm Password"}/>
                        <p className={"error-message"}>{errors.confirmPassword?.message}</p>
                    </div>

                    <button className={"w-full bg-[#222] text-center text-white py-3 rounded-md"}>Submit</button>
                </form>
            </section>
        </div>
    );
};

export default Register;