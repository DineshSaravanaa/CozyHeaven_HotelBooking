import { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import "./login.css";

function Login() {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [msgUsername, setMsgUsername] = useState(null);
    const [msgPassword, setMsgPassword] = useState(null);
    const navigate = useNavigate();

    const login = () =>
    {

        if (username === null || username === "" || username === undefined)
        {
            setMsgUsername("Username cannot be blank")
            return
        }
        else 
        {
            setMsgUsername(null)
        }

        if (password == null || password === "" || password === undefined) 
        {
            setMsgPassword("Password cannot be blank")
            return
        }
        else 
        {
            setMsgPassword(null)
        }

        let body = 
        {
            'username': username,
            'password': password
        }

        axios.post('http://localhost:8080/api/auth/token/generate', body)
            .then(response => {
                let token = response.data.token
                localStorage.setItem('token', token)
                localStorage.setItem('username', username)
                axios.get('http://localhost:8080/api/auth/user/details',
                    {
                        headers: 
                        {
                            "Authorization": `Bearer ${localStorage.getItem('token')}`  
                        }
                    }
                )
                
                    .then(resp => 
                    {
                        localStorage.setItem("user", JSON.stringify(resp.data));
                        localStorage.setItem("userId", resp.data.id);
                        switch (resp.data.role) {
                            case 'CUSTOMER':
                                //navigate to customer dashboard
                                navigate("/customer")
                                break;
                            case 'Hotel owner':
                                //navigate to hotel owner dashboard
                                break;
                            case 'ADMIN':
                                //navigate to admin dashboard
                                break;
                            default:
                                break;
                        }
                    })
                    .catch(err => {
                        setMsgUsername("Invalid Credentials")
                        console.log(err)
                    })
            })
            .catch(err => {
                setMsgUsername("Invalid Credentials")
                console.log(err)
            })

    }

    return (
        <div className="login-page-wrapper">
            <div className="container-fluid">

                <div className="row mb-4">
                    <div className="col-lg-12">
                        <nav className="navbar navbar-light bg-light">
                            <div className="container-fluid">
                                <span className="navbar-brand mb-0 h1">Navbar</span>
                            </div>
                        </nav>
                    </div>
                </div>
                
                <div className="row mt-4">
                    <div className="col-sm-4">

                    </div>
                    <div className="col-sm-4">
                        <div className="card">
                            <div className="card-header">
                                Login
                            </div>
                            <div className="card-body">
                                {
                                    msgUsername === null ? "" : <div className="mb-4">
                                        {msgUsername}
                                    </div>
                                }
                                {
                                    msgPassword === null ? "" : <div className="mb-4">
                                        {msgPassword}
                                    </div>
                                }
                                <div className="mb-4">
                                    <label>Username: </label>
                                    <input type="text" className="form-control"
                                        onChange={$event => {
                                            setUsername($event.target.value);
                                            setMsgUsername(null)
                                        }} />
                                </div>
                                <div className="mb-4">
                                    <label>Password: </label>
                                    <input type="password" className="form-control"
                                        onChange={($event) => {
                                            setPassword($event.target.value);
                                            setMsgPassword(null)
                                        }} />
                                </div>
                                <div className="mb-4">
                                    <button type="button" className="btn btn-primary"
                                        onClick={() => login()}>Login</button>
                                </div>
                            </div>
                            <div className="card-footer">
                                Don't have an Account? <br />
                                <Link to="/customer/signup"> Sign Up as Customer </Link>
                                <Link to="/customer/signup"> Sign Up as hotel owner </Link>
                                <Link to="/customer/signup"> Sign Up as admin </Link>
                                <Link to="/customer/signup"> Sign Up as dss </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login;