import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import connect from "../../@connect"
const appName = 'Comics'
const moduleName = 'completecomics'
export const competecomics = {
    getList: createAsyncThunk(`${appName}/${moduleName}/page/complete`, async (params, thunkAPI) => {
        try {
            const responsive = await connect.complete.getComplete.getList(params)
            console.log(responsive.data);
            return responsive.data
        } catch (error) {
            thunkAPI.dispatch({ variant: "error", message: "Lỗi lấy dữ liệu" })
            return thunkAPI.rejectWithValue(error)
        }
    })
}
const complteComicsSlice = createSlice({
    name: `${appName}/${moduleName}`,
    initialState: {
        loading: true,
        error: null,
        completeComics: [],
    },
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(competecomics.getList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(competecomics.getList.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.completeComics = payload;
                state.error = null;
            })
            .addCase(competecomics.getList.rejected, (state, { error }) => {
                state.loading = false;
                state.completeComics = { data: [] };
                state.error = error;
            });
    }
})
export default complteComicsSlice.reducer