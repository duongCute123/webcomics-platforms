import axios from "axios"
import { basicDomain, boy, complete, detail, endPoint, genres, girl, news, recent } from "../@contrain"

export default {
    trending: {
        getTrending: (pages, params) => axios.get(`${basicDomain}${endPoint}${pages}`, { params })
    },
    complete: {
        getComplete: {
            getList: (pages, params) => axios.get(`${basicDomain}${complete}${pages}`, { params })
        }
    },
    recently: {
        recentlyUpdate: {
            getList: (params) => axios.get(`${basicDomain}/recent-update-comics`, { params }),
            findBySatusPage: (page, status, entity) => axios.get(`${basicDomain}/${recent}?page=${page}&status=${status}`, { entity })
        }
    },
    boy: {
        boyComics: {
            getList: (params) => axios.get(`${basicDomain}${boy}`)
        }
    },
    girl: {
        girlComics: {
            getList: (params) => axios.get(`${basicDomain}${girl}`, { params })
        }
    },
    news: {
        newsComics: {
            getList: (params) => axios.get(`${basicDomain}${news}`),
            findNewComics: (params) => axios.get(`${basicDomain}/new-comics?page=${params.page}&status=${params.status}`)

        }
    },
    genres: {
        genresComics: {
            getList: (params) => axios.get(`${basicDomain}/${genres}/${params.type}?page=${params.page}`)
        }
    },
    detail: {
        detailComics: {
            findById: (comic_id, entity) => axios.get(`${basicDomain}/${detail}/${comic_id}`, { entity })
        },
        comicChapters: {
            findByIdChapter: (comic_id, params) => axios.get(`${basicDomain}/${detail}/${comic_id}/chapters`, { params })
        },
        singleChapter: {
            findByIdSingleChapter: (params) => axios.get(`${basicDomain}/${detail}/${params.comic_id}/chapters/${params.chapter_id}`, { params })
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
    }
}