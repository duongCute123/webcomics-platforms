import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { detailcomics } from "../store/detailcomics/detailcomics"
const DetailPage = () => {
    const { comic_id } = useParams()
    const detaicomicse = useSelector(state => state.detail)
    console.log(detaicomicse);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(detailcomics.findById(comic_id))
    }, [dispatch, comic_id])
    return (
        <div className="relative min-h-screen">

            <div className="inset-x-0 top-0 h-80 bg-gradient-to-b  from-emerald-100 -z-10 w-full absolute">
                <div className=" mx-auto max-w-5xl border-2 justify-center items-center grid grid-cols-1 md:grid-cols-4">

                    <div className="mx-auto justify-center my-6 rounded-lg">
                        <img src={detaicomicse.detailcomics.thumbnail} className="bg-no-repeat rounded-lg bg-cover object-cover object-center" alt="" />
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
                <div className="">
                    <h1>Chapter</h1>
                    <div className="">
                        <p>0-50</p>
                    </div>
                    <div className="">
                        <div>Chương 1</div>
                    </div>
                </div>
            </div>


        </div>
    )
}
export default DetailPage