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
import CompleteComics from '../complete/completecomics';
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
        <div className="">
            <div className="">
                <div className='flex flex-row justify-between mx-5 my-4'>
                    <div>
                        <h1 className="uppercase font-bold text-3xl">Truyện đề cử</h1>
                    </div>
                    <div className="">
                        <p className='font-bold'>Xem tất cả</p>
                    </div>
                </div>
                <div className="mx-4">
                    <Swiper spaceBetween={5} slidesPerView={6} autoplay={{ delay: 4000 }} modules={[Navigation, Autoplay]} className="mySwiper gap-5">
                        {
                            trendings?.comics?.map((comics, index) => (
                                <SwiperSlide key={index}>
                                    <div className=''>
                                        <div className='w-full h-full'>
                                            <img className='aspect-[2/3] w-full h-full object-cover bg-cover bg-no-repeat' src={comics.thumbnail} alt="" />
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
                <div></div>
            </div>
            <PopularComics />
            <CompleteComics />
        </div>
    )
}
export default Trending