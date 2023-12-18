import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { followsComics } from "../../store/followcomics/followscomics";
import { selectedUser } from "../../store/auth/userslice";
import Menu from "../../menu/menu";

const FollowComics = () => {
    const followcomicsUid = useSelector(state => state.followsComicsUid)
    const user = useSelector(selectedUser)
    console.log(followcomicsUid);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(followsComics.getComicsInUid(user?.uid))
    }, [dispatch, user])
    return (
        <div className="">
            <Menu />
        </div>
    )
}
export default FollowComics