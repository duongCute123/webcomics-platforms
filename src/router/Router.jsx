import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomepageComics from "../main/homepage/homepage"
import Trending from "../main/trending/Trending"
import GenresComics from "../main/genres/genrescomics"
import DetailPage from "../main/detailpage/detailcomics"
import ReadComics from "../main/readcomics/readcomics"
import NewsComics from "../main/news/comicsnew"
import BoyComics from "../main/boy/boycomics"
import GirlComics from "../main/girl/girlcomics"
import PopulaComics from "../main/popularcomics/popular"
import RecentlyComics from "../main/recently/recentlycomics"
import ComicsTop from "../main/top/comicstop"
import SearchPage from "../main/search/searchcomics"
import LoginPage from "../main/login/login"
import RegisterPage from "../main/login/register"
import CompleteComics from "../main/complete/completecomic"
import FollowComics from "../main/followcomics/followcomics"

// import { createBrowserHistory } from "history"

// import * as history from 'history';
// import { useEffect } from "react"
// const history = createBrowserHistory()
const RouterPage = () => {
    return (
        <div className="">
            <BrowserRouter>
                {/* <Router history={history}> */}
                <Routes>
                    <Route path="/" element={<HomepageComics />} />
                    <Route path="/comics-trending" element={<Trending />} />
                    <Route path="/comics-genres/:slug" element={<GenresComics />} />
                    <Route path="/detail-comics/:comic_id" element={<DetailPage />} />
                    <Route path="/comics/:comic_id/:chapter_id" element={<ReadComics />} />
                    <Route path="/comics/news/:slug" element={<NewsComics />} />
                    <Route path="/comics/boy-comics" element={<BoyComics />} />
                    <Route path="/comics/girl-comics" element={<GirlComics />} />
                    <Route path="/comics/popular-comics" element={<PopulaComics />} />
                    <Route path="/comics/complete-comics" element={<CompleteComics />} />
                    <Route path="/comics/recently-comics" element={<RecentlyComics />} />
                    <Route path="/comics/top" element={<ComicsTop />} />
                    <Route path="/comics/search" element={<SearchPage />} />
                    <Route path="/user/login" element={<LoginPage />} />
                    <Route path="/user/register" element={<RegisterPage />} />
                    <Route path="/comics/follow" element={<FollowComics />} />
                </Routes>
                {/* </Router> */}
            </BrowserRouter>
        </div>
    )
}
export default RouterPage