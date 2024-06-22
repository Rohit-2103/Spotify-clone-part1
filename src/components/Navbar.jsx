import React from 'react';
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import {CgProfile} from 'react-icons/cg';
import { useStateProvider } from '../utils/stateprovider';


export default function Navbar() {
  const [{userInfo}]=useStateProvider();
  return (
    <Container>
      <div className="search_bar">
        <FaSearch/>
        <input type="text" placeholder="Artists,songs,or podcasts"/>
      </div>
      <div className="avatar">
        <a href='#'>
          <CgProfile />
          <span>{userInfo?.userName}</span>
        </a>
      </div>
    </Container>
  );
}
// const Container=styled.div`
// display:flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 2rem;
//   height: 50vh;
//   position: sticky;
//   top: 0;
//   transition: 0.3s ease-in-out;
//   background-color: none;
//   .search_bar{
//     background-color: white;
//     width: 30%;
//     padding: 0.4rem 1rem;
//     border-radius: 2rem;
//     display: flex;
//     align-items: center;
//     gap: 0.5rem;
//     input{
//       border: none;
//       height: 2rem;
//       width: 100%;
//       &focus{
//         outline: none;
//       }
//     }
//   }`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  height: 60px; // Adjusted height for better appearance
  position: sticky;
  top: 0;
 
  
  z-index: 10; // Ensure it stays on top

  .search_bar {
    background-color: white;
    width: 30%;
    padding: 0.4rem 1rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // Added shadow for depth

    input {
      border: none;
      height: 2rem;
      width: 100%;
      &:focus {
        outline: none;
      }
    }
  }

  .avatar {
    display: flex;
    align-items: center;
    a {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: inherit;
      
      span {
        font-weight: bold;
      }
    }
  }
`;