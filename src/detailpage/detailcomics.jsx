import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { detailcomics } from "../store/detailcomics/detailcomics"
import { Link } from "react-router-dom";
const DetailPage = () => {
    const { comic_id } = useParams()
    const detaicomicse = useSelector(state => state.detail)
    console.log(detaicomicse);
    const [chapterStart, setChapterStart] = useState(0)
    const [chapterEnd, setChapterEnd] = useState(0)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(detailcomics.findById(comic_id))
    }, [dispatch, comic_id])

    const numberchapter = detaicomicse?.detailcomics?.chapters?.length
    console.log(numberchapter);
    return (
        <div className="relative">

            <div className="inset-x-0 top-0 h-80 bg-gradient-to-b  from-emerald-100 -z-10 w-full absolute">
                <div className=" mx-auto my-10 max-w-5xl border-2 justify-center items-center grid grid-cols-1 md:grid-cols-4">

                    <div className="mx-auto justify-center my-6 rounded-lg">
                        <img src={detaicomicse.detailcomics.thumbnail} className="mx-3 bg-no-repeat rounded-lg bg-cover object-cover object-center" alt="" />
                    </div>
                    <div className="mx-10 col-span-3">
                        <h1 className="font-bold text-xl md:text-2xl">{detaicomicse.detailcomics.title}</h1>
                        <div className="col-span-3">
                            <p>{detaicomicse.detailcomics.title}</p>
                        </div>
                        <div className="flex flex-row flex-wrap gap-4 col-span-3">
                            {
                                detaicomicse?.detailcomics?.genres?.map((genres, idx) => (
                                    <p className="" key={idx}>{genres.name}</p>
                                ))
                            }
                        </div>
                        <div className="col-span-3">
                            <p>{detaicomicse.detailcomics.title}</p>
                        </div>
                        <div className="flex flex-row gap-9 col-span-3">
                            <div className="">
                                <p>{detaicomicse.detailcomics.total_views}</p>
                            </div>
                            <div className="">
                                <p>{detaicomicse.detailcomics.followers}</p>
                            </div>
                        </div>
                        <div className="col-span-3">
                            <p>{detaicomicse.detailcomics.description}</p>
                        </div>
                        <div className="flex flex-row gap-9 my-4 mx-3">
                            <input type="button" value="Read Now" />
                            <input type="button" value="Dowloading" />
                        </div>
                    </div>

                </div>
                <div className="max-w-5xl mx-auto justify-center my-5">
                    <h1>Chapter</h1>
                    <div className="">
                        {/* {
                            detaicomicse?.detailcomics?.chapters?.slice(1, 50)?.sort((a, b) => a.id - b.id)?.map((chapter, index) => (
                                <button key={index} className="border-2 h-9">{chapter.name}</button>
                            ))
                        } */}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {
                            detaicomicse?.detailcomics?.chapters?.slice()?.sort((a, b) => a.id - b.id)?.map((chapter, index) => (
                                <Link to={`/comics/${comic_id}/${chapter.id}`} className="">
                                    <button key={index} className="border-2 h-9 w-[200px]">{chapter.name}</button>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>


        </div>
    )
}
export default DetailPage