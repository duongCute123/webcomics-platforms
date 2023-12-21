import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import connect from '../../@connect';
const appName = "Comics";
const moduleName = "trending";

export const trending = {
    getList: createAsyncThunk(`${appName}/${moduleName}/trending/getList`, async (params, thunkAPI) => {
        try {
            const responsive = await connect.trending.getTrending(params);
            return responsive.data;
        } catch (error) {
            thunkAPI.dispatch({ variant: "error", message: "Lỗi lấy danh sách truyện Trending" })
            return thunkAPI.rejectWithValue(error);
        }
    })
};

const trendingSlice = createSlice({
    name: `${appName}/${moduleName}`,
    initialState: {
        loading: true,
        trending: [],
        error: null
    },
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(trending.getList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(trending.getList.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.trending = payload;
                state.error = null;
            })
            .addCase(trending.getList.rejected, (state, { error }) => {
                state.loading = false;
                state.trending = { data: [] };
                state.error = error;
            });
    }
});

export default trendingSlice.reducer;