import axios from "axios"
import { basicDomain, boy, complete, detail, endPoint, genres, girl, news, recent, searchSuggest, searchPage } from "../@contrain"

export default {
    trending: {
        getTrending: (params) => axios.get(`${basicDomain}${endPoint}${params.page}`)
    },
    complete: {
        getComplete: {
            getList: (params) => axios.get(`${basicDomain}${complete}`, { params })
        }
    },
    recently: {
        recentlyUpdate: {
            getList: (params) => axios.get(`${basicDomain}/recent-update-comics`, { params }),
            findBySatusPage: (params) => axios.get(`${basicDomain}/${recent}`, { params })
        }
    },
    boy: {
        boyComics: {
            getList: (params) => axios.get(`${basicDomain}${boy}`)
        },
        boyComicsandPage: {
            getList: (params) => axios.get(`${basicDomain}${boy}`, { params })
        }
    },
    girl: {
        girlComics: {
            getList: (params) => axios.get(`${basicDomain}${girl}`, { params })
        },
        girlComicsandPage: {
            getList: (params) => axios.get(`${basicDomain}${girl}`, { params })
        }
    },
    news: {
        newsComics: {
            getList: (params) => axios.get(`${basicDomain}${news}`),
            findNewComics: (params) => axios.get(`${basicDomain}/new-comics`, { params })

        }
    },
    genres: {
        genresComics: {
            getList: (params) => axios.get(`${basicDomain}/${genres}/${params.type}`, { params })
        }
    },
    detail: {
        detailComics: {
            findById: (comic_id, entity) => axios.get(`${basicDomain}/${detail}/${comic_id}`, { entity })
        },
        comicChapters: {
            findByIdChapter: (comic_id, params) => axios.get(`${basicDomain}/${detail}/${comic_id}/chapters`)
        },
        singleChapter: {
            findByIdSingleChapter: (params) => axios.get(`${basicDomain}/${detail}/${params.comic_id}/chapters/${params.chapter_id}`)
        }
    },
    //# All: `/top?page=${page}&status=${status}`;
    // # Daily: `/top/daily?page=${page}&status=${status}`;
    // # Weekly: `/top/weekly?page=${page}&status=${status}`;
    // # Monthly: `/top/monthly?page=${page}&status=${status}`;
    // # Chapter: `/top/chapter?page=${page}&status=${status}`;
    // # Follow: `/top/follow?page=${page}&status=${status}`;
    // # Comment: `/top/comment?page=${page}&status=${status}`;
    top: {
        topAll: {
            getList: (params) => axios.get(`${basicDomain}/top?page=${params.page}&status=${params.status}`)
        },
        topDaily: {
            getList: (params) => axios.get(`${basicDomain}/top/daily?page=${params.page}&status=${params.status}`)
        },
        topWeekly: {
            getList: (params) => axios.get(`${basicDomain}/top/weekly?page=${params.page}&status=${params.status}`)
        },
        topMonthly: {
            getList: (params) => axios.get(`${basicDomain}/top/monthly?page=${params.page}&status=${params.status}`)
        },
        topChapter: {
            getList: (params) => axios.get(`${basicDomain}/top/chapter?page=${params.page}&status=${params.status}`)
        },
        topFollow: {
            getList: (params) => axios.get(`${basicDomain}/top/follow?page=${params.page}&status=${params.status}`)
        },
        topComment: {
            getList: (params) => axios.get(`${basicDomain}/top/comment?page=${params.page}&status=${params.status}`)
        }
    },
    search: {
        searchSuggest: {
            querySuggest: (query) => axios.get(`${basicDomain}/${searchSuggest}?q=${query}`)
        },
        queryPage: {
            searchComics: (params) => axios.get(`${basicDomain}/${searchPage}?q=${params.query}&page=${params.page}`)
        }
    }
}