import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { recentlyUpdate } from '../store/recently/recentlyupdate';
import { GrFormView } from "react-icons/gr";
import { GiSelfLove } from "react-icons/gi";
import avata from "../images/cute-asian-girl-kawaii-anime-avatar-ai-generative-art_225753-9233.avif"
import { Link, useNavigate } from "react-router-dom";
import { FaCircleCheck } from "react-icons/fa6";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi"
import ReactPaginate from "react-paginate";
const RecentlyComics = () => {
    const recentlycomics = useSelector(state => state.recently)
    console.log(recentlycomics);
    const dispatch = useDispatch()
    const [page, setPage] = useState(1)
    const toTalPage = recentlycomics?.recently?.total_pages
    const [pageRanges, setpageRanges] = useState()
    const handlePageChange = (selectedPage) => {
        setPage(selectedPage.selected + 1);
    };
    const navigato = useNavigate()
    useEffect(() => {
        dispatch(recentlyUpdate.getList({ page: page }))
        if (page !== 1) {
            navigato(`/comics/recently-comics?page=${page}`)
        } else {
            navigato("/comics/recently-comics")
        }
    }, [dispatch, page])
    const [errorImage, setErrorImage] = useState([])
    const handlerChangeImage = (index) => {
        const updateImage = [...errorImage]
        updateImage[index] = true
        setErrorImage(updateImage)
    }
    const convertView = (number) => {
        if (number > 1000000) {
            return (number / 1000000).toFixed(0) + 'M'
        }
        if (number > 10000) {
            return (number / 10000).toFixed(0) + 'K'
        }
        if (number > 1000) {
            return (number / 1000).toFixed(0) + 'N'
        }
        return number.toString()
    }
    return (
        <div className="mx-6">
            <div className="flex flex-row items-center justify-between">
                <div className="">
                    <h1 className="flex items-center flex-row gap-2 text-xl md:text-3xl sm:text-2xl font-bold mb-4 mt-6 md:mt-12">
                        <FaCircleCheck className="text-emerald-400 animate-pulse" />
                        Recently Comics {`${page !== 1 ? `- Page ${page}` : ''}`}
                    </h1>
                </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">

                {
                    recentlycomics?.recently?.comics?.map((comics, index) => (
                        <div className="relative rounded  group group-hover:shadow-md overflow-hidden md:hover:border-emerald-300 cursor-pointer" key={index}>
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
                                    errorImage[index] ?
                                        <img className="bg-cover object-center scale-[1.01] origin-bottom select-none group-hover:scale-105 duration-300 bg-no-repeat aspect-[2/3] object-cover w-full h-full" loading="lazy" src={avata} alt="" />
                                        :
                                        <img className="bg-cover object-center scale-[1.01] origin-bottom select-none group-hover:scale-105 duration-300 bg-no-repeat aspect-[2/3] object-cover w-full h-full" onError={() => handlerChangeImage(index)} loading="lazy" src={comics.thumbnail} alt="" />

                                }
                            </Link>
                            <div className="absolute top-1/2 bottom-0 px-2 sm:px-4 py-2 inset-x-0 flex flex-col justify-end bg-gradient-to-b from-transparent to-black">
                                <div className="">
                                    <h1 className="font-bold text-white text-lg line-clamp-1">{comics.title}</h1>
                                </div>
                                <div className="text-center justify-center">
                                    <div className="flex flex-row gap-2">
                                        {
                                            comics.genres.slice(0, 3).map((genres, idx) => (
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
                                            <p className="text-xs px-1">{convertView(comics.followers)}</p>
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
    )
}
export default RecentlyComics