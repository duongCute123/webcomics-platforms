import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { recentlyUpdate } from '../../store/recently/recentlyupdate';
import { Link } from 'react-router-dom';
import { GrFormView } from "react-icons/gr";
import { GiSelfLove } from "react-icons/gi";
import { RxUpdate } from "react-icons/rx";
import avata from "../../images/cute-asian-girl-kawaii-anime-avatar-ai-generative-art_225753-9233.avif"

function RecentlyUpdate() {
    const dispatch = useDispatch()
    const recentlyUp = useSelector((state) => state.recently)
    const loading = useSelector((state) => state.recently.loading)

    useEffect(() => {
        dispatch(recentlyUpdate.getList())
    }, [dispatch])
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
    const PageNotFound = () => {
        if (recentlyUp?.recently?.comics?.length <= 0) {
            return <h1 className='flex flex-row justify-center text-center'>Page Not Found 404</h1>
        }
    }
    return (
        <>
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
                        <div className='items-center justify-between flex flex-row'>
                            <div className=''>
                                <h1 className='flex flex-row items-center gap-2 text-xl md:text-3xl sm:text-2xl font-bold mb-4 mt-6 md:mt-12'>
                                    <RxUpdate className='text-emerald-400' />
                                    Cập nhật gần đây
                                </h1>
                            </div>
                            <Link to={"/comics/recently-comics"} className="px-5 py-0.5 bg-transparent overflow-hidden
                text-emerald-500 hover:text-white hover:ring-2 hover:ring-offset-2
                hover:ring-emerald-400 duration-300 cursor-pointer
                border-emerald-500 hover:border-transparent border-2 
                rounded-full group hover:bg-emerald-500">
                                <button className="text-sm font-medium">More</button>
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mx-2">
                            <PageNotFound />
                            {
                                recentlyUp?.recently?.comics?.slice(0, 10)?.map((comics, index) => (
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
                                                <div className="flex flex-row gap-2 border-b-2 border-emerald-400">
                                                    {
                                                        comics.genres.slice(0, 3).map((genres, idx) => (
                                                            <div className="" key={idx}>
                                                                <p className=" text-sm font-semibold truncate text-gray-300 line-clamp-1">{genres.name}</p>
                                                            </div>
                                                        ))
                                                    }
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
                    </div >
            }
        </>

    )
}
export default RecentlyUpdate