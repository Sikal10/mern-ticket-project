import {CgSpinner} from "react-icons/cg";

const Spinner = () => {
    return (
        <div className={"grid place-items-center h-[60vh]"}>
            <CgSpinner className={"text-6xl animate-spin "} />
        </div>
    );
};

export default Spinner;