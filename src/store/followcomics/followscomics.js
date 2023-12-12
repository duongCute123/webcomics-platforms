import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addDoc, collection } from "firebase/firestore"
import { db } from "../../@config"

const appName = 'Comics'
const moduleName = 'followsComics'
export const followsComics = {
    addfollowsComics: createAsyncThunk(`${appName}/${moduleName}/followsComics`, async (params, thunkAPI) => {
        try {
            await addDoc(collection(db, "follows"), {
                ...params,
                uid: 123,
            })
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
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
    }
})
export default followsSlice.reducer