import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { MdHistory } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { search } from "../../store/search/search";
const InputSearch = () => {
    const searchdata = useSelector(state => state.searchcomics)
    const dispatch = useDispatch()
    const navigation = useNavigate()
    const [query, setQuery] = useState()
    const [isShow, setIsShow] = useState(false)
    const HandlerEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            setIsShow(false)
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
        navigation(`/detail-comics/${id}`)
    }
    return (
        <div className="">
            <div className="flex  flex-row items-center">
                <div className="flex flex-row items-center mx-2">
                    <form className="flex items-center rounded-full border py-2 focus-within:border-emerald-500 duration-100 lg:w-[250px] relative">
                        <input type="text" className="outline-none text-sm pl-3 lg:w-[250px] rounded-full" onBlur={() => setIsShow(false)} onFocus={handlerShowSearch} onKeyPress={HandlerEnter} onChange={(e) => setQuery(e.target.value)} placeholder="Nhập truyện muốn tìm" />
                        <button>
                            <CiSearch className="" color="black" size={25} />
                        </button>
                    </form>
                    <div className={`absolute top-[57px] z-30 ${isShow ? '' : 'hidden'} px-3 py-5 text-black bg-white w-[300px] h-[300px] overflow-y-auto`}>
                        {
                            searchdata && searchdata.search && searchdata?.search.length > 0 && searchdata?.search?.map((searchcomics, idx) => (
                                <div onMouseDown={() => handlerDetailComics(searchcomics.id)} className="grid grid-cols-3 justify-center border-b-2 gap-4" key={idx}>
                                    <div className="w-full col-span-1">
                                        <img src={searchcomics.thumbnail} className="bg-cover my-2 rounded border-2 w-16 border-red-500 object-cover bg-no-repeat aspect-[2/3]" width={"150px"} alt="" />
                                    </div>
                                    <div className="text-sm col-span-2">
                                        <h3 className="font-semibold">{searchcomics.title}</h3>
                                        <p className="text-emerald-400 font-semibold">{searchcomics.authors}</p>
                                        <ul className="flex line-clamp-1 flex-wrap gap-1">
                                            {
                                                searchcomics?.genres?.map((genres, idx) => (
                                                    <li className="line-clamp-1 " key={idx}>{genres} {idx !== 4 && ','}</li>
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