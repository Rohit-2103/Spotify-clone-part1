import React,{useEffect} from 'react'
import styled from "styled-components";
import {AiFillClockCircle} from "react-icons/ai"; 
import { useStateProvider } from '../utils/stateprovider';
import axios from 'axios';
import { reducerCases } from '../utils/Constants';
export default function Body() {
  const [{token,selectedPlaylistId,selectedPlaylist},dispatch]=useStateProvider();
  useEffect(()=>{
    const getInitialPlaylist=async ()=> {
     const response= await axios.get(`https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,{
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
    },
     })
     const selectedPlaylist={
      id: response.data.id,
      name: response.data.id,
      description : response.data.description.startsWith("<a")?"":response.data.description,
      image:response.data.images[0].url,
      tracks :response.data.tracks.items.map(({track})=>({
        id: track.id,
        name: track.name,
        artists: track.artists.map((artist)=> artist.name),
        image: track.album.images[2].url,
        duration: track.duration_ms,
        album:track.album.name,
        context_uri:track.album.uri,
        track_number: track.track_number,
      }))
     };
     dispatch({type:reducerCases.SET_PLAYLIST,selectedPlaylist});
    };
    getInitialPlaylist();
  },[token,dispatch,selectedPlaylistId])
  return (
    <Container>
      {
        selectedPlaylist &&(
          <>
          <div className="playlist">
            <div className="image">
              <img src={selectedPlaylist.image} />
              <div className="details">
                <span className='type'>PLAYLIST</span>
                <h1 className='title'>{selectedPlaylist.name}</h1>
                <p className='description'>{selectedPlaylist.description}</p>
              </div>
            </div>
            <div className="list">
              <div className="header_row">
                <div className="col">
                  <span>#</span>
                </div>\
                <div className="col">
                  <span>Title</span>
                </div>
                <div className="col">
                  <span>Album</span>
                </div>
                <div className="col">
                  <span><AiFillClockCircle/></span>
                </div>
              </div>
            </div>
          </div>
          
          </>
        )
      }
    </Container>
  )
}
const Container =styled.div``;