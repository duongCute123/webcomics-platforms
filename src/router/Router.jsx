import { BrowserRouter, Route, Routes } from "react-router-dom"
import Trending from "../trending/Trending"
import Menu from "../menu/menu"
const RouterPage = () => {
    return (
        <div className="">
            <BrowserRouter>
                <Menu />
                <Routes>
                    <Route path="/comics-trending" element={<Trending />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default RouterPage