// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { useDispatch, useSelector } from "react-redux"
import 'swiper/css/pagination';
// import { useParams } from "react-router-dom"
// import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { genress } from '../../type';
import { GrFormView } from "react-icons/gr";
import { GiSelfLove } from "react-icons/gi";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useEffect, useState } from 'react';
import { genres } from '../../store/genres/genrescomics';
import avata from "../../images/cute-asian-girl-kawaii-anime-avatar-ai-generative-art_225753-9233.avif"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BiChevronRight, BiChevronLeft } from "react-icons/bi"
import ReactPaginate from "react-paginate"
import Menu from '../../menu/menu';
const GenresComics = () => {
    const genrescomics = useSelector(state => state.genres)
    const { slug } = useParams()
    console.log(slug);
    const [type, setType] = useState("all")
    const navigation = useNavigate()
    const [page, setPage] = useState(1)
    const dispatch = useDispatch()
    console.log(page);
    console.log(genrescomics);
    const toTalPage = genrescomics?.genres?.total_pages
    const [pageRanges, setpageRanges] = useState()
    useEffect(() => {
        dispatch(genres.getList({ type: type, page: page }))
    }, [dispatch, type, page])
    const handlePageChange = (selectedPage) => {
        setPage(selectedPage.selected + 1);
    };
    const handlerClick = (name) => {
        setType(name)
        navigation(`/comics-genres/${name}`)
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
    console.log(toTalPage);
    const [errorImage, setErrorImage] = useState([])
    const handlerChangeImage = (index) => {
        const updateImage = [...errorImage]
        updateImage[index] = true
        setErrorImage(updateImage)
    }
    return (
        <div className="">
            <Menu />
            <div className="w-11/12 border-t-2 border-b-2 h-14  mx-auto justify-center ">
                <Swiper slidesPerView={3} autoplay={{ delay: 4000 }}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 5,

                        },
                        768: {
                            slidesPerView: 5,
                        },
                        1024: {
                            slidesPerView: 7,
                        },
                    }}
                    modules={[Navigation]} className=" ">
                    {
                        genress?.map((genres, index) => (
                            <SwiperSlide key={index} onClick={() => { handlerClick(genres.id) }} className={`${slug === genres.id ? 'bg-emerald-500' : ''} py-3 cursor-pointer mx-auto text-center line-clamp-1 select-none`}>
                                {genres.name}
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
            <div className='flex w-11/12 bg-sky-500 rounded-md mx-auto  h-10 my-2 flex-row items-center gap-2 w-11/'>
                <div className='mx-3'>
                    <IoIosInformationCircleOutline size={"25px"} color='white' />
                </div>
                <div className=''>
                    <p className='text-white text-lg'>Tất cả thể loại truyện tranh</p>
                </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 w-11/12 mx-auto md:grid-cols-4 gap-2 my-2">

                {
                    genrescomics?.genres?.comics?.map((comics, index) => (
                        <div className="relative group group-hover:shadow-md rounded overflow-hidden md:hover:border-emerald-300 cursor-pointer" key={index}>
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
                                        <img className="bg-cover object-center scale-[1.01] origin-bottom 
                                        select-none group-hover:scale-105 duration-300 bg-no-repeat 
                                        aspect-[2/3] object-cover w-full h-full" loading="lazy"
                                            src={avata} alt="" />
                                        :
                                        <img className="bg-cover object-center scale-[1.01] origin-bottom 
                                        select-none group-hover:scale-105 duration-300 bg-no-repeat 
                                        aspect-[2/3] object-cover w-full h-full" loading="lazy"
                                            onError={() => handlerChangeImage(index)}
                                            src={comics.thumbnail} alt="" />

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
export default GenresComics