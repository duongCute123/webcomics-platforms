import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { auth, signInWithEmailAndPassword } from "../../@config"

const appName = "Comics"
const moduleName = "authent"
// export const authencomics = {
//     login: createAsyncThunk(`${appName}/${moduleName}/login`, async (params, thunkAPI) => {
//         try {
//             signInWithEmailAndPassword(params)
//                 .then(res => {
//                     console.log(res);
//                 })
//                 .catch(err => {
//                     console.log(err);
//                 })
//         } catch (error) {
//             thunkAPI.dispatch({ variant: "error", message: "Lỗi đăng nhập" })
//             return thunkAPI.rejectWithValue(error)
//         }

//     })
// }
// export const submitLogin = (model) => async dispatch => {
//     return signInWithEmailAndPassword(auth, model)
//         .then(res => {
//             dispatch(res)
//             return dispatch(loginSucces(res))
//         })
//         .catch(err => {
//             return dispatch(loginErr(err))
//         })
// }
const userSlice = createSlice({
    name: `${appName}/${moduleName}`,
    initialState: {
        loading: false,
        user: null,
        error: null
    },
    reducers: {
        loginSucces: (state, action) => {
            state.user = action.payload
            state.error = null
        },
        logOut: (state, action) => {
            state.user = null
            state.error = null
        },
        loginErr: (state, action) => {
            state.error = action.payload
        }
    },
    extraReducers: builder => {

    }
})
export const { loginSucces, logOut, loginErr } = userSlice.actions
export const selectedUser = state => state.user.user
export default userSlice.reducer