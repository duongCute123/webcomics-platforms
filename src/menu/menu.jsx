import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import logo from "../images/logo.83be12af.svg"
import { MdHistory } from "react-icons/md";
const Menu = () => {
    const HandlerEnter = () => {

    }
    const slug = "all"
    return (
        <div className="flex flex-row justify-between bg-blue-600 text-white items-center w-full mx-auto px-3 pt-3">
            <div className=" gap-2 flex flex-row items-center text-center">
                <div className="">
                    <img className="bg-no-repeat bg-cover" width={"40px"} src={logo} alt="" />
                </div>
                <div className="font-bold text-green-500/95 text-2xl">
                    <h1>Truyện tranh</h1>
                </div>
            </div>
            {/* Trên thiết bị mấy tính và các màn hình lớn */}
            <nav className="hidden md:block">
                <ul className="flex flex-row gap-9 font-bold">
                    <li>
                        <Link to={'/'} about="home">Home</Link>
                    </li>
                    <li>
                        <Link to={`/comics-genres?type=${slug}`} about="genres">Genres Manga</Link>
                    </li>
                    <li>
                        <Link to={'/'} about="new">Manga New</Link>
                    </li>
                    <li>
                        <Link to={'/'} about="top">Manga Top</Link>
                    </li>
                </ul>
            </nav>
            {/* Trên thiết bị điện thoại có màn hình nhỏ */}
            <div className="flex  flex-row items-center">
                <div className="">
                    <MdHistory color="blue" size={25} />
                </div>
                <div className="flex flex-row items-center mx-2">
                    <input type="text" className="border-2 border-solid border-black text-black" onKeyPress={HandlerEnter} placeholder="Nhập truyện muốn tìm" />
                    <CiSearch className="absolute right-6" color="black" size={25} />
                </div>
            </div>
        </div>
    )
}
export default Menu