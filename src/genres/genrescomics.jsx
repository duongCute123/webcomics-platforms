// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { useDispatch, useSelector } from "react-redux"
import 'swiper/css/pagination';
import { useParams } from "react-router-dom"
// import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import theloai from "../type"
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useEffect, useState } from 'react';
import { genres } from '../store/genres/genrescomics';
const GenresComics = () => {
    const genrescomics = useSelector(state => state.genres)
    const slug = "all"
    console.log(slug);
    const [page, setPage] = useState(1)
    const dispatch = useDispatch()
    console.log(page);
    console.log(genrescomics);
    useEffect(() => {
        dispatch(genres.getList({ type: slug, page: page }))
    }, [dispatch, slug, page])
    return (
        <div className="">
            <h1 className="">
                Thê loại truyện
            </h1>
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
                    modules={[Navigation, Autoplay]} className=" ">
                    {
                        theloai?.map((genres, index) => (
                            <SwiperSlide key={index} className='px-5 hover:bg-slate-400 py-3 cursor-pointer select-none'>
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
            <div className="grid grid-cols-3 w-11/12 mx-auto md:grid-cols-5 gap-2 my-2">

                {
                    genrescomics?.genres?.comics?.map((comics, index) => (
                        <div className="relative group group-hover:shadow-md overflow-hidden md:hover:border-emerald-300 cursor-pointer" key={index}>
                            <div className="">
                                <img className="bg-cover object-center scale-[1.01] origin-bottom select-none group-hover:scale-105 duration-300 bg-no-repeat aspect-[2/3] object-cover w-full h-full" loading="lazy" src={comics.thumbnail} alt="" />
                            </div>
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
        </div>
    )
}
export default GenresComics