import {Link} from "react-router-dom";

const Home = () => {

    return (
        <div className={""}>
            <h2 className={"text-center font-semibold text-gray-600 text-[35px]"}>What do you need help with?</h2>
            <p className={"text-center text-[18px] text-gray-600"}>Please choose from an option below</p>

            <div className={"max-w-5xl space-y-6 mt-[40px]"}>
                <Link className={"block"} to={"/new-ticket"}>
                    <button className="w-full py-2.5 text-center bg-transparent border text-gray-700 border-gray-500 rounded-md">Create New Ticket</button>
                </Link>

                <Link className={"block"} to={"/tickets"}>
                    <button className="w-full py-2.5 text-center bg-black border text-white border-gray-500 rounded-md">View My Tickets</button>
                </Link>
            </div>

        </div>
    );
};

export default Home;