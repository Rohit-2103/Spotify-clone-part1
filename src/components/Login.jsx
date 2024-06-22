import React from 'react';
import styled from "styled-components";

export default function Login() {
    const handleClick=()=>{
       const clientId="977e90fb28014a95bc3310d36f47cc43";
       const redirectURL="http://localhost:3000/";
       const apiURl="https://accounts.spotify.com/authorize";
       const scope=["user-read-email","user-read-private","user-read-playback-state",
       " user-modify-playback-state",
        "user-read-currently-playing","user-read-playback-position",
       " user-top-read",
       " user-read-recently-played"];
       window.location.href=`${apiURl}?client_id=${clientId}&redirect_uri=${redirectURL}&scope=${scope.join(" ")}&response_type=token&show_daialog=true`;

    }
    
  return (
    <Container><img src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_Black.png"></img>
    <button onClick={handleClick}>Connect Spotify</button>
    </Container>
  )
}
const Container=styled.div`
display: flex;
flex-direction:column;
align-items:center;
justify-content:center;
height:100vh;
width:100vw;
background-color:#1db954;
gap:5rem;
img {
height: 20vh;

}
button{
padding:1rem 5rem;
border-radius: 5rem;
border:none;
background-color:black;
color: #49f585;
font-size:1.5rem;
cursor:pointer;
}
`;
