import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';


class Header extends Component {
    render() {
        return(
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to='/films'>
                                    <div className="nav-link text-white">Films</div>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/actors'>
                                    <div className="nav-link text-white">Actors</div>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/companies'>
                                    <div className="nav-link text-white">Companies</div>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/genres'>
                                    <div className="nav-link text-white">Genres</div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;
