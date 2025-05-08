import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";


function Navbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    const userData = useSelector(state => state.users.users)
    return (
        <>
            <nav>
                <div className="logo">Cozy Heaven</div>
                <div className="nav-links">
                    <ul></ul>
                </div>
                <div className="user-menu">
                    <div className="dropdown">
                        <div
                            className="user-avatar"
                            id="userAvatar"
                            title="Account Menu"
                            onClick={toggleDropdown}
                            style={{ cursor: "pointer" }}

                        >
                            HO
                        </div>

                        {isDropdownOpen && (
                            <div className={`dropdown-content account-dropdown ${isDropdownOpen ? 'show' : ''}`} id="accountDropdown">

                                <div className="account-header">
                                    <div className="account-avatar" >HO</div>
                                    <div className="account-info">
                                        <h4 id="account-owner-name">{userData?.user?.role}</h4>
                                        <p id="account-owner-email">{userData?.email}</p>

                                    </div>
                                </div>
                                <Link to="/profile" className="account-menu-item">
                                    <i className="fas fa-user"></i> My Profile
                                </Link>
                                <Link to="/login" className="account-menu-item">
                                    <i className="fas fa-user"></i> LogOut
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            <div className="dashboard-nav">
                <ul>
                    <li>
                        <NavLink to="/owner-dashboard" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                            <i className="fas fa-tachometer-alt fa-fw"></i> Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/booking" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                            <i className="fas fa-calendar-check fa-fw"></i> Bookings
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/reviews" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                            <i className="fas fa-star fa-fw"></i> Reviews
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/myhotels" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                            <i className="fas fa-hotel fa-fw"></i> My Hotels
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/add-edit-hotel" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                            <i className="fas fa-plus-circle fa-fw"></i> Add New Hotel
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/pending-requests" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                            <i className="fas fa-hourglass-half fa-fw"></i> Pending Requests
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/cancellations" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                            <i className="fas fa-times-circle fa-fw"></i> Cancellations
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                            <i className="fas fa-user fa-fw"></i> Profile
                        </NavLink>
                    </li>
                </ul>

            </div>
        </>
    )
}
export default Navbar