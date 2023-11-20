import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import connect from "../../@connect"
const appName = "Comics"
const moduleName = "topcomics"
export const topcomics = {
    getListTop: createAsyncThunk(`${appName}/${moduleName}/comics`, async (params, thunkAPI) => {
        try {
            const responsive = await connect.top.topAll.getList(params)
            return responsive.data
        } catch (error) {
            thunkAPI.dispatch({ variant: "error", message: "Lỗi lấy dữ liệu" })
            return thunkAPI.rejectWithValue(error)
        }
    }),
    getdailyTop: createAsyncThunk(`${appName}/${moduleName}/comicstop`, async (params, thunkAPI) => {
        try {
            const responsive = await connect.top.topDaily.getList(params)
            return responsive.data
        } catch (error) {
            thunkAPI.dispatch({ variant: "error", message: "Lỗi lấy dữ liệu" })
            return thunkAPI.rejectWithValue(error)
        }
    }),
    topWeekly: createAsyncThunk(`${appName}/${moduleName}/comicsweekly`, async (params, thunkAPI) => {
        try {
            const responsive = await connect.top.topWeekly.getList(params)
            return responsive.data
        } catch (error) {
            thunkAPI.dispatch({ variant: "error", message: "Lỗi lấy dữ liệu" })
            return thunkAPI.rejectWithValue(error)
        }
    }),
    topMonthly: createAsyncThunk(`${appName}/${moduleName}/comicsmonthly`, async (params, thunkAPI) => {
        try {
            const responsive = await connect.top.topMonthly.getList(params)
            return responsive.data
        } catch (error) {
            thunkAPI.dispatch({ variant: "error", message: "Lỗi lấy dữ liệu" })
            return thunkAPI.rejectWithValue(error)
        }
    }),
    topChapter: createAsyncThunk(`${appName}/${moduleName}/comicschapter`, async (params, thunkAPI) => {
        try {
            const responsive = await connect.top.topChapter.getList(params)
            return responsive.data
        } catch (error) {
            thunkAPI.dispatch({ variant: "error", message: "Lỗi lấy dữ liệu" })
            return thunkAPI.rejectWithValue(error)
        }
    }),
    topFollow: createAsyncThunk(`${appName}/${moduleName}/comicsfollow`, async (params, thunkAPI) => {
        try {
            const responsive = await connect.top.topFollow.getList(params)
            return responsive.data
        } catch (error) {
            thunkAPI.dispatch({ variant: "error", message: "Lỗi lấy dữ liệu" })
            return thunkAPI.rejectWithValue(error)
        }
    }),
    topComment: createAsyncThunk(`${appName}/${moduleName}/comicscomment`, async (params, thunkAPI) => {
        try {
            const responsive = await connect.top.topComment.getList(params)
            return responsive.data
        } catch (error) {
            thunkAPI.dispatch({ variant: "error", message: "Lỗi lấy dữ liệu" })
            return thunkAPI.rejectWithValue(error)
        }
    })

}
// Tạo slice cho topcomics nhé
const topComicsSlice = createSlice({
    name: `${appName}/${moduleName}`,
    initialState: {
        loading: false,
        topcomics: [],
        error: null
    },
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(topcomics.getListTop.pending, (state) => {
                state.loading = true
                state.topcomics = []
                state.error = null
            })
            .addCase(topcomics.getListTop.fulfilled, (state, { payload }) => {
                state.loading = false
                state.topcomics = payload
                state.error = null
            })
            .addCase(topcomics.getListTop.rejected, (state, { error }) => {
                state.loading = false
                state.error = error
                state.topcomics = {
                    data: []
                }
            })
            .addCase(topcomics.getdailyTop.pending, (state) => {
                state.loading = true
                state.topcomics = []
                state.error = null
            })
            .addCase(topcomics.getdailyTop.fulfilled, (state, { payload }) => {
                state.loading = false
                state.topcomics = payload
                state.error = null
            })
            .addCase(topcomics.getdailyTop.rejected, (state, { error }) => {
                state.loading = false
                state.error = error
                state.topcomics = {
                    data: []
                }
            })
            .addCase(topcomics.topWeekly.pending, (state) => {
                state.loading = true
                state.topcomics = []
                state.error = null
            })
            .addCase(topcomics.topWeekly.fulfilled, (state, { payload }) => {
                state.loading = false
                state.topcomics = payload
                state.error = null
            })
            .addCase(topcomics.topWeekly.rejected, (state, { error }) => {
                state.loading = false
                state.error = error
                state.topcomics = {
                    data: []
                }
            })
            .addCase(topcomics.topMonthly.pending, (state) => {
                state.loading = true
                state.topcomics = []
                state.error = null
            })
            .addCase(topcomics.topMonthly.fulfilled, (state, { payload }) => {
                state.loading = false
                state.topcomics = payload
                state.error = null
            })
            .addCase(topcomics.topMonthly.rejected, (state, { error }) => {
                state.loading = false
                state.error = error
                state.topcomics = {
                    data: []
                }
            })
            .addCase(topcomics.topChapter.pending, (state) => {
                state.loading = true
                state.topcomics = []
                state.error = null
            })
            .addCase(topcomics.topChapter.fulfilled, (state, { payload }) => {
                state.loading = false
                state.topcomics = payload
                state.error = null
            })
            .addCase(topcomics.topChapter.rejected, (state, { error }) => {
                state.loading = false
                state.error = error
                state.topcomics = {
                    data: []
                }
            })
            .addCase(topcomics.topFollow.pending, (state) => {
                state.loading = true
                state.topcomics = []
                state.error = null
            })
            .addCase(topcomics.topFollow.fulfilled, (state, { payload }) => {
                state.loading = false
                state.topcomics = payload
                state.error = null
            })
            .addCase(topcomics.topFollow.rejected, (state, { error }) => {
                state.loading = false
                state.error = error
                state.topcomics = {
                    data: []
                }
            })
            .addCase(topcomics.topComment.pending, (state) => {
                state.loading = true
                state.topcomics = []
                state.error = null
            })
            .addCase(topcomics.topComment.fulfilled, (state, { payload }) => {
                state.loading = false
                state.topcomics = payload
                state.error = null
            })
            .addCase(topcomics.topComment.rejected, (state, { error }) => {
                state.loading = false
                state.error = error
                state.topcomics = {
                    data: []
                }
            })
    }

})
export default topComicsSlice.reducer