import React from "react";
import NavBar from '../components/NavBar.jsx';
import '../styles/notfound.css';

export default function NotFound() {
  return (
    <>
     <div className="body">
      <div className="number-404">404</div>
      <div className="not-found-container">
        <h1>Oops!</h1>
        <p>Page not found</p>
      </div>
    </div>
      <NavBar />
    </>
  );
}