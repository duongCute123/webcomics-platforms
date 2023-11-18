import { BrowserRouter, Route, Routes } from "react-router-dom"
import Trending from "../trending/Trending"
import Menu from "../menu/menu"
import GenresComics from "../genres/genrescomics"
const RouterPage = () => {
    return (
        <div className="">
            <BrowserRouter>
                <Menu />
                <Routes>
                    <Route path="/comics-trending" element={<Trending />} />
                    <Route path="/comics-genres" element={<GenresComics />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default RouterPage