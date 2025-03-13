import { cache } from 'react'
// const API_ROOT = 'http://127.0.0.1:5000/'
const API_ROOT = 'https://PyPMac.pythonanywhere.com/'


export const getPlayigSong = async ()=>{
    const data = await fetch(API_ROOT+'spotify/recently-played',{
        method: 'POST'
    }).then((res) =>
        res.json()
    )
    return data
}

export const getInstaDetails = cache(async ()=>{
    const data = await fetch(API_ROOT+'insta',{
        method: 'POST'
    }).then((res) =>
        res.json()
    )
    return data
})

export const getGithubDetails = cache(async ()=>{
    const data = await fetch(API_ROOT+'github',{
        method: 'POST'
    }).then((res) =>
        res.json()
    )
    return data
})

export const getGroqResponse = async (chats: any) => {
    try {
        const response = await fetch(API_ROOT+'groq/response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chats: chats
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response from /groq/response:', data);
        return data;
    } catch (error) {
        console.error('Error fetching data from /groq/response:', error);
    }
}


export const sendMessage = async (data: any) => {
    try {
        const response = await fetch(API_ROOT+'send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const res = await response.json();
        console.log('res:', res);
        return res;
    } catch (error) {
        console.error('Error fetching data from /groq/response:', error);
    }
}