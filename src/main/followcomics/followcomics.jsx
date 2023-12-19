import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import avtar from "../../images/cute-asian-girl-kawaii-anime-avatar-ai-generative-art_225753-9233.avif"
import { followsComics } from "../../store/followcomics/followscomics";
import { selectedUser } from "../../store/auth/userslice";
import Menu from "../../menu/menu";
import { GrFormView } from "react-icons/gr";
import { GiSelfLove } from "react-icons/gi";
import { Link } from "react-router-dom";
const FollowComics = () => {
    const followcomicsUid = useSelector(state => state.followsComicsUid)
    const user = useSelector(selectedUser)
    console.log(followcomicsUid);
    const dispatch = useDispatch()
    useEffect(() => {
        if (user) {
            dispatch(followsComics.getComicsInUid(user?.uid))
        }
    }, [dispatch, user?.uid, user])
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
    console.log(followcomicsUid?.followsComics);
    return (
        <div className="">
            <Menu />
            <div className="my-2">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold px-2 pt-5 py-2">
                    Danh sách truyện bạn theo dõi
                </h1>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mx-2">

                    {
                        followcomicsUid?.followsComics?.map((comics, index) => (
                            <div className="relative rounded group group-hover:shadow-md overflow-hidden md:hover:border-emerald-300 cursor-pointer" key={index}>
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
                                                onError={() => handleImageError(index)} loading="lazy" src={comics.params?.comicsfollow.thumbnail} alt="" />

                                    }
                                </Link>
                                <div className="absolute top-1/2 bottom-0 px-2 sm:px-4 py-2 inset-x-0 flex flex-col justify-end bg-gradient-to-b from-transparent to-black">
                                    <div className="">
                                        <h1 className="font-bold text-white text-lg line-clamp-1">{comics.params?.comicsfollow.title}</h1>
                                    </div>
                                    <div className="text-center justify-center">
                                        <div className="flex flex-row gap-2 border-b-2 border-emerald-400">
                                            {
                                                comics.params?.comicsfollow.genres.slice(0, 3).map((genres, idx) => (
                                                    <div className="" key={idx}>
                                                        <p className=" text-sm font-semibold truncate text-gray-300 line-clamp-1">{genres.name}</p>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <div className="flex py-1 flex-row text-emerald-400 justify-center gap-3 text-center">
                                            <div className="bg-white/25 rounded flex text-xs flex-row items-center">
                                                <GrFormView size={20} />
                                                <p className="text-xs px-1">{convertView(comics.params?.comicsfollow.total_views)}</p>
                                            </div>
                                            <div className="bg-white/25 rounded flex flex-row items-center">
                                                <GiSelfLove />
                                                <p className="text-xs px-1">{convertView(comics.params?.comicsfollow.followers)}</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
    )
}
export default FollowComics