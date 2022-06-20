import {Link} from "react-router-dom";

const Home = () => {
    return (
        <div>

            <Link to={"/profile"}>Profile</Link>
        </div>
    );
};

export default Home;