import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        return (
            <div>
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">SCMS</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
               </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to="/" className="nav-link">Courses</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to="/students" className="nav-link">Students</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/createcourse" className="nav-link">Create Course</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/student" className="nav-link">Register Course</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            </div>
        )
    }
}
