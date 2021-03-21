export const getUsers = (state) => {
    return state.usersPage.users
}

export const totalCount = (state) => {
    return state.usersPage.totalCount
}

export const pageSize = (state) => {
    return state.usersPage.pageSize
}

export const currentPage = (state) => {
    return state.usersPage.currentPage
}

export const isFetching = (state) => {
    return state.usersPage.isFetching

}

export const followingProgress = (state) => {
    return state.usersPage.followingProgress
}