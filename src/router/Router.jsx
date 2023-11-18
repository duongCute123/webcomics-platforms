import { BrowserRouter, Route, Routes } from "react-router-dom"
import Trending from "../trending/Trending"
import Menu from "../menu/menu"
import GenresComics from "../genres/genrescomics"
import DetailPage from "../detailpage/detailcomics"
const RouterPage = () => {
    return (
        <div className="">
            <BrowserRouter>
                <Menu />
                <Routes>
                    <Route path="/comics-trending" element={<Trending />} />
                    <Route path="/comics-genres" element={<GenresComics />} />
                    <Route path="/comics-genres/detail-comics/:slug" element={<DetailPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default RouterPage