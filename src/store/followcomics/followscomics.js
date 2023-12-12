import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore"
import { db } from "../../@config"
import { collectionfollow } from "../../@contrain"

const appName = 'Comics'
const moduleName = 'followsComics'
export const followsComics = {
    addfollowsComics: createAsyncThunk(`${appName}/${moduleName}/followsComics`, async (params, thunkAPI) => {
        console.log(params);
        try {
            await addDoc(collection(db, "follows"), {
                params
            })
            console.log("Theo dõi phim thành công nhé..!!");
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }),
    getComicsInUid: createAsyncThunk(`${appName}/${moduleName}/getByuid`, async (params, thunkAPI) => {
        console.log(params);
        try {
            const querySnapshot = await getDocs(collection(db, "follows"));
            const followsComics = querySnapshot
                .docs
                .map(doc => doc.data())
                .filter(follow => follow.params.uid === params)
            return followsComics;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }),
    unfollowcomics: createAsyncThunk(`${appName}/${moduleName}`, async (params, thunkAPI) => {
        try {
            const documentRef = doc(db, collectionfollow, params)
            await deleteDoc(documentRef)
            console.log("Xoá thành công với dữ liệu là:",params);
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