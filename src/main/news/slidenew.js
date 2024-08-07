import { useEffect, useState } from "react"
import avtar from "../../images/cute-asian-girl-kawaii-anime-avatar-ai-generative-art_225753-9233.avif"
import { useDispatch, useSelector } from "react-redux"
// import { competecomics } from "../../store/completecomics/completecomics";
import { news } from "../../store/news/news";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GrFormView } from "react-icons/gr";
import { GiSelfLove } from "react-icons/gi";
import { Link } from "react-router-dom";
const SildeNewslComics = () => {
    const newscomics = useSelector(state => state.news)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(news.getList())
    }, [dispatch])
    const [errorImages, setErrorImages] = useState([]);
    const handleImageError = (index) => {
        const updatedErrorImages = [...errorImages];
        updatedErrorImages[index] = true;
        setErrorImages(updatedErrorImages);
    };
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
        <div className="">
            <h1>
                News
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mx-2">

                {
                    newscomics?.news?.comics?.slice(0, 10)?.map((comics, index) => (
                        <div className="relative rounded group group-hover:shadow-md overflow-hidden md:hover:border-emerald-300 cursor-pointer" key={index}>
                            <div className="absolute flex flex-row gap-2 top-0 duration-300 z-10">
                                <span className={`${comics.is_trending === true ? 'bg-rose-500 ' : 'hidden'}  text-center py-0.5 px-2 text-white`}>
                                    {comics.is_trending === true ? 'Hot' : ''}
                                </span>
                                <span className={`${comics.is_trending === true ? 'bg-sky-500 ' : 'hidden'}  text-center py-0.5 px-2 text-white`}>
                                    {comics.is_trending === true ? 'End' : 'hidden'}
                                </span>
                                <span className=" bg-amber-400 text-center py-0.5 px-2 text-white">
                                    {comics.status !== "Completed" ? 'Up' : 'Up'}
                                </span>
                            </div>
                            <Link to={`/detail-comics/${comics.id}`} className="">

                                {
                                    errorImages[index]
                                        ?
                                        <img className="bg-cover object-center scale-[1.01] origin-bottom 
                                        select-none group-hover:scale-105 duration-300 bg-no-repeat aspect-[2/3] object-cover w-full h-full"
                                            loading="lazy" src={avtar} alt="" />

                                        :
                                        <img className="bg-cover object-center scale-[1.01] origin-bottom select-none 
                                        group-hover:scale-105 duration-300 bg-no-repeat aspect-[2/3] object-cover w-full h-full"
                                            onError={() => handleImageError(index)} loading="lazy" src={comics.thumbnail} alt="" />

                                }
                            </Link>
                            <div className="absolute top-1/2 bottom-0 px-2 sm:px-4 py-2 inset-x-0 flex flex-col justify-end bg-gradient-to-b from-transparent to-black">
                                <div className="">
                                    <h1 className="font-bold text-white text-lg line-clamp-1">{comics.title}</h1>
                                </div>
                                <div className="text-center justify-center">
                                    <div className="flex flex-row gap-2 border-b-2 border-emerald-400">
                                        <hr className="border-b-2 mt-3 mb-0.5 border-emerald-400"></hr>
                                        <div className="flex items-center mt-1 gap-2 text-sm text-gray-300 font-semibold truncate">
                                            <AiOutlineLoading3Quarters size={"20px"} color="white" className="animate-spin" />
                                            <p className=" text-sm font-semibold truncate text-gray-300 line-clamp-1">Updating</p>
                                        </div>
                                    </div>
                                    <div className="flex py-1 flex-row text-emerald-400 justify-center gap-3 text-center">
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
        </div>
    )
}
export default SildeNewslComics