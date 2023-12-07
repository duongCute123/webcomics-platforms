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
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { search } from "../store/search/search";
import InputSearch from "./subnav/inputsearch";
import { selectedUser } from "../store/auth/userslice";
const Menu = () => {
    const searchdata = useSelector(state => state.searchcomics)
    const user = useSelector(selectedUser)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [IsClose, setIsClose] = useState(false)
    const navigation = useNavigate()
    const [query, setQuery] = useState()
    const [isShow, setIsShow] = useState(false)
    console.log("Thông tin người dùng", user)
    const HandlerEnter = (e) => {
        if (e.key === 'Enter') {
            // HandlerQuery(query)
            navigation('/comics/seach')
        }
    }
    // Tính sử dụng useCallback để gọi api mà thấy không đáng kể
    // const HandlerQuery = useCallback((query) => {
    //     dispatch(search.searchSuggest(query))
    // }, [dispatch])
    // Nếu mà thế này thì nó sẽ gọi api luôn không thích như vậy lắm
    useEffect(() => {
        dispatch(search.searchSuggest(query))
    }, [dispatch, query])
    const type = "all"
    return (
        <div className="relative">
            <div className="">
                <div className="flex flex-row  justify-between bg-white shadow-md h-12 md:h-14 text-black items-center w-full mx-auto px-3 py-3">
                    <div className="flex  flex-row justify-between items-center">
                        <div className="gap-2 flex flex-row items-center justify-between text-center">
                            <div className="">
                                <img className="bg-no-repeat bg-cover" width={"40px"} src={logo} alt="" />
                            </div>
                            <div className="font-bold text-green-500/95 text-2xl">
                                <h1>Truyện tranh</h1>
                            </div>
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
                    <div className="flex flex-row items-center justify-center gap-1">
                        <div className="group">
                            <div className="py-7 px-4">
                                <img className="bg-cover bg-no-repeat object-cover rounded-full w-8" src={user?.photoUrl} alt="" />
                            </div>
                            <div className="absolute py-7 z-50 top-9 px-3 right-1 group-hover:block hover:block hidden">
                                <div className="border-2 flex flex-col bg-white border-solid rounded-md">
                                    <p>Tên:{user?.displayName}</p>
                                    <p>Email:{user?.email}</p>
                                    <button>Logout</button>
                                </div>
                            </div>
                        </div>
                        <div className="text-3xl   md:hidden" onClick={() => { setOpen(!open) }}>
                            <ion-icon name={`${open ? 'close' : 'menu'}`}></ion-icon>
                        </div>
                    </div>
                    {/* Trên thiết bị điện thoại có màn hình nhỏ */}
                    <div className={` inset-y-0
                    md:hidden fixed bg-white w-10/12  overflow-y-auto max-h-screen translate-x-0 pl-4 z-20 bottom-0
                     duration-500 ${open ? 'right-0' : 'right-[-100%]'}
                    `}>
                        <div className="text-3xl flex flex-row px-3 py-3 justify-end  md:hidden" onClick={() => { setOpen(!open) }}>
                            <ion-icon name={`${open ? 'close' : 'menu'}`}></ion-icon>
                        </div>
                        <div className="flex flex-row justify-center items-center gap-8">
                            <input type="text" placeholder="Vui lòng nhập tên truyện cần tìm" className="w-11/12 text-black text-lg h-10 rounded-full border-2 border-solid border-red-400" />
                            <CiSearch size={40} className="font-bold absolute right-4 text-3xl" />
                        </div>
                        <ul className="mx-5 my-6 gap-5 text-lg grid font-semibold">
                            <li className="hover:bg-emerald-400 px-2 py-0.5 rounded hover:text-white">
                                <Link to={""} className={`flex flex-row items-center gap-2 ${open ? 'close' : 'menu'}`} onClick={() => setOpen(!open)}><IoHomeOutline />Home</Link>
                            </li>
                            <li className="hover:bg-emerald-400 px-2 py-0.5 rounded hover:text-white">
                                <Link className={`flex flex-row items-center gap-2 ${open ? 'close' : 'menu'}`} onClick={() => setOpen(!open)}><GiCrown />Genres</Link>
                            </li>
                            <li className="hover:bg-emerald-400 px-2 py-0.5 rounded hover:text-white">
                                <Link className={`flex flex-row items-center gap-2 ${open ? 'close' : 'menu'}`} onClick={() => setOpen(!open)}><FaAutoprefixer />Top</Link>
                            </li>
                            <li className="hover:bg-emerald-400 px-2 py-0.5 rounded hover:text-white">
                                <Link className={`flex flex-row items-center gap-2 ${open ? 'close' : 'menu'}`} onClick={() => setOpen(!open)}><PiNewspaperClippingLight />New Comics</Link>
                            </li>
                            <li className="hover:bg-emerald-400 px-2 py-0.5 rounded hover:text-white">
                                <Link className={`flex flex-row items-center gap-2 ${open ? 'close' : 'menu'}`} onClick={() => setOpen(!open)}><GiBurningRoundShot />Popular Comics</Link>
                            </li>
                            <li className="hover:bg-emerald-400 px-2 py-0.5 rounded hover:text-white">
                                <Link className={`flex flex-row items-center gap-2 ${open ? 'close' : 'menu'}`} onClick={() => setOpen(!open)}><FaCircleCheck />Complete Comics</Link>
                            </li>
                            <li className="hover:bg-emerald-400 px-2 py-0.5 rounded hover:text-white">
                                <Link className={`flex flex-row items-center gap-2 ${open ? 'close' : 'menu'}`} onClick={() => setOpen(!open)}><RxUpdate />Recently Comics</Link>
                            </li>
                            <li className="hover:bg-emerald-400 px-2 py-0.5 rounded hover:text-white">
                                <Link className={`flex flex-row items-center gap-2 ${open ? 'close' : 'menu'}`} onClick={() => setOpen(!open)}><BsGenderMale />Boy Comics</Link>
                            </li>
                            <li className="hover:bg-emerald-400 px-2 py-0.5 rounded hover:text-white">
                                <Link className={`flex flex-row items-center gap-2 ${open ? 'close' : 'menu'}`} onClick={() => setOpen(!open)}><CgGenderFemale />Girl Comics</Link>
                            </li>
                            <li className="hover:bg-emerald-400 px-2 py-0.5 rounded hover:text-white">
                                <Link className={`flex flex-row items-center gap-2 ${open ? 'close' : 'menu'}`} onClick={() => setOpen(!open)}><MdHistory />History</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Menu