const DetailPage = () => {
    return (
        <div className="relative min-h-screen">

            <div className="inset-x-0 top-0 h-80 bg-gradient-to-b  from-emerald-100 -z-10 w-full absolute">
                <div className=" mx-auto max-w-5xl border-2 justify-center items-center grid grid-cols-1 md:grid-cols-4">

                    <div className="">
                        <img src="" className="bg-no-repeat bg-cover object-cover object-center" alt="" />
                    </div>
                    <div className="mx-10">
                        <h1 className="font-bold text-xl md:text-2xl">Tên Phim</h1>
                        <div className="">
                            <p>Thê loại phim</p>
                        </div>
                        <div className="">
                            <p>Thể loại genres</p>
                        </div>
                        <div className="">
                            <p>Người viết</p>
                        </div>
                        <div className="">
                            <div className="">
                                <p>Số lượt xem</p>
                            </div>
                            <div className="">
                                <p>Số lượt thíchchs</p>
                            </div>
                        </div>
                        <div className="">
                            <p>Thông tin chi tiết của bộ phim </p>
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