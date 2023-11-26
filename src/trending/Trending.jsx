// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules

import { trending } from "../store/trending/comicstrending"
import { Navigation, Autoplay } from 'swiper/modules';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import PopularComics from '../popularcomics/popularcomics';
import CompleteComics from '../complete/slidecomplete';
import RecentlyUpdate from '../recently/sliderecentlyUpdate';
import SildeBoyComics from '../boy/boy';
import SildeGirlComics from '../girl/girlslide';
import SildeNewslComics from '../news/slidenew';
import { Link } from 'react-router-dom';
function Trending() {
    const pages = 1
    const dispatch = useDispatch()
    const trendings = useSelector((state) => state.trending.trending)
    console.log(trendings);
    const totalPage = trendings.total_pages
    console.log(totalPage);
    useEffect(() => {
        dispatch(trending.getList(pages))
    }, [dispatch, pages])
    return (
        <div className="max-w-7xl mx-auto justify-center">
            <div className="">
                <div className='flex flex-row justify-between my-4'>
                    <div className='flex flex-row items-center'>
                       
                        <h1 className="font-bold text-xl sm:text-2xl md:text-3xl">Truyện đề cử</h1>

                    </div>
                </div>
                <div className="" >
                    <Swiper spaceBetween={5} slidesPerView={3}
                        pagination={{
                            clickable: true,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 4,

                            },
                            768: {
                                slidesPerView: 5,
                            },
                            1024: {
                                slidesPerView: 6,
                            },
                        }}
                        autoplay={{ delay: 4000 }} modules={[Navigation, Autoplay]} className="mySwiper gap-5">
                        {
                            trendings?.comics?.map((comics, index) => (
                                <SwiperSlide key={index}>
                                    <Link to={`/detail-comics/${comics.id}`} className='relative'>
                                        <div className='w-full h-full'>
                                            <img className='aspect-[2/3] w-full h-full object-cover bg-cover bg-no-repeat' src={comics.thumbnail} alt="" />
                                        </div>
                                        <div className='absolute top-2/3 inset-x-0 px-2 py-2 bottom-0 bg-gradient-to-b from-transparent to-black'>
                                            <h1 className='line-clamp-2 font-bold text-lg group-hover:text-emerald-400 hover:text-emerald-400 text-white'>{comics.title}</h1>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
                <div></div>
            </div>
            <PopularComics />
            <CompleteComics />
            <RecentlyUpdate />
            <SildeBoyComics />
            <SildeGirlComics />
            <SildeNewslComics />
        </div>
    )
}
export default Trending