import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import connect from "../../@connect"
const appName = "Comics"
const moduleName = "genresComics"
export const genres = {
    getList: createAsyncThunk(`${appName}/${moduleName}/genres`, async (params, thunkAPI) => {
        // console.log(type);
        // console.log(page);
        try {
            const responsive = await connect.genres.genresComics.getList(params)
            return responsive.data
        } catch (error) {
            thunkAPI.dispatch({ variant: "error", message: "Lỗi lấy data nhé" })
            return thunkAPI.rejectWithValue(error)
        }
    })
}

const genresSlice = createSlice({
    name: `${appName}/${moduleName}`,
    initialState: {
        loading: false,
        genres: [],
        error: null
    },
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(genres.getList.pending, (state) => {
                state.loading = true
                state.genres = null
                state.error = null
            })
            .addCase(genres.getList.fulfilled, (state, { payload }) => {
                state.loading = false
                state.genres = payload
                state.error = null
            })
            .addCase(genres.getList.rejected, (state, { error }) => {
                state.loading = false
                state.genres = {
                    data: []
                }
                state.error = error
            })

    }
})
export default genresSlice.reducer