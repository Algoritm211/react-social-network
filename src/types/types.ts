
//Reducer types
export type PostType = {
    id: number,
    message: string,
    likesCount: number
}

export type ContactsType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}

export type PhotosType = {
    small: string | null,
    large: string | null
}

export type ProfileType = {
    aboutMe: string;
    userId: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: ContactsType,
    photos: PhotosType
}

export type StatusType = {
    status: string | null,
    errorMessage: string | null
}

export type UsersType = {
    id: number,
    name: string
    status: string | null
    followed: boolean,
    photos: PhotosType,
}

export type FriendsType = {
    id: number,
    name: string,
    img: string
}


export type MessageType = {
    message: string,
    photo: string | null,
    userId: number,
    userName: string
}

//Form types
export type MainLoginFormType = {
    email?: string,
    password?: string,
    rememberMe?: boolean,
    captcha?: string
}




