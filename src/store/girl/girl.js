import connect from "../../@connect"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
const appName = "Girl"
const moduleName = "girlcomics"
export const girl = {
    getList: createAsyncThunk(`${appName}/${moduleName}/girl`, async (params, thunkAPI) => {
        try {
            const responsive = await connect.girl.girlComics.getList(params)
            return responsive.data
        } catch (error) {
            thunkAPI.dispatch({ variant: "error", message: "Lỗi lấy dữ liệu" })
            return thunkAPI.rejectWithValue(error)
        }
    })
}
const girlSlice = createSlice({
    name: `${appName}/${moduleName}`,
    initialState: {
        loading: true,
        error: null,
        girl: []
    },
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(girl.getList.pending, (state) => {
                state.loading = true
                state.girl = null
                state.error = null
            })
            .addCase(girl.getList.fulfilled, (state, { payload }) => {
                state.loading = false
                state.girl = payload
                state.error = null
            })
            .addCase(girl.getList.rejected, (state, { error }) => {
                state.loading = false
                    state.girl = null
                    state.error = error
            })
    }
})
export default girlSlice.reducer