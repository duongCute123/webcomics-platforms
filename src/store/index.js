import { configureStore } from '@reduxjs/toolkit'
import TrendingReducer from './trending/comicstrending'
import ComplteComicsReducer from "./completecomics/completecomics"
import RecentlyUpdateReducer from "./recently/recentlyupdate"
import BoyRducer from "./boy/boy"
import GirlReducer from "./girl/girl"
import NewsReducer from "./news/news"
import GenresReducer from "./genres/genrescomics"
import DetailComicsReducer from "./detailcomics/detailcomics"
import TopComicsReducer from "./top/top"
import SearchComicReducer from "./search/search"
import UserReducer from "./auth/userslice"
import FollowsComics from "./followcomics/followscomics"
export const store = configureStore({
    reducer: {
        trending: TrendingReducer,
        complete: ComplteComicsReducer,
        recently: RecentlyUpdateReducer,
        boy: BoyRducer,
        girl: GirlReducer,
        news: NewsReducer,
        genres: GenresReducer,
        detail: DetailComicsReducer,
        topcomics: TopComicsReducer,
        searchcomics: SearchComicReducer,
        user: UserReducer,
        followsComicsUid: FollowsComics
    }
})