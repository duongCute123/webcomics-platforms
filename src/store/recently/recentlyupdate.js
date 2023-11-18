import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import connect from "../../@connect"
const appName = "Comics"
const moduleName = 'recentlyUpdate'
export const recentlyUpdate = {
    getList: createAsyncThunk(`${appName}/${moduleName}/recentlyupdate`, async (params, thunkAPI) => {
        try {
            const responsive = await connect.recently.recentlyUpdate.getList(params)
            console.log(responsive.data);
            return responsive.data
        } catch (error) {
            thunkAPI.dispatch({ variant: "error", message: "Lỗi lấy dữ liệu" })
            return thunkAPI.rejectWithValue(error)
        }
    }),
    findBySatus: createAsyncThunk(`${appName}/${moduleName}/findByStatus`, async (params, thunkAPI) => {
        try {
            const responsive = await connect.recently.recentlyUpdate.findBySatusPage(params)
            return responsive.data
        } catch (error) {
            thunkAPI.dispatch({ variant: "error", message: "Lỗi lấy dữ liệu" })
            return thunkAPI.rejectWithValue(error)
        }
    })
}
const recentlySlice = createSlice({
    name: `${appName}/${moduleName}`,
    initialState: {
        loading: true,
        error: null,
        recently: []
    },
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(recentlyUpdate.getList.pending, (state) => {
                state.loading = true;
                    state.error = null;
                    state.recently = null;
            })
            .addCase(recentlyUpdate.getList.fulfilled, (state, { payload }) => {
                state.loading = false;
                    state.recently = payload;
                    state.error = null;
            })
            .addCase(recentlyUpdate.getList.rejected, (state, { error }) => {
                state.loading = false;
                    state.recently = {
                        data: []
                    };
                    state.error = error;
            })
            .addCase(recentlyUpdate.findBySatus.pending, (state) => {
                state.loading = true;
                    state.error = null;
                    state.recently = null;
            })
            .addCase(recentlyUpdate.findBySatus.fulfilled, (state, { payload }) => {
                state.loading = false
                    state.recently = payload
                    state.error = null
            })
            .addCase(recentlyUpdate.findBySatus.rejected, (state, { error }) => {
                state.loading = false;
                    state.error = error;
                    state.recently = {
                        data: []
                    };
            })
    }
})
export default recentlySlice.reducer