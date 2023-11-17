import { configureStore } from '@reduxjs/toolkit'
import TrendingReducer from './trending/comicstrending'
import ComplteComicsReducer from "./completecomics/completecomics"
export const store = configureStore({
    reducer: {
        trending: TrendingReducer,
        complete: ComplteComicsReducer
    }
})