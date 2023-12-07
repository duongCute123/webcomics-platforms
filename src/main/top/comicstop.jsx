import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { GrFormView } from "react-icons/gr";
import avatar from "../../images/cute-asian-girl-kawaii-anime-avatar-ai-generative-art_225753-9233.avif"
import { GiSelfLove } from "react-icons/gi";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi"
import ReactPaginate from "react-paginate"
import { status, top } from "../../type";
import { topcomics } from "../../store/top/top";
import AnimationLoading from "../loading/loading";
const ComicsTop = () => {
    const topscomics = useSelector(state => state.topcomics)
    const loading = useSelector(state => state.topcomics.loading)
    const dispatch = useDispatch()
    const [page, setPage] = useState(1)
    const [errorImage, setErrorImage] = useState(false)
    const [type, setTypes] = useState("all")
    const [types, setType] = useState("all")
    // const [isClick, setIsClick] = useState(false)
    const toTalPage = topscomics?.topcomics?.total_pages
    const [pageRanges, setpageRanges] = useState()
    useEffect(() => {
        console.log(type);
        switch (type) {
            case "all":
                dispatch(topcomics.getListTop({ page: page, status: types }))
                break;
            case "daily":
                dispatch(topcomics.getdailyTop({ page: page, status: types }))
                break;
            case "weekly":
                dispatch(topcomics.topWeekly({ page: page, status: types }))
                break;
            case "monthly":
                dispatch(topcomics.topMonthly({ page: page, status: types }))
                break;
            case "chapter":
                dispatch(topcomics.topChapter({ page: page, status: types }))
                break;
            case "follow":
                dispatch(topcomics.topFollow({ page: page, status: types }))
                break;
            case "comment":
                dispatch(topcomics.topComment({ page: page, status: types }))
                break;
            default:
                dispatch(topcomics.getListTop({ page: page, status: types }))
                break;
        }
    }, [dispatch, page, types, type])
    const handlerChangType = (name) => {
        setTypes(name)
    }
    const handlePageChange = (selectedPage) => {
        setPage(selectedPage.selected + 1);
    };
    const convertView = (number) => {
        if (number > 1000000) {
            return (number / 1000000).toFixed(0) + 'm'
        }
        if (number > 100000) {
            return (number / 100000).toFixed(0) + 'k'
        }
        return number.toString()
    }
    console.log(type);
    console.log(page);
    return (
        <div className="">

            {
                loading ?
                    <AnimationLoading />
                    :
                    <div>
                        <ul className="mx-3 my-6 text-center">
                            <li className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-5 text-center">
                                {
                                    top?.map((tops, index) => {
                                        const IconElement = tops.icon
                                        return (
                                            <Link title={`${tops.name}`} to={`${types != "all" ? `/comics/top?tab=${type}&filter=${types}` : `/comics/top?tab=${type}`}`} onClick={() => handlerChangType(tops.id)} key={index}
                                                className={`${type === tops.id ? 'bg-emerald-500 text-white' : ''} rounded md:justify-center gap-1 flex  h-10 flex-row items-center`}>
                                                <IconElement />{tops.name}
                                            </Link>
                                        )
                                    })
                                }
                            </li>
                        </ul>
                        <ul className="flex flex-wrap items-center gap-2.5 mb-5 mt-3 font-semibold sm:gap-5 mx-3">
                            {
                                status.map((status) => (
                                    <li key={status.id} onClick={() => setType(status.id)} className={`hover:text-emerald-500 ${types === status.id ? 'border-emerald-500 text-emerald-500' : ''} min-w-[60px] cursor-pointer px-3 py-1.5 rounded border`}>{status.name}</li>
                                ))
                            }
                        </ul>
                        <div className="grid grid-cols-2 sm:grid-cols-3 bg-cover bg-no-repeat w-[98%] mx-auto md:grid-cols-5 gap-2 my-2">

                            {
                                topscomics?.topcomics?.comics?.map((comics, index) => (
                                    <div className="relative group group-hover:shadow-md rounded-md overflow-hidden md:hover:border-emerald-300 cursor-pointer" key={index}>
                                        <div className="absolute flex flex-row gap-2 top-0 duration-300 z-10">
                                            <span className={`${comics.is_trending === true ? 'bg-rose-500 ' : ''}  text-center py-0.5 px-2 text-white`}>
                                                {comics.is_trending === true ? 'Hot' : ''}
                                            </span>
                                            <span className={`${comics.is_trending === true ? 'bg-sky-500 ' : ''}  text-center py-0.5 px-2 text-white`}>
                                                {comics.is_trending === true ? 'End' : ''}
                                            </span>
                                            <span className=" bg-amber-400 text-center py-0.5 px-2 text-white">
                                                {comics.status !== "Completed" ? 'Up' : 'Up'}
                                            </span>
                                        </div>
                                        <Link to={`/detail-comics/${comics.id}`} className="">
                                            {
                                                errorImage ?
                                                    <img className={`bg-cover object-center scale-[1.01] origin-bottom select-none group-hover:scale-105 hover:border-2 hover:border-solid hover:border-emerald-500 duration-300 bg-no-repeat aspect-[2/3] object-cover w-full h-full`} loading="lazy" src={avatar} alt="" />
                                                    :
                                                    <img className={`bg-cover object-center scale-[1.01] origin-bottom select-none group-hover:scale-105 hover:border-2 hover:border-solid hover:border-emerald-500 duration-300 bg-no-repeat aspect-[2/3] object-cover w-full h-full`} loading="lazy" src={comics.thumbnail} onError={() => {
                                                        console.log("Lỗi ảnh rồi");
                                                        setErrorImage(true)

                                                    }} alt="" />
                                            }
                                        </Link>
                                        <div className="absolute top-1/2 bottom-0 px-2 sm:px-4 py-2 inset-x-0 flex flex-col justify-end bg-gradient-to-b from-transparent to-black">
                                            <div className="">
                                                <h1 className="font-bold text-white text-lg flex flex-wrap">{comics.title}</h1>
                                            </div>
                                            <div className="text-center justify-center">
                                                <div className="flex flex-row gap-2">
                                                    {
                                                        comics.genres.slice().map((genres, idx) => (
                                                            <div className="" key={idx}>
                                                                <p className=" text-sm font-semibold truncate text-gray-300 line-clamp-1">{genres.name}</p>
                                                            </div>
                                                        ))
                                                    }

                                                </div>
                                                <div className="flex flex-row text-emerald-400 justify-center gap-3 text-center">
                                                    <div className="bg-white/25 rounded flex text-xs flex-row items-center">
                                                        <GrFormView size={20} />
                                                        <p className="text-xs px-1">{convertView(comics.total_views)}</p>
                                                    </div>
                                                    <div className="bg-white/25 rounded flex flex-row items-center">
                                                        <GiSelfLove />
                                                        <p className="text-xs">{convertView(comics.followers)}</p>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                        <div className=''>
                            <ReactPaginate
                                className='flex gap-4 justify-center hover:no-underline font-bold  items-center text-center'
                                pageCount={toTalPage} // Tổng số trang
                                pageRangeDisplayed={pageRanges} // Số lượng nút phân trang hiển thị
                                marginPagesDisplayed={2} // Số lượng nút phân trang hiển thị ở hai đầu
                                onPageChange={handlePageChange} // Xử lý sự kiện khi người dùng chuyển trang
                                containerClassName="pagination"
                                activeClassName="text-white bg-yellow-400"
                                disabledClassName="disabled"
                                nextLabel={<BiChevronRight size={"25px"} />}
                                pageClassName="border-solid border-2 border-yellow-400 justify-center items-center w-10"

                                previousClassName={page === 1 ? 'hidden' : ''}
                                previousLabel={
                                    <div className="flex items-center justify-center text-center">
                                        <BiChevronLeft size={"25px"} />
                                    </div>
                                }
                                pageLinkClassName={""}
                                activeLinkClassName={""}
                            />
                            {/* <Pagination currentPage={currentPage} totalPages={toTalPage} onPageChange={handlePageChange}/> */}
                        </div>
                    </div>
            }
        </div>
    )
}
export default ComicsTop