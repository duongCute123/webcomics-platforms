import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { competecomics } from "../store/completecomics/completecomics";
import { boy } from "../../store/boy/boy";
import { GrFormView } from "react-icons/gr";
import avatar from "../../images/cute-asian-girl-kawaii-anime-avatar-ai-generative-art_225753-9233.avif"
import { GiSelfLove } from "react-icons/gi";
import { Link } from "react-router-dom";
import { BsGenderMale } from "react-icons/bs";
const SildeBoyComics = () => {
    const boycomics = useSelector(state => state.boy)
    const loading = useSelector(state => state.boy)
    console.log(loading);
    console.log(boycomics);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(boy.getList())
    }, [dispatch])
    const [errorImage, setErrorImage] = useState([])
    const handlerChangeImage = (index) => {
        const updateImageError = [...errorImage]
        updateImageError[index] = true
        setErrorImage(updateImageError)
    }
    const convertView = (number) => {
        if (number > 1000000) {
            return (number / 1000000).toFixed(0) + 'm'
        }
        if (number > 100000) {
            return (number / 100000).toFixed(0) + 'k'
        }
        return number.toString()
    }
    return (
        <div className="">
            <div className="flex flex-row justify-between items-center">
                <div className="">
                    <h1 className=" font-bold flex flex-row justify-center gap-2 text-xl md:text-3xl sm:text-2xl mb-4 mt-6 md:mt-12">
                        <BsGenderMale className="text-emerald-400" />
                        Truyện tranh cậu bé
                    </h1>
                </div>
                <div className="px-5 py-0.5 bg-transparent overflow-hidden
                text-emerald-500 hover:text-white hover:ring-2 hover:ring-offset-2
                hover:ring-emerald-400 duration-300 cursor-pointer
                border-emerald-500 hover:border-transparent border-2 
                rounded-full group hover:bg-emerald-500">
                    <button className="text-sm font-medium">More</button>
                </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mx-2">

                {
                    boycomics?.boy?.comics?.slice(0, 10)?.map((comics, index) => (
                        <div className="relative rounded group group-hover:shadow-md overflow-hidden md:hover:border-emerald-300 cursor-pointer" key={index}>
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
                                        <img className="bg-cover object-center scale-[1.01] origin-bottom select-none group-hover:scale-105 duration-300 bg-no-repeat aspect-[2/3] object-cover w-full h-full" loading="lazy" src={avatar} alt="" />
                                        :
                                        <img onError={() => handlerChangeImage(index)} className="bg-cover object-center scale-[1.01] origin-bottom select-none group-hover:scale-105 duration-300 bg-no-repeat aspect-[2/3] object-cover w-full h-full" loading="lazy" src={comics.thumbnail} alt="" />

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
                                            <p className="text-xs">{convertView(comics.followers)}</p>
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
export default SildeBoyComics