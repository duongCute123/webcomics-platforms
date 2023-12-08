// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import avata from "../images/cute-asian-girl-kawaii-anime-avatar-ai-generative-art_225753-9233.avif"
import { trending } from "../store/trending/comicstrending"
import { Navigation, Autoplay } from 'swiper/modules';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect,useState } from 'react';
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
    const [errorImage, setErrorImage] = useState([])
    const handlerChangeImage = (index) => {
        const updateImage = [...errorImage]
        updateImage[index] = true
        setErrorImage(updateImage)
    }
    return (
        <div className="max-w-7xl mx-auto justify-center">
            <div className="">
                <div className='flex flex-row justify-between my-4'>
                    <div className='flex flex-row items-center'>

                        <h1 className="font-bold text-xl sm:text-2xl md:text-3xl">Truyện đề cử</h1>

                    </div>
                </div>
                <div className="" >
                    <Swiper spaceBetween={5} slidesPerView={2}
                        pagination={{
                            clickable: true,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 3,

                            },
                            768: {
                                slidesPerView: 5,
                            },
                            1024: {
                                slidesPerView: 6,
                            },
                        }}
                        autoplay={{ delay: 4000 }} modules={[Navigation, Autoplay]} className="mySwiper gap-6">
                        {
                            trendings?.comics?.map((comics, index) => (
                                <SwiperSlide className='rounded' key={index}>
                                    <Link to={`/detail-comics/${comics.id}`} className='relative rounded'>
                                        <div className='w-full h-full'>
                                            {
                                                errorImage[index] ?
                                                    <img className="bg-cover object-center scale-[1.01] origin-bottom select-none group-hover:scale-105 duration-300 bg-no-repeat aspect-[2/3] object-cover w-full h-full" loading="lazy" src={avata} alt="" />
                                                    :
                                                    <img className="bg-cover object-center scale-[1.01] origin-bottom select-none group-hover:scale-105 duration-300 bg-no-repeat aspect-[2/3] object-cover w-full h-full" onError={() => handlerChangeImage(index)} loading="lazy" src={comics.thumbnail} alt="" />

                                            }
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