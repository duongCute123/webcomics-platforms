import { AiOutlineLoading3Quarters } from "react-icons/ai";
import fpt from "../../images/logo-fpt-play.png";

const AnimationLoading = () => {
    return (
        <div className="min-h-screen bg-black flex flex-col gap-10 justify-center items-center">
            <div className="flex flex-col justify-center items-center">
                <img src={fpt} alt="" />
            </div>
            <div className="flex flex-col justify-center items-center">
                <AiOutlineLoading3Quarters size={"40px"} color="white" className="animate-spin" />
            </div>
        </div>
    );
};

export default AnimationLoading;