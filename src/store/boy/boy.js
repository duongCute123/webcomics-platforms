import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import connect from "../../@connect"
const appName = "BoyComics"
const moduleName = "Boy"
export const boy = {
    getList: createAsyncThunk(`${moduleName}/${appName}/boyman`, async (params, thunkAPI) => {
        try {
            const responsive = await connect.boy.boyComics.getList(params)
            return responsive.data
        } catch (error) {
            thunkAPI.dispatch({ variant: "error", message: "Lỗi lấy dữ liệu" })
            return thunkAPI.rejectWithValue(error)
        }
    }),
    getComicswithPage: createAsyncThunk(`${appName}/${moduleName}/getcomicspage=1`, async (params, thunkAPI) => {
        try {
            const responsive = await connect.boy.boyComicsandPage.getList(params)
            return responsive.data
        } catch (error) {
            thunkAPI.dispatch({ variant: "error", message: "Lỗi lấy dữ liệu" })
            return thunkAPI.rejectWithValue(error)
        }
    })
}
const boySlice = createSlice({
    name: `${appName}/${moduleName}`,
    initialState: {
        loading: true,
        boy: [],
        error: null
    },
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(boy.getList.pending, (state) => {
                state.loading = true
                state.boy = null
                state.error = null
            })
            .addCase(boy.getList.fulfilled, (state, { payload }) => {
                state.loading = false
                state.boy = payload
                state.error = null
            })
            .addCase(boy.getList.rejected, (state, { error }) => {
                state.loading = false
                state.boy = {
                    data: []
                }
                state.error = error
            })
            .addCase(boy.getComicswithPage.pending, (state) => {
                state.loading = true
                state.boy = null
                state.error = null
            })
            .addCase(boy.getComicswithPage.fulfilled, (state, { payload }) => {
                state.loading = false
                state.boy = payload
                state.error = null
            })
            .addCase(boy.getComicswithPage.rejected, (state, { error }) => {
                state.loading = false
                state.boy = {
                    data: []
                }
                state.error = error
            })
    }
})
export default boySlice.reducer