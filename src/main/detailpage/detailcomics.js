import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom";
import { detailcomics } from "../../store/detailcomics/detailcomics"
import { Link } from "react-router-dom";
import { CgReadme } from "react-icons/cg";
import avata from "../../images/cute-asian-girl-kawaii-anime-avatar-ai-generative-art_225753-9233.avif"
import { GrFormView } from "react-icons/gr";
import React from "react";
import { GiSelfLove } from "react-icons/gi";
import { FaDownload } from "react-icons/fa6";
import AnimationLoading from "../loading/loading";
import Menu from "../../menu/menu";
const DetailPage = () => {
    const [chaptersSection, setChapterSession] = useState([
        {
            name: "",
            id: 0
        }
    ])
    const { comic_id } = useParams()
    const detaicomicse = useSelector(state => state.detail)
    const loading = useSelector(state => state.detail.loading)
    const chapterPerPage = 50
    const navigation = useNavigate()
    const [currentPage, setCurrentChapter] = useState(0)
    const [isShow, setIsShow] = useState(false)
    const dispatch = useDispatch()
    // Lấy tất cả thông tin của bộ truyện cần tìm
    useEffect(() => {
        dispatch(detailcomics.findById(comic_id))
    }, [dispatch, comic_id])
    // Lỗi không gọi lại khi bấm lấy chuyện khác
    // const LayChapterSession = useCallback((chapterPerPage, chapterEnd) => {
    //     setChapterSession(getChapter(0, chapterPerPage, chapterEnd))
    // }, [setChapterSession])
    // // Lấy value của 50 chapter đầu tiên của truyện
    // useEffect(() => {
    //     LayChapterSession(chapterPerPage, detaicomicse?.detailcomics?.chapters)
    // }, [LayChapterSession, chapterPerPage, detaicomicse?.detailcomics?.chapters])
    useEffect(() => {
        setChapterSession(getChapter(0, chapterPerPage, detaicomicse?.detailcomics?.chapters))
    }, [setChapterSession, chapterPerPage, detaicomicse?.detailcomics?.chapters])
    // const numberchapter = detaicomicse?.detailcomics?.chapters?.length
    const newChapter = detaicomicse?.detailcomics?.chapters?.[0]?.name?.match(/\d+(\.\d+)?/)?.[0];
    // Tính số chapter từ khoảng 0-50 chapter trên mỗi button khi bấm thì thay đổi
    const totalChapter = !isNaN(Number(newChapter))
        ? Math.ceil(Math.floor(Number(newChapter)) / chapterPerPage)
        : 0


    // Lây 50 chapter của chương truyện nếu có thì trả về số chapter là 50
    const getChapter = (chapterstart, chapterend) => {
        const chaptersData = Array.isArray(detaicomicse.detailcomics.chapters) ? detaicomicse.detailcomics.chapters : [];
        const limit = chapterPerPage * 6;

        const chapters = chaptersData
            .slice()
            .reverse()
            .slice(chapterstart < limit ? 0 : chapterstart - limit, chapterend + limit)
            .filter((chapter) => {
                const chap = chapter.name.match(/\d+(\.\d+)?/)?.[0];
                if (!chap) return false;
                if (parseFloat(chap) >= chapterstart && parseFloat(chap) <= chapterend) {
                    return true;
                }
                return false;
            });
        return chapters;
    };

    const handlerChangeChapter = (idx) => {
        setCurrentChapter(idx)
        setChapterSession(getChapter(
            idx === 0
                ?
                0
                :
                idx * chapterPerPage + 1, (idx + 1) * chapterPerPage + 0.99
        ))

    }
    const [errImage, setErrImage] = useState(false)
    useEffect(() => {
        document.title = `${detaicomicse.detailcomics.title} | Comics Dương`
    }, [detaicomicse.detailcomics.title])
    return (
        <div className="">
            <Menu />
            <div className="relative w-full">
                {
                    loading ?
                        <AnimationLoading />
                        :
                        <div className="inset-x-0 top-0 h-80 bg-gradient-to-b  from-emerald-100 -z-10 w-full absolute">
                            <div className=" mx-auto my-10 max-w-5xl justify-center items-center grid grid-cols-1 md:grid-cols-4">

                                <div className="mx-auto  justify-center items-center my-6 rounded-lg">
                                    {
                                        errImage ?
                                            <img src={avata} className="mx-3 bg-no-repeat rounded-lg bg-cover lg:w-full h-full object-cover object-center" width={"300px"} alt="" />
                                            :
                                            <img onError={() => setErrImage(true)} src={detaicomicse.detailcomics.thumbnail} className="mx-3 bg-no-repeat rounded-lg bg-cover w-full h-full object-cover object-center" alt="" />

                                    }
                                </div>
                                <div className="mx-10 col-span-3">
                                    <h1 className="font-bold text-xl md:text-2xl">{detaicomicse.detailcomics.title}</h1>
                                    <div className="col-span-3">
                                        <ul className="flex flex-wrap gap-4">
                                            {
                                                detaicomicse.detailcomics?.other_names?.map((orther_name, idx) => (
                                                    <li key={idx}>{orther_name}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                    <div className="flex flex-row flex-wrap gap-2 col-span-3">
                                        {
                                            detaicomicse?.detailcomics?.genres?.map((genres, idx) => (
                                                <p className="border border-solid border-emerald-300 font-bold text-center text-xs px-2 py-0.5" key={idx}>{genres.name}</p>
                                            ))
                                        }
                                    </div>
                                    <div className="col-span-3 flex gap-1">
                                        <h1 className="font-bold">Creator:</h1>
                                        <p className="text-fuchsia-500">{detaicomicse?.detailcomics?.authors}</p>
                                    </div>
                                    <div className="flex flex-row gap-9 col-span-3">
                                        <div className="flex items-center flex-row">
                                            <GrFormView size={20} color="blue" />
                                            <p>{detaicomicse.detailcomics.total_views}</p>
                                        </div>
                                        <div className="flex items-center flex-row">
                                            <GiSelfLove color="red" />
                                            <p>{detaicomicse.detailcomics.followers}</p>
                                        </div>
                                    </div>
                                    <div className="col-span-3">
                                        <p className={`${isShow ? 'line-clamp-none' : 'line-clamp-5'}`}>{detaicomicse.detailcomics.description}</p>
                                        <button className="font-bold text-sm" onClick={() => setIsShow(!isShow)}>{isShow ? "Show less" : "Show more"}</button>
                                    </div>
                                    <div className="flex flex-row gap-9 my-4">
                                        <button
                                            onClick={() => {
                                                // Lấy thông tin id đầu tiên của chương truyện
                                                // Cái còn lại là push sang trang đọc truyện thôi nè
                                                navigation(`/comics/${comic_id}/${detaicomicse?.detailcomics?.chapters?.at(-1)?.id}`)
                                            }}
                                            className="bg-emerald-500 flex items-center  gap-1 h-[36px] w-[130px] text-center justify-center font-bold text-white text-lg rounded">
                                            <CgReadme size={25} />
                                            Read Now</button>
                                        {/* <input type="button" className="" value="Read Now" /> */}
                                        {/* <input type="button" value="Dowloading" /> */}
                                        <button className="flex items-center gap-1 h-[36px] w-[130px] text-center justify-center font-bold text-emerald-500 border border-emerald-400 text-lg rounded">
                                            <FaDownload />
                                            Download
                                        </button>
                                    </div>
                                </div>

                            </div>
                            <div className="max-w-5xl mx-auto justify-center my-5">
                                {
                                    detaicomicse?.detailcomics?.chapters?.length > 0
                                        ?
                                        <div className="border-b-2 my-2 w-[97%] justify-center mx-auto border-emerald-300">
                                            <h1>Chapter</h1>
                                        </div>
                                        :
                                        <>
                                            <h1>No chapter</h1>
                                        </>
                                }

                                <div className="flex items-center gap-3 my-5 text-gray-800 font-semibold text-sm flex-wrap">
                                    {[...Array(totalChapter).keys()].map((_, idx) => (
                                        <button
                                            key={idx}
                                            className={`px-2 py-0.5 rounded-full ${idx === currentPage ? 'bg-emerald-100 text-emerald-500' : 'bg-gray-100'
                                                }`}
                                            onClick={() => handlerChangeChapter(idx)}
                                        >
                                            {idx === totalChapter - 1 ? (
                                                `${totalChapter === 1 ? 0 : idx * chapterPerPage + 1} - ${newChapter}`
                                            ) : (
                                                `${idx === 0 ? 0 : idx * chapterPerPage + 1} - ${(idx + 1) * chapterPerPage}`
                                            )}
                                        </button>
                                    ))}
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mx-2">
                                    {
                                        chaptersSection?.map((chapter, index) => (
                                            <Link to={`/comics/${comic_id}/${chapter.id}`} key={index} className="">
                                                <button key={index} className="border-2 w-full">{chapter.name}</button>
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                }


            </div>
        </div>
    )
}
export default DetailPage