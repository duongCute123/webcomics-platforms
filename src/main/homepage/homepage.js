import { useEffect, useState } from "react"
import Menu from "../../menu/menu"
import Trending from "../trending/Trending"
import AnimationLoading from "../loading/loading"

const HomepageComics = () => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    })
    return (
        <div className="">
            {
                loading ?
                    <AnimationLoading />
                    :
                    <>
                        <Menu />
                        <Trending />
                    </>
            }
        </div>
    )
}
export default HomepageComics