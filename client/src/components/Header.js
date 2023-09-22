import React from "react";
import { Link } from "react-router-dom";

const Header = ({ title, isAuthenticated, username }) => {
  return (
    <header>
      <a href="/">
        <h1> {title}</h1>
      </a>
      <div className="navbar">
        <Link className="navbar-item" to="/">
          Home
        </Link>
        <Link className="navbar-item" to="/tv-search">
          TV search
        </Link>
        <Link className="navbar-item" to="/random-quote">
          Quote
        </Link>
        <Link className="navbar-item" to="/random-song">
          Song
        </Link>
        <Link className="navbar-item" to="/about">
          About
        </Link>
        {isAuthenticated ? (
            <div>
              <Link className="navbar-item" to={`/account?username=${username}`}>
                {username}
              </Link>
            </div>
        ) : (
            <Link className="navbar-item" to="/login">
              Log In
            </Link>
        )}
      </div>
    </header>
  );
};

export default Header;