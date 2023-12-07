import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { MdHistory } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { search } from "../../store/search/search";
const InputSearch = () => {
    const searchdata = useSelector(state => state.searchcomics)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const navigation = useNavigate()
    const [query, setQuery] = useState()
    const [isShow, setIsShow] = useState(false)
    const HandlerEnter = (e) => {
        if (e.key === 'Enter') {
            navigation(`/comics/search?q=${query}`)
        }
    }

    useEffect(() => {
        dispatch(search.searchSuggest(query))
    }, [dispatch, query])
    const type = "all"
    return (
        <div className="">
            <div className="flex  flex-row items-center">
                <div className="hidden md:block">
                    <MdHistory color="blue" size={25} />
                </div>
                <div className="flex flex-row items-center mx-2">
                    <form className="flex flex-row items-center relative">
                        <input type="text" className="border-2 border-solid rounded-full  border-red-300 text-black w-52 h-9" onClick={() => setIsShow(!isShow)} onKeyPress={HandlerEnter} onChange={(e) => setQuery(e.target.value)} placeholder="Nhập truyện muốn tìm" />
                        <CiSearch className="" color="black" size={25} />
                    </form>
                    <div className={`absolute top-[57px] z-30 ${isShow ? '' : 'hidden'} px-3 py-5 text-black bg-white  h-[300px] overflow-y-auto`}>
                        {
                            searchdata && searchdata.search && searchdata?.search.length > 0 && searchdata?.search?.map((searchcomics, idx) => (
                                <div className="flex justify-center border-b-2 gap-4 flex-row" key={idx}>
                                    <div className="w-full">
                                        <img src={searchcomics.thumbnail} className="bg-cover my-2 rounded border-2 border-red-500 object-cover bg-no-repeat aspect-[2/3]" width={"150px"} alt="" />
                                    </div>
                                    <div className="text-sm">
                                        <h3>{searchcomics.title}</h3>
                                        <p>{searchcomics.authors}</p>
                                        <ul className="flex line-clamp-2 flex-wrap">
                                            {
                                                searchcomics?.genres?.map((genres, idx) => (
                                                    <li className="line-clamp-2" key={idx}>{genres}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default InputSearch