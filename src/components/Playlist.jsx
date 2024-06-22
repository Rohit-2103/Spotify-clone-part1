// import React from 'react';
// import { useEffect } from 'react';
// import { useStateProvider } from '../utils/stateprovider';
// import axios from "axios";
// import { reducerCases } from '../utils/Constants';

// export default function Playlist() {
//    const[{token,playlists},dispatch]=useStateProvider();
//     useEffect(()=> {
//         const  getPlaylistData=async ()=>{
//         const response=await axios.get('https://api.spotify.com/v1/me/playlists',{
//             headers : {
//                 Authorization:"Bearer "+token,
//                 "Content-Type": "application/json",
//             }
//         });
//         const {items}=response.data;
//         const playlists =items.map(({name,id})=>{
//         return {name ,id};
//         });
//         dispatch({type:reducerCases.SET_PLAYLISTS,playlists});
//         };
//         getPlaylistData();
//     },[token,dispatch])
//   return (
//     <div>
//         <ul>
//             {
//                 playlists.map(({name,id})=>{
//                     return <li key={id}>{name}</li>
//                 })
//             }
//         </ul>
//     </div>
//   )
// }

import React, { useEffect, useState } from 'react';
import { useStateProvider } from '../utils/stateprovider';
import axios from 'axios';
import styled from 'styled-components';

export default function Playlist() {
    const [{ token }, dispatch] = useStateProvider();
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const getUserId = async () => {
            try {
                const response = await axios.get('https://api.spotify.com/v1/me', {
                    headers: {
                        Authorization: 'Bearer ' + token,
                        'Content-Type': 'application/json',
                    },
                });
                return response.data.id;
            } catch (error) {
                console.error('Error fetching user ID:', error);
                return null;
            }
        };

        const createPlaylist = async (userId) => {
            try {
                const response = await axios.post(
                    `https://api.spotify.com/v1/users/${userId}/playlists`,
                    {
                        name: 'New Playlist',
                        public: false, // Set to true if you want the playlist to be public
                    },
                    {
                        headers: {
                            Authorization: 'Bearer ' + token,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                console.log('Created Playlist:', response.data);
                return response.data;
            } catch (error) {
                console.error('Error creating playlist:', error);
                return null;
            }
        };

        const getPlaylistData = async () => {
            if (!token) {
                console.error('Token is missing!');
                return;
            }

            try {
                const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
                    headers: {
                        Authorization: 'Bearer ' + token,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200) {
                    const { items } = response.data;
                    console.log('Items:', items);
                    setPlaylists(items);
                } else {
                    console.error('Unexpected response status:', response.status);
                }
            } catch (error) {
                console.error('Error fetching playlist data:', error);
            }
        };

        const createNewPlaylist = async () => {
            const userId = await getUserId();
            if (userId) {
                await createPlaylist(userId);
                getPlaylistData(); // Refresh playlists after creating a new one
            }
        };

        if (token) {
            getPlaylistData();
        }
    }, [token, dispatch]);

    return (
        <Container>
            <h1>Playlist</h1>
            <ul>
                {playlists.length > 0 ? (
                    playlists.map((playlist) => (
                        <li key={playlist.id}>{playlist.name}</li>
                    ))
                ) : (
                    <li>No playlists found.</li>
                )}
            </ul>
        </Container>
    );
}
const Container=styled.div`
ul{
list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  color: white;
li{
display: flex;
gap: 1rem;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover{
  color: white;
}
}

}
`