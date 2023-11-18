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
            getList: (params) => axios.get(`${basicDomain}${news}`)
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
    }
    // top: {
    //     // getListTop : (params) => axios.get()
    // }
}