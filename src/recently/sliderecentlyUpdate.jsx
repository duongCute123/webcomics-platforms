import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { recentlyUpdate } from '../store/recently/recentlyupdate';
import { Link } from 'react-router-dom';
import { GrFormView } from "react-icons/gr";
import { GiSelfLove } from "react-icons/gi";
function RecentlyUpdate() {
    const dispatch = useDispatch()
    const recentlyUp = useSelector((state) => state.recently)
    console.log(recentlyUp);
    useEffect(() => {
        dispatch(recentlyUpdate.getList())
    }, [dispatch])
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
                Recently
            </h1>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mx-2">

                {
                    recentlyUp?.recently?.comics?.slice(0, 10)?.map((comics, index) => (
                        <div className="relative group group-hover:shadow-md overflow-hidden md:hover:border-emerald-300 cursor-pointer" key={index}>
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
            <div className="flex mx-auto justify-center text-center my-4">
                <h1 className="border-2 border-solid border-yellow-400 w-[150px]">Xem tất cả</h1>
            </div>
        </div >
    )
}
export default RecentlyUpdate