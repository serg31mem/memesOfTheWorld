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
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    contacts: contactsType
    photos: photosType
}