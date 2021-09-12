export type photosType = {
    small: string | null
    large: string | null
}
export type usersType = {
    name: string
    id: number
    photos: photosType
    status: string
    followed: boolean
}
export type contactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type userProfileType = {
    aboutMe: string
    fullName: string
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    contacts: any // contactsType
    photos: photosType
}
export type profileDataType = {
    homeLink: string
    id: number
    name: string
    avatar: string
    status: string
    country: string
    city: string
}
export type postsDataType = {
    id: number
    message: string
}
export type messageDataType = {
    id: number
    textMessage: string
}
export type photoFileType = {
    lastModified: number
    lastModifiedDate: Date
    name: string
    size: number
    type: string
    webkitRelativePath: string
}