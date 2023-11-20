import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { detailcomics } from "../store/detailcomics/detailcomics";
import "../App.css"
const ReadComics = () => {
    const { comic_id } = useParams()
    const { chapter_id } = useParams()
    console.log(comic_id, chapter_id);
    const singleChapter = useSelector(state => state.detail)
    console.log(singleChapter);
    const [isHidden, setIsHidden] = useState(false)
    const [rangeval, setRangeval] = useState(1);
    console.log(typeof singleChapter?.detailcomics?.chapters)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(detailcomics.findByIdSingleChapter({ comic_id: comic_id, chapter_id: chapter_id }))
    }, [dispatch, comic_id, chapter_id])
    const showEpisodes = () => {
        setIsHidden(!isHidden)
    }
    const handlerNext=()=>{
        
    }
    console.log(rangeval);
    return (
        <div className="bg-black">
            <div className="fixed text-center flex flex-row bg-black/90 opacity-80 text-white w-full h-11 py-2 font-semibold text-xl top-0 mx-auto justify-center">
                <Link to={`/detail-comics/${comic_id}`}>{singleChapter?.detailcomics?.comic_name}</Link>- <p>{singleChapter?.detailcomics?.chapter_name}</p>
            </div>
            <div className="justify-center mx-auto">
                {
                    singleChapter?.detailcomics?.images?.map((chapters, index) => (
                        <img src={chapters.src} className="mx-auto justify-center bg-cover bg-no-repeat object-cover" alt="" key={index} />
                    ))
                }
            </div>
            <div className="fixed text-center flex flex-row bg-black/90 gap-6 opacity-80 text-green-400 w-full h-14 py-2 font-semibold md:text-2xl bottom-0 mx-auto justify-center">
                <div className="hidden md:block mx-6">
                    <span>{rangeval} vs {singleChapter?.detailcomics?.images?.length}</span>
                    <input type="range" min={1} step={1} max={singleChapter?.detailcomics?.images?.length} onChange={(e) => { setRangeval(e.target.value) }} />
                </div>
                <div className="flex-row gap-8 mx-auto justify-center flex">
                    <input type="button" value="Previous" />
                    <input type="button" value="Next" />
                    {/* <button type="button" value="Episodes" /> */}
                    <button className="relative" onClick={showEpisodes}>
                        Episodes
                        <div className={` ${isHidden ? "block" : "hidden"} absolute bottom-12 w-60 translate-x-1/3 right-full  sm:right-1/2 duration-200 text-left py-3 rounded-lg bg-black opacity-75 text-white`}>
                            <h1 className="text-center">All Episodes {singleChapter?.detailcomics?.chapters?.length}</h1>
                            <ul className="overflow-auto no-scrollbar text-sm h-max max-h-72 font-normal">
                                <li className="flex flex-col gap-4 mx-auto justify-center">
                                    {
                                        singleChapter?.detailcomics?.chapters?.map((episodes, idx) => (
                                            <Link to={`/comics/${comic_id}/${episodes.id}`} className="mx-auto hover:bg-black/90 justify-center" key={idx}>{episodes.name}</Link>
                                        ))
                                    }

                                </li>
                            </ul>
                        </div>
                    </button>
                </div>
                <span className="hidden md:block">|</span>
                <div className="hidden md:block mx-6">
                    <input type="button" value="Download" />
                </div>
            </div>
        </div>
    )
}
export default ReadComics