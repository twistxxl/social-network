



export type PostType = {
    id: number
    message: string
    likesCount: number
}

export type contactsType ={
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type photosType ={
    small: string | null
    large: string | null
}
export type ProfileType = {
    userId: number
    lookingForAreJob: boolean
    lookingForAreJobDescription: string
    fullNane: string
    contacts: contactsType
    photos: photosType
}

export type userType = {
    id: number
    name: string
    status: string
    photos: photosType
    followed: boolean
}
