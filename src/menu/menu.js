import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/comics.png"
import { IoHomeOutline } from "react-icons/io5";
import { GiCrown } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";
import { SlUserFollowing } from "react-icons/sl";
import { CiLogout } from "react-icons/ci";
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
import { logOut, selectedUser } from "../store/auth/userslice";
import { auth } from "../@config";
import avatar from "../images/cute-asian-girl-kawaii-anime-avatar-ai-generative-art_225753-9233.avif"
const Menu = () => {
    const searchdata = useSelector(state => state.searchcomics)
    const user = useSelector(selectedUser)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const navigation = useNavigate()
    const [query, setQuery] = useState()
    const [isShow, setIsShow] = useState(false)
    const handlerLogout = () => {
        auth.signOut()
        dispatch(logOut())
    }
    const HandlerEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            setIsShow(false)
            setOpen(false)
            navigation(`/comics/search?q=${query}`)
        }
    }
    useEffect(() => {
        if (query !== undefined) {
            dispatch(search.searchSuggest(query))
        }
    }, [dispatch, query])
    const type = "all"
    const handlerShowSearch = () => {
        if (searchdata.search.length > 0) {
            setIsShow(true)
        }
    }
    const handlerDetailComics = (id) => {
        setOpen(false)
        navigation(`/detail-comics/${id}`)
    }
    const handlerTimKiem = () => {
        setIsShow(false)
        setOpen(false)
        navigation(`/comics/search?q=${query}`)
    }
    const handlerFollowComics = () => {
        navigation("/comics/follow")
    }
    return (
        <div className="relative">
            <div className="">
                <div className="flex flex-row  justify-between bg-white shadow-md h-12 md:h-14 text-black items-center w-full mx-auto px-3 py-3">
                    <div className="flex  flex-row justify-between items-center">
                        <Link to={"/"} className="gap-2 flex flex-row items-center justify-between text-center">
                            <div className="">
                                <img className="bg-no-repeat bg-cover" width={"40px"} src={logo} alt="" />
                            </div>
                            <div className="font-bold text-green-500/95 text-2xl">
                                <h1>Comics Dương</h1>
                            </div>
                        </Link>
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
                    <div className="flex flex-row items-center justify-center gap-2">
                        <SlUserFollowing onClick={handlerFollowComics} />
                        <div className="hidden md:block">
                            {
                                user ?
                                    <div>
                                        <div className="group">
                                            <div className="py-7 px-4 flex flex-row items-center gap-2">
                                                <img className="bg-cover border bg-no-repeat object-cover rounded-full w-8" src={user?.photoUrl === null ? avatar : user?.photoUrl} alt="" />
                                                <h1>{user?.displayName === null ? 'Nguyễn Văn A' : user?.displayName}</h1>
                                            </div>
                                            <div className="absolute py-7 px-4 z-50 top-9  right-1 group-hover:block hover:block hidden">
                                                <div className="border-2 w-[200px] px-2 py-2 bg-white border-solid rounded-md">
                                                    <p className="hover:bg-emerald-400 px-2 py-0.5 hover:text-white font-semibold flex flex-row gap-2 items-center" onClick={() => {
                                                        navigation("/user/profile")
                                                    }}><CgProfile /> Profile</p>
                                                    <p className="hover:bg-emerald-400 px-2 py-0.5 hover:text-white font-semibold flex flex-row gap-2 items-center"><CiSettings /> Setting</p>
                                                    <button className="hover:bg-emerald-400 w-full rounded px-2 py-0.5 hover:text-white font-semibold flex flex-row gap-2 items-center" onClick={handlerLogout}><CiLogout /> Logout</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <button onClick={() => {
                                        navigation("/user/login")
                                    }} className="border w-full border-solid border-blue-400 hover:bg-emerald-400 px-2 py-0.5 hover:text-white font-bold rounded">Login</button>
                            }
                        </div>
                        <div className="text-3xl py-4  md:hidden" onClick={() => { setOpen(!open) }}>
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
                            <input type="text" onBlur={() => setIsShow(false)} onFocus={handlerShowSearch} onKeyPress={HandlerEnter} onChange={(e) => setQuery(e.target.value)} placeholder="Vui lòng nhập tên truyện cần tìm" className="w-11/12 text-black text-lg h-10 rounded-full border-2 border-solid border-red-400" />
                            <CiSearch size={40} className="font-bold absolute right-4 text-3xl" onClick={handlerTimKiem} />
                        </div>
                        <div className={`absolute top-28 z-30 ${isShow ? '' : 'hidden'} px-3 py-5 text-black bg-white  h-[300px] overflow-y-auto`}>
                            {/* {
                                searchdata?.search.length>0 && searchdata?.search?.map((searchcomics, idx) => (
                                    <div onMouseDown={() => handlerDetailComics(searchcomics.id)} className="flex justify-center border-b-2 gap-4 flex-row" key={idx}>
                                        <div className="w-full">
                                            <img src={searchcomics.thumbnail} className="bg-cover my-2 rounded border-2 border-red-500 object-cover bg-no-repeat aspect-[2/3]" width={"150px"} alt="" />
                                        </div>
                                        <div className="text-sm">
                                            <h3>{searchcomics.title}</h3>
                                            <p>{searchcomics.authors}</p>
                                            <ul className="flex line-clamp-2 flex-wrap">
                                                {
                                                    searchcomics.genres.map((genres, idx) => (
                                                        <li className="line-clamp-2" key={idx}>{genres}</li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                ))
                            } */}
                        </div>
                        <ul className="mx-5 my-6 gap-5 text-lg grid font-semibold">
                            <li className="hover:bg-emerald-400 px-2 py-0.5 rounded hover:text-white">
                                <Link to={"/"} className={`flex flex-row items-center gap-2 ${open ? 'close' : 'menu'}`} onClick={() => setOpen(!open)}><IoHomeOutline />Home</Link>
                            </li>
                            <li className="hover:bg-emerald-400 px-2 py-0.5 rounded hover:text-white">
                                <Link to={"/comics-genres/all"} className={`flex flex-row items-center gap-2 ${open ? 'close' : 'menu'}`} onClick={() => setOpen(!open)}><GiCrown />Genres</Link>
                            </li>
                            <li className="hover:bg-emerald-400 px-2 py-0.5 rounded hover:text-white">
                                <Link to={"/comics/top?all"} className={`flex flex-row items-center gap-2 ${open ? 'close' : 'menu'}`} onClick={() => setOpen(!open)}><FaAutoprefixer />Top</Link>
                            </li>
                            <li className="hover:bg-emerald-400 px-2 py-0.5 rounded hover:text-white">
                                <Link to={"/comics/news/all"} className={`flex flex-row items-center gap-2 ${open ? 'close' : 'menu'}`} onClick={() => setOpen(!open)}><PiNewspaperClippingLight />New Comics</Link>
                            </li>
                            <li className="hover:bg-emerald-400 px-2 py-0.5 rounded hover:text-white">
                                <Link to={"/comics/popular-comics"} className={`flex flex-row items-center gap-2 ${open ? 'close' : 'menu'}`} onClick={() => setOpen(!open)}><GiBurningRoundShot />Popular Comics</Link>
                            </li>
                            <li className="hover:bg-emerald-400 px-2 py-0.5 rounded hover:text-white">
                                <Link to={"/comics/complete-comics"} className={`flex flex-row items-center gap-2 ${open ? 'close' : 'menu'}`} onClick={() => setOpen(!open)}><FaCircleCheck />Complete Comics</Link>
                            </li>
                            <li className="hover:bg-emerald-400 px-2 py-0.5 rounded hover:text-white">
                                <Link to={"/comics/recently-comics"} className={`flex flex-row items-center gap-2 ${open ? 'close' : 'menu'}`} onClick={() => setOpen(!open)}><RxUpdate />Recently Comics</Link>
                            </li>
                            <li className="hover:bg-emerald-400 px-2 py-0.5 rounded hover:text-white">
                                <Link to={"/comics/boy-comics"} className={`flex flex-row items-center gap-2 ${open ? 'close' : 'menu'}`} onClick={() => setOpen(!open)}><BsGenderMale />Boy Comics</Link>
                            </li>
                            <li className="hover:bg-emerald-400 px-2 py-0.5 rounded hover:text-white">
                                <Link to={"/comics/girl-comics"} className={`flex flex-row items-center gap-2 ${open ? 'close' : 'menu'}`} onClick={() => setOpen(!open)}><CgGenderFemale />Girl Comics</Link>
                            </li>
                            <li className="hover:bg-emerald-400  rounded hover:text-white">
                                <Link className={`flex flex-row items-center gap-2 ${open ? 'close' : 'menu'}`} onClick={() => setOpen(!open)}><MdHistory />History</Link>
                            </li>
                            <li className="hover:bg-emerald-400 px-2 py-0.5 rounded hover:text-white">
                                <Link to={"/comics/follow"} className={`flex flex-row items-center gap-2 ${open ? 'close' : 'menu'}`} onClick={() => setOpen(!open)}><CgGenderFemale />Follow Comics</Link>
                            </li>
                            {
                                user ?
                                    <div>
                                        <div className="group">
                                            <div className="flex flex-row items-center gap-2">
                                                <img className="bg-cover border bg-no-repeat object-cover rounded-full w-8" src={user?.photoUrl === null ? avatar : user?.photoUrl} alt="" />
                                                <h1>{user?.displayName === null ? 'Nguyễn Văn A' : user?.displayName}</h1>
                                            </div>
                                            <div className=" py-7 px-4 z-50   right-1 group-hover:block hover:block hidden">
                                                <div className="border-2 w-[200px] bg-white border-solid rounded-md">
                                                    <p className="hover:bg-emerald-400 px-2 py-0.5 hover:text-white font-semibold flex flex-row gap-2 items-center" onClick={() => {
                                                        navigation("/user/profile")
                                                    }}><CgProfile /> Profile</p>
                                                    <p className="hover:bg-emerald-400 px-2 py-0.5 hover:text-white font-semibold flex flex-row gap-2 items-center"><CiSettings /> Setting</p>
                                                    <button className="hover:bg-emerald-400 w-full rounded px-2 py-0.5 hover:text-white font-semibold flex flex-row gap-2 items-center" onClick={handlerLogout}><CiLogout /> Logout</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <button onClick={() => {
                                        navigation("/user/login")
                                    }} className="border border-solid w-full border-blue-400 hover:bg-emerald-400 px-2 py-0.5 hover:text-white font-bold rounded">Login</button>
                            }
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Menu