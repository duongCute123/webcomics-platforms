import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import Trending from "../trending/Trending"
import Menu from "../menu/menu"
import GenresComics from "../genres/genrescomics"
import DetailPage from "../detailpage/detailcomics"
import ReadComics from "../readcomics/readcomics"
import NewsComics from "../news/comicsnew"
import HomepageComics from "../homepage/homepage"
import SearchPage from "../search/searchcomics"
import ComicsTop from "../main/top/comicstop"
import LoginPage from "../main/login/login"
import RegisterPage from "../main/login/register"
import BoyComics from "../boy/boycomics"
import GirlComics from "../girl/girlcomics"
// import { createBrowserHistory } from "history"

// import * as history from 'history';
// import { useEffect } from "react"
// const history = createBrowserHistory()
const RouterPage = () => {
    return (
        <div className="">
            <BrowserRouter>
                <Menu />
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
                    <Route path="/comics/top" element={<ComicsTop />} />
                    <Route path="/comics/search" element={<SearchPage />} />
                    <Route path="/user/login" element={<LoginPage />} />
                    <Route path="/user/register" element={<RegisterPage />} />
                </Routes>
                {/* </Router> */}
            </BrowserRouter>
        </div>
    )
}
export default RouterPage