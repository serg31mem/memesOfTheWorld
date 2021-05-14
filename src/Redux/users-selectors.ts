import {AppType} from "./store-redux";

export const getUsers = (state: AppType) => {
    return state.usersPage.users
}

export const totalCount = (state: AppType) => {
    return state.usersPage.totalCount
}

export const pageSize = (state: AppType) => {
    return state.usersPage.pageSize
}

export const currentPage = (state: AppType) => {
    return state.usersPage.currentPage
}

export const isFetching = (state: AppType) => {
    return state.usersPage.isFetching

}

export const followingProgress = (state: AppType) => {
    return state.usersPage.followingProgress
}