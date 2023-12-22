// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import avata from "../../images/cute-asian-girl-kawaii-anime-avatar-ai-generative-art_225753-9233.avif"
import { trending } from "../../store/trending/comicstrending"
import { Navigation, Autoplay } from 'swiper/modules';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import PopularComics from '../popularcomics/popularcomics';
import CompleteComics from '../complete/slidecomplete';
import RecentlyUpdate from '../recently/sliderecentlyUpdate';
import SildeBoyComics from '../boy/boy';
import SildeGirlComics from '../girl/girlslide';
import SildeNewslComics from '../news/slidenew';
import { Link, useNavigate } from 'react-router-dom';
import { followsComics } from '../../store/followcomics/followscomics';
import { selectedUser } from '../../store/auth/userslice';
import AnimationLoading from '../loading/loading';
function Trending() {
    const pages = 1
    const dispatch = useDispatch()
    const trendings = useSelector((state) => state.trending.trending)
    const loading = useSelector(state => state.trending.loading)
    const [isSwiperVisible, setIsSwiperVisible] = useState(false);
    const [isSwiperReady, setIsSwiperReady] = useState(false);

    useEffect(() => {
        dispatch(trending.getList(pages))
    }, [dispatch, pages]);

    useEffect(() => {
        if (!loading) {
            setIsSwiperVisible(true);
        }
    }, [loading]);

    const handleSwiperSlideChange = () => {
        if (isSwiperVisible && !isSwiperReady) {
            setIsSwiperReady(true);
        }
    };
    const [errorImage, setErrorImage] = useState([])
    const handlerChangeImage = (index) => {
        const updateImage = [...errorImage]
        updateImage[index] = true
        setErrorImage(updateImage)
    }
    const navigation = useNavigate()
    const user = useSelector(selectedUser)
    const addFollowerComics = ({ comicsfollow, uid, comicsID }) => {
        console.log(uid);
        if (user) {
            dispatch(followsComics.addfollowsComics({ comicsfollow: comicsfollow, uid: uid, comicsID: comicsID }))
        } else {
            navigation("/user/login")
        }
    }
    useEffect(() => {
        document.title = `CMS SME`
    }, [])
    return (
        <div className=''>


            <div className="max-w-7xl mx-auto justify-center">
                {
                    loading ?
                        <div class="border border-blue-300 shadow rounded-md p-4  w-full mx-auto">
                            <div class="animate-pulse flex space-x-4">
                                <div class="rounded-full bg-slate-700 h-10 w-10"></div>
                                <div class="flex-1 space-y-6 py-1">
                                    <div class="h-2 bg-slate-700 rounded"></div>
                                    <div class="space-y-3">
                                        <div class="grid grid-cols-3 gap-4">
                                            <div class="h-2 bg-slate-700 rounded col-span-2"></div>
                                            <div class="h-2 bg-slate-700 rounded col-span-1"></div>
                                        </div>
                                        <div class="h-2 bg-slate-700 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="">
                            <div className='flex flex-row justify-between my-4'>
                                <div className='flex flex-row items-center'>

                                    <h1 className="font-bold text-xl sm:text-2xl md:text-3xl">Truyện đề cử</h1>

                                </div>
                            </div>
                            <div className="relative" >
                                <Swiper spaceBetween={8} slidesPerView={2}
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
                                            slidesPerView: 5,
                                        },
                                    }}

                                    modules={[Navigation, Autoplay]} className="mySwiper gap-6">
                                    {
                                        trendings?.comics?.map((comics, index) => (
                                            <SwiperSlide className='' key={index}>
                                                <Link to={`/detail-comics/${comics.id}`} className='relative rounded-full'>
                                                    <div className="absolute flex flex-row gap-2 top-0  duration-300 z-10">
                                                        <button className=" px-2 text-white text-center bg-emerald-400" onClick={() => {
                                                            addFollowerComics({ comicsfollow: comics, uid: user?.uid, comicsID: comics.id })
                                                        }}> Follow</button>
                                                    </div>
                                                    <div className='w-full rounded-xl h-full'>
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
                        </div>
                }
                <PopularComics />
                <CompleteComics />
                <RecentlyUpdate />
                <SildeBoyComics />
                <SildeGirlComics />
                <SildeNewslComics />
            </div>

        </div>
    )
}
export default Trending