const API_ROOT = 'http://127.0.0.1:5000/'

export const getPlayigSong = async ()=>{
    const data = await fetch(API_ROOT+'spotify/recently-played').then((res) =>
        res.json()
    )
    return data
}

export const getInstaDetails = async ()=>{
    const data = await fetch(API_ROOT+'insta').then((res) =>
        res.json()
    )
    return data
}