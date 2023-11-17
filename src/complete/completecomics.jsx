import { useEffect } from "react";
import { competecomics } from "../store/completecomics/completecomics"
import { useSelector, useDispatch } from "react-redux"
const CompleteComics = () => {
    const completecomics = useSelector(state => state.complete)
    console.log(completecomics);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(competecomics.getList())
    }, [dispatch])
    return (
        <div className='' >

        </div>
    )
}
export default CompleteComics