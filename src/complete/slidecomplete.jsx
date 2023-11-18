import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { competecomics } from "../store/completecomics/completecomics";


const CompleteComics = () => {
    const completecomic = useSelector(state => state.complete)
    console.log(completecomic);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(competecomics.getList())
    }, [dispatch])
    return (
        <div className="">
            <h1>
                Truyện nhiều người đọc
            </h1>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mx-2">

                {
                    completecomic?.completeComics?.comics?.slice(0, 10)?.map((comics, index) => (
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
            <div className="flex mx-auto justify-center text-center my-4">
                <h1 className="border-2 border-solid border-yellow-400 w-[150px]">Xem tất cả</h1>
            </div>
        </div>
    )
}
export default CompleteComics