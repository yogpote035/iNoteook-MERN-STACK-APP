import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from "./icons8-copybook-3d-fluency-32.png"
function Navbar({ showAlert }) {
    let location = useLocation();
    useEffect(() => {
    }, [location])

    const navigate = useNavigate()
    const [cross, setCross] = useState(true);

    const handleLogout = () => {
        localStorage.removeItem("token");
        showAlert("Logged Out Successful", "dark")
        navigate("/login")
    }

    const updateBar = () => {
        setCross(cross ? false : true);
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/"><img src={logo} alt="Brand" />iNotebook</NavLink>
                    <button className="navbar-toggler" style={{ outline: "none", boxShadow: "none" }} onClick={updateBar} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        {cross ? <span className="navbar-toggler-icon"></span> : <span className="">&times;</span>}
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className={`nav-link ${location.pathname === "/" ? " active" : " "}`} to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={`nav-link ${location.pathname === "/about" ? " active" : " "}`} to="/about">About</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={`nav-link ${location.pathname === "/notes" ? " active" : " "}`} to="/notes">Notes</NavLink>
                            </li>

                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>

                        {!localStorage.getItem("token") ? <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                            <li className="nav-item">
                                <NavLink className={`btn btn-outline-danger m-2 ${location.pathname === "/signup" ? " active" : " "}`} to="/signup">Signup</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={`btn btn-outline-success m-2 ${location.pathname === "/login" ? " active" : " "}`} to="/login">Login</NavLink>
                            </li>
                        </ul>
                            : <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <button className={`btn btn-outline-danger m-2 `} onClick={handleLogout}>Logout</button>
                                </li>
                            </ul>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar