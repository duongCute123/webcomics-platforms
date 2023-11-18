import connect from "../../@connect"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
const appName = "NewsComics"
const moduleName = "news"
export const news = {
    getList: createAsyncThunk(`${appName}/${moduleName}/news`, async (params, thunkAPI) => {
        try {
            const responsive = await connect.news.newsComics.getList(params)
            return responsive.data
        } catch (error) {
            thunkAPI.dispatch({ variant: "error", message: "Lỗi lấy dữ liệu" })
            return thunkAPI.rejectWithValue(error)
        }
    })
}
const newsSlice = createSlice({
    name: `${appName}/${moduleName}`,
    initialState: {
        loading: false,
        news: [],
        error: null
    },
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(news.getList.pending, (state) => {
                state.loading = true
                state.news = null
                state.error = null
            })
            .addCase(news.getList.fulfilled, (state, { payload }) => {
                state.loading = false
                state.news = payload
                state.error = null
            })
            .addCase(news.getList.rejected, (state, { error }) => {
                state.loading = false
                state.news = {
                    data: []
                }
                state.error = error
            })
    }
})
export default newsSlice.reducer