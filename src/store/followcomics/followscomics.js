import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore"
import { db } from "../../@config"
import { collectionfollow } from "../../@contrain"
import { toast } from "react-toastify"

const appName = 'Comics'
const moduleName = 'followsComics'
export const followsComics = {
    addfollowsComics: createAsyncThunk(`${appName}/${moduleName}/followsComics`, async (params, thunkAPI) => {
        const { comicsfollow, uid, comicsID } = params
        try {
            // Lấy dữ liệu về
            const querySnapshot = await getDocs(collection(db, "follows"));
            const followsComics = querySnapshot.docs
                .map(doc => doc.data())
                // Kiểm tra xem trong cơ sở dữ liệu có truyện cẩn theo dõi chưa
                // Nếu có dồi thì không có thêm vào mà sẽ báo lỗi cho người dùng biết
                // Nếu chưa có thì thêm dữ liệu vvaif trong db
                .filter(follow => follow.params && follow.params.uid === uid)
                .filter(follow => follow.params && follow.params.comicsfollow && follow.params.comicsfollow.id === comicsID);
            if (followsComics.length === 0) {
                await addDoc(collection(db, "follows"), {
                    params: {
                        comicsfollow: comicsfollow,
                        uid: uid
                    }
                })
                toast("Theo dõi phim thành công nhé..!!")
            } else {
                toast("Bạn đã theo dõi truyện này rồi..!!")
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }),
    getComicsInUid: createAsyncThunk(`${appName}/${moduleName}/getByuid`, async (params, thunkAPI) => {
        console.log(params);
        try {
            const querySnapshot = await getDocs(collection(db, "follows"));
            const followsComics = querySnapshot.docs
                .map(doc => doc.data())
                .filter(follow => follow.params && follow.params.uid === params);
            return followsComics;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error)
        }
    }),
    unfollowcomics: createAsyncThunk(`${appName}/${moduleName}`, async (params, thunkAPI) => {
        try {
            const documentRef = doc(db, collectionfollow, params)
            await deleteDoc(documentRef)
            console.log("Xoá thành công với dữ liệu là:", params);
        } catch (error) {
            return thunkAPI.rejectWithValue("Lỗi huỷ theo dõi bộ phim")
        }
    })
}
const followsSlice = createSlice({
    name: `${appName}/${moduleName}`,
    initialState: {
        loading: false,
        followsComics: [],
        error: null
    },
    reducers: {

    },
    extraReducers: builders => {
        builders
            .addCase(followsComics.addfollowsComics.pending, (state) => {
                state.loading = true
                state.followsComics = []
                state.error = null
            })
            .addCase(followsComics.addfollowsComics.fulfilled, (state, { payload }) => {
                state.loading = false
                state.followsComics = payload
                state.error = null
            })
            .addCase(followsComics.addfollowsComics.rejected, (state, { error }) => {
                state.loading = false
                state.followsComics = []
                state.error = error
            })
            .addCase(followsComics.getComicsInUid.pending, (state) => {
                state.loading = true
                state.followsComics = []
                state.error = null
            })
            .addCase(followsComics.getComicsInUid.fulfilled, (state, { payload }) => {
                console.log(payload);
                state.loading = false
                state.followsComics = payload
                state.error = null
            })
            .addCase(followsComics.getComicsInUid.rejected, (state, { error }) => {
                state.loading = false
                state.followsComics = []
                state.error = error
            })
    }
})
export default followsSlice.reducer