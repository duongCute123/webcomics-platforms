import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useParams } from "react-router-dom"
import { search } from "../store/search/search"
import { GoChevronRight } from "react-icons/go";
import ReactPaginate from "react-paginate"
import { BiChevronRight, BiChevronLeft } from "react-icons/bi"
import { searchPage } from "../@contrain"
const SearchPage = () => {
    // lây thông tin người dùng cần tìm kiếm từ ô input
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("q")
    const [pageRanges, setpageRanges] = useState()
    const searchSuggest = useSelector(state => state.searchcomics)
    const [page, setPage] = useState(1)
    const dispatch = useDispatch()
    const toTalPage = searchSuggest?.search?.total_pages
    console.log(toTalPage);
    // Gọi lấy data tìm kiếm không cần goi api lấy dữ liệu theo đề nghị bam đầu 
    // lấy dữ liệu gọi theo api dưới cái này chỉ dùng để tìm kiếm
    // useEffect(() => {
    //     dispatch(search.searchSuggest(query))
    // }, [dispatch, query])
    // Gọi lấy data phân trang
    useEffect(() => {
        dispatch(search.queryPage({ query: query, page: page }))
    }, [dispatch, query, page])
    const handlePageChange = (selectedPage) => {
        setPage(selectedPage.selected + 1);
    };
    return (
        <div className="min-h-screen">
            {
                searchSuggest?.search?.comics?.length > 0
                    ?
                    <div className="w-11/12 md:w-9/12 mx-auto justify-center">
                        <div className="flex flex-wrap items-center my-4">
                            <div className="font-bold text-lg justify-center items-center text-center flex flex-wrap">
                                <Link to={"/"}>Home</Link>
                                <GoChevronRight />
                                <h1>Tìm kiếm truyện:</h1>
                                <GoChevronRight />
                            </div>
                            <div>
                                <p>{query}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5 ">
                            {
                                searchSuggest?.search?.comics?.map((searchpage, idx) => (
                                    <Link to={`/detail-comics/${searchpage.id}`} className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-gray-50 rounded-lg border border-solid border-gray-50" key={idx}>
                                        <div className="justify-center w-32 h-full items-center text-center mx-auto">
                                            <img src={searchpage.thumbnail} className="bg-cover bg-none w-full h-ful mx-2 border-2 border-solid border-red-400 object-cover aspect-[2/3]" alt="" />
                                        </div>
                                        <div className="">
                                            <h3 className="line-clamp-2 text-center font-semibold text-sm">{searchpage.title}{(searchpage.short_description)}</h3>
                                            <ul className=" flex flex-wrap gap-3 mx-auto justify-center">
                                                {
                                                    searchpage?.genres?.map((genres) => (
                                                        <li className="bg-cyan-100 rounded-full text-xs px-1.5 py-0.5" key={genres.id}>{genres.name}</li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                        <div className='my-9'>
                            <ReactPaginate
                                className='flex gap-4 justify-center hover:no-underline font-bold  items-center text-center'
                                pageCount={toTalPage} // Tổng số trang
                                pageRangeDisplayed={pageRanges} // Số lượng nút phân trang hiển thị
                                marginPagesDisplayed={2} // Số lượng nút phân trang hiển thị ở hai đầu
                                onPageChange={handlePageChange} // Xử lý sự kiện khi người dùng chuyển trang
                                containerClassName="pagination"
                                activeClassName="text-white bg-yellow-400"
                                disabledClassName="disabled"
                                nextLabel={<BiChevronRight size={"25px"} />}
                                pageClassName="border-solid border-2 border-yellow-400 rounded-full justify-center items-center w-10"

                                previousClassName={page === 1 ? 'hidden' : ''}
                                previousLabel={
                                    <div className="flex items-center justify-center text-center">
                                        <BiChevronLeft size={"25px"} />
                                    </div>
                                }
                                pageLinkClassName={""}
                                activeLinkClassName={""}
                            />
                            {/* <Pagination currentPage={currentPage} totalPages={toTalPage} onPageChange={handlePageChange}/> */}
                        </div>
                    </div>
                    :
                    <div>
                        <div className="flex flex-row items-center my-4">
                            <div className="font-bold text-lg justify-center items-center text-center flex flex-row">
                                <Link to={"/"}>Home</Link>
                                <GoChevronRight />
                                <h1>Tìm kiếm truyện:</h1>
                                <GoChevronRight />
                            </div>
                            <div>
                                <p>{query}</p>
                            </div>
                        </div>
                        <div className="text-center mx-auto justify-center items-center">
                            <h1>Rất tiếc</h1>
                            <p>Không tìm thấy truyện bạn cần tìm vui lòng nhập đầy đủ thông tin</p>
                        </div>
                    </div>
            }
        </div>
    )
}
export default SearchPage