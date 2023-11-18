import { configureStore } from '@reduxjs/toolkit'
import TrendingReducer from './trending/comicstrending'
import ComplteComicsReducer from "./completecomics/completecomics"
import RecentlyUpdateReducer from "./recently/recentlyupdate"
export const store = configureStore({
    reducer: {
        trending: TrendingReducer,
        complete: ComplteComicsReducer,
        recently: RecentlyUpdateReducer
    }
})