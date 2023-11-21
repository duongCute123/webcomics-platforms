import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.83be12af.svg"
import { IoHomeOutline } from "react-icons/io5";
import { GiCrown } from "react-icons/gi";
import { FaAutoprefixer } from "react-icons/fa";
import { PiNewspaperClippingLight } from "react-icons/pi";
import { GiBurningRoundShot } from "react-icons/gi";
import { FaCircleCheck } from "react-icons/fa6";
import { RxUpdate } from "react-icons/rx";
import { BsGenderMale } from "react-icons/bs";
import { CgGenderFemale } from "react-icons/cg";
import { MdHistory } from "react-icons/md";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { search } from "../store/search/search";
import InputSearch from "./subnav/inputsearch";
const Menu = () => {
    const searchdata = useSelector(state => state.searchcomics)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const navigation = useNavigate()
    const [query, setQuery] = useState()
    const [isShow, setIsShow] = useState(false)
    const HandlerEnter = (e) => {
        if (e.key === 'Enter') {
            navigation('/comics/seach')
        }
    }

    useEffect(() => {
        dispatch(search.searchSuggest(query))
    }, [dispatch, query])
    const type = "all"
    return (
        <div className="flex flex-row justify-between bg-white shadow-md h-12 md:h-14 text-black items-center w-full mx-auto px-3 pt-y3">
            <div className="flex flex-row justify-between z-50 items-center">
                <div className="gap-2 flex flex-row items-center text-center">
                    <div className="">
                        <img className="bg-no-repeat bg-cover" width={"40px"} src={logo} alt="" />
                    </div>
                    <div className="font-bold text-green-500/95 text-2xl">
                        <h1>Truyện tranh</h1>
                    </div>
                </div>
                <div className="text-3xl absolute right-0 md:hidden" onClick={() => { setOpen(!open) }}>
                    <ion-icon name={`${open ? 'close' : 'menu'}`}></ion-icon>
                </div>
            </div>
            {/* Trên thiết bị mấy tính và các màn hình lớn */}
            <nav className="hidden md:block">
                <ul className="flex flex-row gap-9 font-bold">
                    <li>
                        <Link to={'/'} about="home">Home</Link>
                    </li>
                    <li>
                        <Link to={`/comics-genres/${type}`} about="genres">Genres</Link>
                    </li>
                    <li>
                        <Link to={`/comics/news/${type}`} about="new">New</Link>
                    </li>
                    <li>
                        <Link to={`/comics/top?${type}`} about="top">Top</Link>
                    </li>
                </ul>
            </nav>
            <div className="hidden md:block">
                <InputSearch />
            </div>
            {/* Trên thiết bị điện thoại có màn hình nhỏ */}
            <div className={` overflow-y-auto
                    md:hidden absolute bg-white w-full h-full pl-4 z-20 bottom-0
                    py-24 duration-500 ${open ? 'left-0' : 'left-[-100%]'}
                    `}>
                <div className="flex flex-row justify-center items-center gap-8">
                    <input type="text" placeholder="Vui lòng nhập tên truyện cần tìm" className="w-11/12 text-black text-lg h-10 rounded-full border-2 border-solid border-red-400" />
                    <CiSearch size={40} className="font-bold absolute right-4 text-3xl" />
                </div>
                <ul className="mx-5 my-6 gap-5 text-lg grid font-semibold">
                    <li>
                        <Link to={""} className="flex flex-row items-center gap-2"><IoHomeOutline />Home</Link>
                    </li>
                    <li>
                        <Link className="flex flex-row items-center gap-2"><GiCrown />Genres</Link>
                    </li>
                    <li>
                        <Link className="flex flex-row items-center gap-2"><FaAutoprefixer />Top</Link>
                    </li>
                    <li>
                        <Link className="flex flex-row items-center gap-2"><PiNewspaperClippingLight />New Comics</Link>
                    </li>
                    <li>
                        <Link className="flex flex-row items-center gap-2"><GiBurningRoundShot />Popular Comics</Link>
                    </li>
                    <li>
                        <Link className="flex flex-row items-center gap-2"><FaCircleCheck />Complete Comics</Link>
                    </li>
                    <li>
                        <Link className="flex flex-row items-center gap-2"><RxUpdate />Recently Comics</Link>
                    </li>
                    <li>
                        <Link className="flex flex-row items-center gap-2"><BsGenderMale />Boy Comics</Link>
                    </li>
                    <li>
                        <Link className="flex flex-row items-center gap-2"><CgGenderFemale />Girl Comics</Link>
                    </li>
                    <li>
                        <Link className="flex flex-row items-center gap-2"><MdHistory />History</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default Menu