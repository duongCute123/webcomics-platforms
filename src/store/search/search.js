import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import connect from "../../@connect"
const appName = "Comics"
const moduleName = "searchPage"
export const search = {
    searchSuggest: createAsyncThunk(`${appName}/${moduleName}/suggets`, async (params, thunkAPI) => {
        try {
            const responsive = await connect.search.searchSuggest.querySuggest(params)
            return responsive.data
        } catch (error) {
            thunkAPI.dispatch({ variant: "error", message: "Lỗi lấy dữ liệu" })
            return thunkAPI.rejectWithValue("Lỗi lấy dữ liệu")
        }
    }),
    queryPage: createAsyncThunk(`${appName}/${moduleName}/queryPage`, async (params, thunkAPI) => {
        try {

        } catch (error) {
            thunkAPI.dispatch({ variant: "error", message: "Lỗi lấy dữ liệu" })
            return thunkAPI.rejectWithValue("Lỗi lấy dữ liệu")
        }
    })
}
const searchSlice = createSlice({
    name: `${appName}/${moduleName}`,
    initialState: {
        loading: false,
        search: [],
        error: null
    },
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(search.searchSuggest.pending, (state) => {
                state.loading = true
                state.search = []
                state.error = null
            })
            .addCase(search.searchSuggest.fulfilled, (state, { payload }) => {
                state.loading = false
                state.search = payload
                state.error = null
            })
            .addCase(search.searchSuggest.rejected, (state, { error }) => {
                state.loading = false
                state.search = {
                    data: []
                }
                state.error = error
            })
            .addCase(search.queryPage.pending, (state) => {
                state.loading = true
                state.search = []
                state.error = null
            })
            .addCase(search.queryPage.fulfilled, (state, { payload }) => {
                state.loading = false
                state.search = payload
                state.error = null
            })
            .addCase(search.queryPage.rejected, (state, { error }) => {
                state.loading = false
                state.search = {
                    data: []
                }
                state.error = error
            })
    }
})
export default searchSlice.reducer