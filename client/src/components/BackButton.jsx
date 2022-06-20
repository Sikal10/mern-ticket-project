import {Link} from "react-router-dom";
import {FaArrowCircleLeft} from "react-icons/fa";

const BackButton = ({url}) => {
    return (
            <Link className={"bg-gray-500 rounded-md text-white py-2 px-6 w-[120px] border-red-400 flex items-center gap-3"} to={url}>
                <FaArrowCircleLeft />
                <span>Back</span>
            </Link>
    );
};

export default BackButton;