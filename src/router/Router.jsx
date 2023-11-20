import { BrowserRouter, Route, Routes } from "react-router-dom"
import Trending from "../trending/Trending"
import Menu from "../menu/menu"
import GenresComics from "../genres/genrescomics"
import DetailPage from "../detailpage/detailcomics"
import ReadComics from "../readcomics/readcomics"
import NewsComics from "../news/comicsnew"
const RouterPage = () => {
    return (
        <div className="">
            <BrowserRouter>
                <Menu />
                <Routes>
                    <Route path="/comics-trending" element={<Trending />} />
                    <Route path="/comics-genres/:slug" element={<GenresComics />} />
                    <Route path="/detail-comics/:comic_id" element={<DetailPage />} />
                    <Route path="/comics/:comic_id/:chapter_id" element={<ReadComics />} />
                    <Route path="/comics/news/:slug" element={<NewsComics />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default RouterPage