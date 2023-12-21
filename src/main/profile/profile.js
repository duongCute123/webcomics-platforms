import { Link } from "react-router-dom"
import { FaAnglesRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../../images/cute-asian-girl-kawaii-anime-avatar-ai-generative-art_225753-9233.avif"
import { selectedUser } from "../../store/auth/userslice";
import { followsComics } from "../../store/followcomics/followscomics";
import { useEffect, useState } from "react";
import { GrFormView } from "react-icons/gr";
import { GiSelfLove } from "react-icons/gi";
import Menu from "../../menu/menu";
const Profile = () => {
    const user = useSelector(selectedUser)
    const follows = useSelector(state => state.followsComicsUid)
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
    return (
        <>
            <Menu />
            <div className="mx-6 my-8">
                <div className="flex flex-row gap-2 items-center">
                    <Link className="pb-0.5" to={"/"}>Home</Link>
                    <FaAnglesRight />
                    <p>Thông tin cá nhân</p>
                </div>
                <div className="">
                    <div className="">
                        <div className="flex flex-col justify-center items-center my-7 gap-2 md:flex-row md:justify-normal">
                            <img className="bg-cover border-2 border-solid border-emerald-400 bg-no-repeat object-cover rounded-full w-[150px] h-[150px] md:w-[100px] md:rounded-none md:h-auto" src={user?.photoUrl === null ? avatar : user?.photoUrl} alt="" />
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{user?.displayName === null ? 'Nguyễn Văn A' : user?.displayName}</h1>
                        </div>
                    </div>
                    <div className="md:hidden">
                        <h1 className=" text-xl sm:text-2xl md:text-3xl font-bold">Thông tin chung</h1>
                        <ul className="mx-4 my-4 flex flex-col gap-2 text-lg font-semibold">
                            <li>Họ và tên: {user?.displayName}</li>
                            <li>Đại chỉ email: {user?.email}</li>
                        </ul>
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Cập nhật thông tin</h1>
                        <p className="mx-4">UpComing</p>
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Truyện theo dõi</h1>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 my-4">
                            {
                                follows?.followsComics?.map((comics, index) => (
                                    <div className="border-2 bg-emerald-400 border-solid" key={index}>
                                        <div className="relative rounded-lg group group-hover:shadow-md overflow-hidden md:hover:border-emerald-300 cursor-pointer" key={index}>
                                            <Link to={`/detail-comics/${comics.id}`} className="">

                                                {
                                                    errorImages[index]
                                                        ?
                                                        <img className="bg-cover object-center scale-[1.01] origin-bottom 
                                        select-none group-hover:scale-105 duration-300 bg-no-repeat aspect-[2/3] object-cover w-full h-full"
                                                            loading="lazy" src={avatar} alt="" />

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
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <ul className="hidden md:block">
                        <li>
                            <Link>Thông tin chung</Link>
                        </li>
                        <li>
                            <Link>Chỉnh sửa thông tin</Link>
                        </li>
                        <li className="">
                            <Link>Truyện theo dõi</Link>
                        </li>
                    </ul>
                    <div className="hidden md:block">
                        <h1>Đợi mình làm thêm nhé h đi chạy dealine cái khác rồi mình có lm trên điện thoại rồi chịu khó nhé...!!</h1>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Profile