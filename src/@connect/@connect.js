import axios from "axios"
import { basicDomain, boy, complete, endPoint, genres, girl, news, recent } from "../@contrain"

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
            getList: (type, page, entity) => axios.get(`${basicDomain}/${genres}/${type}?${page}`, { entity })
        }
    }
    // top: {
    //     // getListTop : (params) => axios.get()
    // }
}