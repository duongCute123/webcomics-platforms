
import connect from "../../@connect"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const appName = "Comics"
const moduleName = "detailComics"
export const detailcomics = {
    findById: createAsyncThunk(`${appName}/${moduleName}/detailcomics`, async (params, thunkAPI) => {
        try {
            const responsive = await connect.detail.detailComics.findById(params)
            console.log(params);
            return responsive.data
        } catch (error) {
            thunkAPI.dispatch({ variant: "error", message: "Lỗi lấy dữ liệu" })
            return thunkAPI.rejectWithValue(error)
        }
    }),
    findByIdSingleChapter: createAsyncThunk(`${appName}/${moduleName}/singlechapter`, async (params, thunkAPI) => {
        try {
            const responsive = await connect.detail.singleChapter.findByIdSingleChapter(params)
            console.log(params);
            return responsive.data
        } catch (error) {
            thunkAPI.dispatch({ variant: "error", message: "Lỗi lấy dữ liệu" })
            return thunkAPI.rejectWithValue(error)
        }
    })
}
const detailSlice = createSlice({
    name: `${appName}/${moduleName}`,
    initialState: {
        loading: false,
        detailcomics: [],
        error: null
    },
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(detailcomics.findById.pending, (state) => {
                state.loading = true
                state.detailcomics = []
                state.error = null
            })
            .addCase(detailcomics.findById.fulfilled, (state, { payload }) => {
                state.loading = false
                state.detailcomics = payload
                state.error = null
            })
            .addCase(detailcomics.findById.rejected, (state, { error }) => {
                state.loading = false
                state.detailcomics = { data: [] }
                state.error = error
            })
            .addCase(detailcomics.findByIdSingleChapter.pending, (state) => {
                state.loading = true
                state.detailcomics = []
                state.error = null
            })
            .addCase(detailcomics.findByIdSingleChapter.fulfilled, (state, { payload }) => {
                state.loading = false
                state.detailcomics = payload
                state.error = null
            })
            .addCase(detailcomics.findByIdSingleChapter.rejected, (state, { error }) => {
                state.loading = false
                state.detailcomics = { data: [] }
                state.error = error
            })
    }
})
export default detailSlice.reducer