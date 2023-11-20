// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { useDispatch, useSelector } from "react-redux"
import 'swiper/css/pagination';
import { status } from '../type';
// import { useParams } from "react-router-dom"
// import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useEffect, useState } from 'react';
// import { genres } from '../store/genres/genrescomics';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BiChevronRight, BiChevronLeft } from "react-icons/bi"
import ReactPaginate from "react-paginate"
import { news } from '../store/news/news';
const NewsComics = () => {
    const { slug } = useParams()
    const detailComics = useSelector(state => state.news)
    console.log(detailComics);
    const navigation = useNavigate()
    const [page, setPage] = useState(1)
    const [type, setType] = useState("all")
    const dispatch = useDispatch()
    const toTalPage = detailComics?.news?.data?.total_pages
    console.log(toTalPage);
    const [pageRanges, setpageRanges] = useState()
    useEffect(() => {
        dispatch(news.findComicsNew({ page: page, status: type }))
    }, [dispatch, page, type])
    const handlePageChange = (selectedPage) => {
        setPage(selectedPage.selected + 1);
    };
    const handlerClick = (name) => {
        setType(name)
        navigation(`/comics/news/${name}`)
    }
    console.log(toTalPage);
    return (
        <div className="">
            <h1 className="">
                Truyện mới
            </h1>
            <div className="w-11/12 border-t-2 border-b-2 h-14  mx-auto justify-center ">
                <Swiper slidesPerView={3} autoplay={{ delay: 4000 }}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 3,

                        },
                        768: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    modules={[Navigation]} className=" ">
                    {
                        status?.map((status, index) => (
                            <SwiperSlide key={index} onClick={() => { handlerClick(status.id) }} className={`px-5 ${slug === status.id ? 'bg-emerald-500' : ''} py-3 cursor-pointer  text-center select-none`}>
                                {status.name}
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
            <div className="grid grid-cols-3 w-11/12 mx-auto md:grid-cols-5 gap-2 my-2">

                {
                    detailComics?.news?.data?.comics?.map((comics, index) => (
                        <div className="relative group group-hover:shadow-md overflow-hidden md:hover:border-emerald-300 cursor-pointer" key={index}>
                            <Link to={`/detail-comics/${comics.id}`} className="">
                                <img className="bg-cover object-center scale-[1.01] origin-bottom select-none group-hover:scale-105 duration-300 bg-no-repeat aspect-[2/3] object-cover w-full h-full" loading="lazy" src={comics.thumbnail} alt="" />
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
                                    <div className="flex flex-row  gap-3 text-center">
                                        <div className="bg-white/25">
                                            <p className="">{comics.total_views}</p>
                                        </div>
                                        <div className="bg-white/25">
                                            <p>{comics.followers}</p>
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
export default NewsComics