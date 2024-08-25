import { cache } from 'react'
// const API_ROOT = 'http://127.0.0.1:5000/'
const API_ROOT = 'https://PyPMac.pythonanywhere.com/'


export const getPlayigSong = async ()=>{
    const data = await fetch(API_ROOT+'spotify/recently-played').then((res) =>
        res.json()
    )
    return data
}

export const getInstaDetails = cache(async ()=>{
    const data = await fetch(API_ROOT+'insta').then((res) =>
        res.json()
    )
    console.log(data)
    return data
})

export const getGithubDetails = cache(async ()=>{
    const data = await fetch(API_ROOT+'github').then((res) =>
        res.json()
    )
    return data
})