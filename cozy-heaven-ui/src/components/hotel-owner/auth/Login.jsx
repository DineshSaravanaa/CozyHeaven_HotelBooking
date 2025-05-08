import { useState } from "react";
import users from '../../../data/users';
import { useNavigate } from "react-router";

function Login() {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [emailMsg, setEmailMsg] = useState(null);
    const [passwordMsg, setPasswordMsg] = useState(null);
    const [userDetail, setUserDetail] = useState(users);
    const navigate = useNavigate();

    const login = () => {
        let isCorrect = false;

        if (email === null || email === "" || email === undefined) {
            setEmailMsg("Email cannot be blank");
            return;
        } else {
            setEmailMsg(null);
        }
        
        if (password === null || password === "" || password === undefined) {
            setPasswordMsg("Password cannot be blank");
            return;
        } else {
            setPasswordMsg(null);
        }

        userDetail.forEach(u => {
            if ((u.email === email || u.username === email) && u.password === password) {
                isCorrect = true;
                switch (u.role) {
                    case 'OWNER':
                        navigate("/owner")
                        break;
                    case 'CUSTOMER':
                        navigate("/customer");
                        break;
                    case 'VENDOR':
                        // navigate to vendor dashboard
                        break;
                    case 'EXECUTIVE':
                        // navigate to executive dashboard
                        break;
                    default:
                        break;
                }
            }
        });

        if (!isCorrect) {
            setEmailMsg("Invalid credentials");
        }
    };

    return (
        <div className="login-container">
            {/* Navigation Bar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
                <div className="container-fluid">
                    <span className="navbar-brand fw-bold fs-4 me-auto">Cozy Heaven</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link fw-bold" href="#about">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link fw-bold" href="#reviews">Reviews</a>
                            </li>
                            <li className="nav-item">
                                <a className="btn btn-info text-white fw-bold rounded-pill shadow" href="/signup">
                                    Create Account
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Login Form Section */}
            <section className="container mt-5 pt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow border-0">
                            <div className="card-header bg-white border-0 text-center py-4">
                                <h2 className="text-primary">Owner Login</h2>
                                <p className="text-muted">Access your hotel management dashboard.</p>
                            </div>
                            
                            <div className="card-body px-4 py-3">
                                {emailMsg && (
                                    <div className="alert alert-danger" role="alert">
                                        {emailMsg}
                                    </div>
                                )}
                                {passwordMsg && (
                                    <div className="alert alert-danger" role="alert">
                                        {passwordMsg}
                                    </div>
                                )}
                                
                                <div className="mb-4">
                                    <label htmlFor="email" className="form-label fw-semibold text-primary">
                                        <span>Email or Username</span>
                                        <span className="text-danger">*</span>
                                    </label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        className="form-control form-control-lg" 
                                        placeholder="Enter your email or username"
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setEmailMsg(null);
                                        }}
                                    />
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="password" className="form-label fw-semibold text-primary">
                                        <span>Password</span>
                                        <span className="text-danger">*</span>
                                    </label>
                                    <input 
                                        type="password" 
                                        id="password" 
                                        className="form-control form-control-lg" 
                                        placeholder="Enter your password"
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setPasswordMsg(null);
                                        }}
                                    />
                                </div>
                                
                                <div className="d-flex justify-content-center mt-4">
                                    <button 
                                        type="button" 
                                        className="btn btn-primary btn-lg rounded-pill px-4 shadow-sm"
                                        onClick={login}
                                    >
                                        <i className="fas fa-sign-in-alt me-2"></i> Login
                                    </button>
                                </div>
                                
                                <div className="text-center mt-4 small">
                                    <a href="#" className="text-decoration-none text-primary">Forgot Password?</a> | 
                                    <a href="/signup" className="text-decoration-none text-primary"> Create an Account</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-primary text-white text-center py-3 mt-4">
                <p className="mb-0">© 2025 Cozy Heaven Stay. All Rights Reserved.</p>
            </footer>
        </div>
    );
}

export default Login;